#!/usr/bin/env python3
"""Semantic validator for Avec PageSpecs.

Runs the Draft-07 schema first, then every rule JSON Schema cannot express. Each rule id
below must also exist in compatibility/graph.json (extraction/verify_all.py enforces the
parity in both directions). The PageSpec's declared template is cross-referenced against
that template's real node list in templates/templates.json -- not just nodes[] in isolation.

Usage:
    python3 schema/semantic_validate.py                 # validates schema/example.pagespec.json
    python3 schema/semantic_validate.py path/to/spec.json [...]
Exit code 1 if any error-severity finding.
"""
import json
import os
import sys

from jsonschema import Draft7Validator

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SHELL_PREFIX = "shell."
DECK_ORDER = ["deck.word-reveal-copy", "deck.email-stack", "deck.triage-game"]
EXPAND_ORDER = ["expand.compose-demo", "expand.be-here-now", "expand.search-demo", "expand.notifications-demo"]
FOOTER_TAIL = ["footer.launch", "proof.reviews-carousel", "footer.bar"]
VIDEO_ROLES = {"media.hero-demo-video", "media.ambient-video", "media.phone-demo-video"}


class Context:
    def __init__(self, repo=REPO):
        self.repo = repo
        j = lambda rel: json.load(open(os.path.join(repo, rel), encoding="utf-8"))
        self.schema = j("schema/pagespec.schema.json")
        self.templates = j("templates/templates.json")["templates"]
        self.graph = j("compatibility/graph.json")
        self.assets = j("assets/asset-roles.json")
        self.sections = {}
        sdir = os.path.join(repo, "sections")
        for f in sorted(os.listdir(sdir)):
            if f.endswith(".json"):
                s = json.load(open(os.path.join(sdir, f), encoding="utf-8"))
                self.sections[s["id"]] = s
        self.severity = {r["id"]: r["severity"] for r in self.graph["rules"]}


def _sections(spec):
    return [n.get("section") for n in spec.get("nodes", []) if isinstance(n, dict)]


def _template(ctx, spec):
    return ctx.templates.get(spec.get("template"))


# ------------------------------------------------------------------ rules
def r_template_eligible(ctx, spec):
    t = _template(ctx, spec)
    if t is None:
        return [f"template {spec.get('template')!r} does not exist in templates.json"]
    if not t.get("generationEligible"):
        return [f"template {spec.get('template')!r} is not generation-eligible (evidenceLevel={t.get('evidenceLevel')})"]
    return []


def r_route(ctx, spec):
    t = _template(ctx, spec)
    if t is None:
        return []
    if spec.get("route") not in t["routes"]:
        return [f"route {spec.get('route')!r} not in {spec.get('template')} routes {t['routes']}"]
    return []


def r_node_sequence(ctx, spec):
    t = _template(ctx, spec)
    if t is None:
        return []
    errs = []
    tnodes = t["nodes"]
    order = [n["section"] for n in tnodes]
    nodes = [n for n in spec.get("nodes", []) if isinstance(n, dict)]
    keys = [(n.get("section"), n.get("variant")) for n in nodes]
    seen = {}
    for k in keys:
        seen[k] = seen.get(k, 0) + 1
    for tn in tnodes:
        sid = tn["section"]
        variants = ctx.sections.get(sid, {}).get("variants", [])
        present = [k for k in keys if k[0] == sid]
        if tn["required"] and not present:
            errs.append(f"required node {sid} missing (template {spec.get('template')})")
        if not tn["repeatable"]:
            for k in set(present):
                if seen[k] > 1:
                    errs.append(f"non-repeatable node {k} appears {seen[k]}x")
        for k in present:
            if k[1] not in variants:
                errs.append(f"node {sid} variant {k[1]!r} not in contract variants {variants}")
    for sid, _ in keys:
        if sid not in order:
            errs.append(f"node {sid} is not part of template {spec.get('template')}")
    filtered = [s for s, _ in keys if s in order]
    expected = [s for s in order if s in filtered]
    dedup = []
    for s in filtered:
        if not dedup or dedup[-1] != s:
            dedup.append(s)
    if dedup != expected:
        errs.append(f"node order {dedup} does not match template order {expected}")
    return errs


def r_shell_first(ctx, spec):
    secs = _sections(spec)
    shell = [i for i, s in enumerate(secs) if isinstance(s, str) and s.startswith(SHELL_PREFIX)]
    content = [i for i, s in enumerate(secs) if isinstance(s, str) and not s.startswith(SHELL_PREFIX)]
    if shell and content and max(shell) > min(content):
        return [f"shell node at position {max(shell)} follows content node at {min(content)}"]
    return []


def r_one_hero(ctx, spec):
    secs = _sections(spec)
    n = secs.count("hero.copy")
    if n != 1:
        return [f"expected exactly one hero.copy, found {n}"]
    content = [s for s in secs if isinstance(s, str) and not s.startswith(SHELL_PREFIX)]
    errs = []
    if content[0] != "hero.copy":
        errs.append(f"first content node is {content[0]}, not hero.copy")
    i = secs.index("hero.copy")
    if i + 1 >= len(secs) or secs[i + 1] != "hero.video":
        errs.append("hero.copy must be immediately followed by hero.video")
    return errs


def _contiguous(secs, group, label):
    idx = [i for i, s in enumerate(secs) if s in group]
    if not idx:
        return []
    errs = []
    if idx != list(range(idx[0], idx[0] + len(idx))):
        errs.append(f"{label} nodes are not contiguous (positions {idx})")
    got = [secs[i] for i in idx]
    if got != [s for s in group if s in got]:
        errs.append(f"{label} nodes out of order: {got}")
    return errs


def r_deck(ctx, spec):
    return _contiguous(_sections(spec), DECK_ORDER, "deck")


def r_expand(ctx, spec):
    return _contiguous(_sections(spec), EXPAND_ORDER, "expand")


def r_footer(ctx, spec):
    secs = _sections(spec)
    if secs[-3:] != FOOTER_TAIL:
        return [f"last three nodes must be {FOOTER_TAIL}, got {secs[-3:]}"]
    return []


def _node(spec, sid):
    for n in spec.get("nodes", []):
        if isinstance(n, dict) and n.get("section") == sid:
            return n
    return None


def r_stop_count(ctx, spec):
    t = _template(ctx, spec)
    n = _node(spec, "shell.progress-dots")
    if t is None or n is None:
        return []
    want = len(t["scrollStops"])
    got = n.get("content", {}).get("stopCount")
    return [] if got == want else [f"progress-dots stopCount {got} != template scrollStops {want}"]


def r_hint_stops(ctx, spec):
    t = _template(ctx, spec)
    n = _node(spec, "shell.scroll-hint")
    if t is None or n is None:
        return []
    ids = {s["id"] for s in t["scrollStops"]}
    bad = [s for s in n.get("content", {}).get("hiddenOnStops", []) if s not in ids]
    return [f"scroll-hint hiddenOnStops not template stops: {bad}"] if bad else []


def r_motion(ctx, spec):
    errs = []
    for n in spec.get("nodes", []):
        c = ctx.sections.get(n.get("section")) if isinstance(n, dict) else None
        if not c:
            continue
        m, cm = n.get("motion") or {}, c["motion"]
        if "reducedMotionFallback" not in m:
            errs.append(f"{n['section']}: motion.reducedMotionFallback missing")
        for k in ("pattern", "trigger", "reducedMotionFallback"):
            if k in m and m[k] != cm[k]:
                errs.append(f"{n['section']}: motion.{k} {m[k]!r} != contract {cm[k]!r}")
        extra = set(m.get("durationTokens", [])) - set(cm.get("durationTokens", []))
        if extra:
            errs.append(f"{n['section']}: durationTokens {sorted(extra)} not in contract")
    return errs


def _walk(obj, parts):
    if not parts:
        yield obj
        return
    head, rest = parts[0], parts[1:]
    arr = head.endswith("[]")
    key = head[:-2] if arr else head
    if not isinstance(obj, dict) or key not in obj:
        return
    v = obj[key]
    if arr:
        if isinstance(v, list):
            for item in v:
                yield from _walk(item, rest)
    else:
        yield from _walk(v, rest)


def r_max_words(ctx, spec):
    errs = []
    for n in spec.get("nodes", []):
        c = ctx.sections.get(n.get("section")) if isinstance(n, dict) else None
        if not c:
            continue
        for path, b in c.get("fieldBudgets", {}).items():
            for val in _walk(n.get("content", {}), path.split(".")):
                if isinstance(val, str) and len(val.split()) > b["maxWords"]:
                    errs.append(f"{n['section']}.{path}: {len(val.split())} words > maxWords {b['maxWords']}")
    return errs


def _assets(obj, path=""):
    if isinstance(obj, dict):
        if "assetRole" in obj:
            yield path, obj
        for k, v in obj.items():
            yield from _assets(v, f"{path}.{k}" if path else k)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            yield from _assets(v, f"{path}[{i}]")


def r_asset_policy(ctx, spec):
    errs = []
    roles = ctx.assets["roles"]
    for n in spec.get("nodes", []):
        if not isinstance(n, dict):
            continue
        content = n.get("content", {})
        for path, a in _assets(content):
            role = roles.get(a["assetRole"])
            where = f"{n.get('section')}.{path}"
            if role is None:
                errs.append(f"{where}: unknown assetRole {a['assetRole']!r}")
                continue
            ref = a.get("assetRef")
            if role["policy"] == "generate-new-allowed":
                if ref is not None:
                    errs.append(f"{where}: role {a['assetRole']} is token-only and must not carry assetRef ({ref})")
                continue
            if ref is not None and ref not in role["allowedRefs"]:
                errs.append(f"{where}: assetRef {ref!r} not an allowed ref for {a['assetRole']} ({role['policy']})")
            if a["assetRole"] == "avatar.sender-photo" and ref is not None:
                bound = role.get("senderBindings", {}).get(ref, [])
                sender = None
                if path.startswith("cards[") and path.endswith("].avatar"):
                    i = int(path[len("cards["):path.index("]")])
                    sender = content["cards"][i].get("sender")
                elif path == "senderAvatar":
                    sender = content.get("sender")
                if sender not in bound:
                    errs.append(f"{where}: sender-photo {ref} is bound to {bound}, not {sender!r}")
    return errs


def r_video_budget(ctx, spec):
    count = 0
    for n in spec.get("nodes", []):
        if isinstance(n, dict) and any(a["assetRole"] in VIDEO_ROLES for _, a in _assets(n.get("content", {}))):
            count += 1
    return [f"{count} video-bearing nodes > measured budget 3"] if count > 3 else []


def r_email_swipes(ctx, spec):
    n = _node(spec, "deck.email-stack")
    if n is None:
        return []
    k = len(n.get("content", {}).get("cards", []))
    return [f"deck.email-stack has {k} cards (<4): no visible stack after two swipes"] if k < 4 else []


RULES = {
    "TEMPLATE_GENERATION_ELIGIBLE": r_template_eligible,
    "ROUTE_MATCHES_TEMPLATE": r_route,
    "NODE_SEQUENCE_MATCHES_TEMPLATE": r_node_sequence,
    "SHELL_FIRST": r_shell_first,
    "ONE_HERO": r_one_hero,
    "DECK_GROUP_CONTIGUOUS": r_deck,
    "EXPAND_GROUP_CONTIGUOUS": r_expand,
    "FOOTER_SEQUENCE": r_footer,
    "STOP_COUNT_MATCHES_TEMPLATE": r_stop_count,
    "HINT_STOPS_VALID": r_hint_stops,
    "MOTION_MATCHES_CONTRACT": r_motion,
    "MAX_WORDS": r_max_words,
    "ASSET_ROLE_POLICY": r_asset_policy,
    "VIDEO_BUDGET": r_video_budget,
    "EMAIL_STACK_SWIPES": r_email_swipes,
}


def validate(spec, ctx=None):
    """Return (errors, warnings); each item is (ruleId, message)."""
    ctx = ctx or Context()
    errors, warnings = [], []
    for e in sorted(Draft7Validator(ctx.schema).iter_errors(spec), key=lambda e: list(e.path)):
        errors.append(("SCHEMA", f"{'/'.join(map(str, e.path)) or '<root>'}: {e.message[:200]}"))
    if not isinstance(spec, dict) or not isinstance(spec.get("nodes"), list):
        return errors, warnings
    for rid, fn in RULES.items():
        try:
            msgs = fn(ctx, spec)
        except Exception as ex:  # malformed input that slipped past the schema still fails closed
            msgs = [f"rule crashed on malformed input: {ex!r}"]
        sev = ctx.severity.get(rid, "error")
        for m in msgs:
            (errors if sev == "error" else warnings).append((rid, m))
    return errors, warnings


def main(argv):
    paths = argv[1:] or [os.path.join(REPO, "schema", "example.pagespec.json")]
    ctx = Context()
    bad = 0
    for p in paths:
        spec = json.load(open(p, encoding="utf-8"))
        errs, warns = validate(spec, ctx)
        name = os.path.relpath(p, REPO) if os.path.abspath(p).startswith(REPO) else os.path.basename(p)
        print(f"{name}: {len(errs)} error(s), {len(warns)} warning(s)")
        for r, m in errs:
            print(f"  ERROR [{r}] {m}")
        for r, m in warns:
            print(f"  WARN  [{r}] {m}")
        bad += bool(errs)
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
