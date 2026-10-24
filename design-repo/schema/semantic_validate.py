#!/usr/bin/env python3
"""Semantic validator for Avec PageSpecs.

Runs the Draft-07 schema first, then every rule JSON Schema cannot express. Each rule id
below must also exist in compatibility/graph.json (extraction/verify_all.py enforces the
parity in both directions). The PageSpec's declared template is cross-referenced against
that template's real node list in templates/templates.json -- not just nodes[] in isolation.

PageSpec `mode` (required): `reference` reproduces the Avec source; `generated` is a new page for another brand and
additionally runs the GENERATED_MODE_* rules: no reference-only / blocked asset role, only the roles a section lists in
generatedAssetRoles, and no Avec brand, store mark, source URL, review, rating, person identity, media file or marketing copy
(patterns: assets/asset-roles.json `sourceBrand.patterns`, every string of the PageSpec is scanned).

Usage:
    python3 schema/semantic_validate.py                 # validates the reference example and the generated example
    python3 schema/semantic_validate.py path/to/spec.json [...]
Exit code 1 if any error-severity finding.
"""
import json
import os
import re
import sys

from jsonschema import Draft7Validator

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SHELL_PREFIX = "shell."
DECK_ORDER = ["deck.word-reveal-copy", "deck.email-stack", "deck.triage-game"]
EXPAND_ORDER = ["expand.compose-demo", "expand.be-here-now", "expand.search-demo", "expand.notifications-demo"]
FOOTER_TAIL = ["footer.launch", "proof.reviews-carousel", "footer.bar"]
VIDEO_ROLES = {"media.hero-demo-video", "media.ambient-video", "media.phone-demo-video"}
VIDEO_SECTIONS = {"hero.video", "expand.compose-demo", "expand.be-here-now"}
PLACEHOLDER_URL = re.compile(r"^(#|/[a-z0-9\-/]*|https://example\.(com|org|net)(/[A-Za-z0-9\-/_.]*)?|mailto:[A-Za-z0-9._-]+@example\.(com|org|net))$")
URLISH = re.compile(r"(https?://|mailto:|(^|\s)//|\bwww\.)", re.I)


# ---- section contracts: taxonomy, provenance, retrieval eligibility. Pinned HERE (second source of truth next to each
# contract's own fields; extraction/verify_all.py keeps its own independent copy), so editing a contract alone cannot loosen them.
SECTION_TAXONOMY = {
    "shell.header": "shell", "shell.progress-dots": "shell", "shell.scroll-hint": "layer", "shell.notify-modal": "layer",
    "hero.copy": "hero", "hero.video": "hero",
    "deck.word-reveal-copy": "feature", "deck.email-stack": "feature", "deck.triage-game": "feature",
    "expand.compose-demo": "feature", "expand.be-here-now": "content", "expand.search-demo": "feature", "expand.notifications-demo": "feature",
    "proof.reviews-carousel": "proof", "footer.launch": "cta", "footer.bar": "footer",
}
# Runtime / utility UI is the only retrieval-ineligible set (default true). A modal and a transient hint overlay.
RETRIEVAL_PINNED = {"shell.notify-modal": False, "shell.scroll-hint": False}
MIN_RETRIEVAL_REASON = 30
UTILITY_WORDS = ("cookie", "consent", "modal", "dialog", "overlay", "toast", "popup", "lightbox", "drawer", "snackbar", "preloader", "cursor")
CONVERSION_FIELDS = {"cta", "primaryCta", "secondaryCta"}
CONVERSION_CATEGORIES = {"hero", "shell", "cta", "layer"}


class Context:
    def __init__(self, repo=REPO):
        self.repo = repo
        j = lambda rel: json.load(open(os.path.join(repo, rel), encoding="utf-8"))
        self.schema = j("schema/pagespec.schema.json")
        self.templates = j("templates/templates.json")["templates"]
        self.graph = j("compatibility/graph.json")
        self.assets = j("assets/asset-roles.json")
        self.contract_schema = j("schema/section-contract.schema.json")
        self._contract_findings = None
        self.sections = {}
        sdir = os.path.join(repo, "sections")
        for f in sorted(os.listdir(sdir)):
            if f.endswith(".json"):
                s = json.load(open(os.path.join(sdir, f), encoding="utf-8"))
                self.sections[s["id"]] = s
        self.severity = {r["id"]: r["severity"] for r in self.graph["rules"]}
        sb = self.assets.get("sourceBrand", {}).get("patterns", {})
        self.brand = {}
        self.ngram = 0
        for cat, c in sb.items():
            rx = [p for p in c.get("regex", [])]
            self.brand[cat] = re.compile("|".join(f"(?:{p})" for p in rx), re.I) if rx else None
            if c.get("ngram"):
                self.ngram = int(c["ngram"])
        self._shingles = None

    def shingles(self):
        """5-word runs (normalised) of every string the source's own section contracts carry as copy."""
        if self._shingles is None:
            out = set()
            if self.ngram:
                for s in self.sections.values():
                    for _, txt in strings(s.get("referenceContent", {})):
                        out |= grams(txt, self.ngram)
                    for _, txt in strings(s.get("verbatimReviews", {})):
                        out |= grams(txt, self.ngram)
            self._shingles = out
        return self._shingles


def strings(obj, path=""):
    """Every (path, string value) of a JSON value; keys are not scanned."""
    if isinstance(obj, str):
        yield path, obj
    elif isinstance(obj, dict):
        for k, v in obj.items():
            yield from strings(v, f"{path}.{k}" if path else k)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            yield from strings(v, f"{path}[{i}]")


def grams(text, n):
    w = re.findall(r"[a-z0-9']+", text.lower().replace("\u2019", "'"))
    return {" ".join(w[i:i + n]) for i in range(len(w) - n + 1)}


def contract_findings(ctx):
    """Section-contract rules, evaluated on ctx.sections (cached per context): {ruleId: [messages]}."""
    if ctx._contract_findings is not None:
        return ctx._contract_findings
    out = {k: [] for k in ("SECTION_CONTRACT_SCHEMA", "SECTION_TAXONOMY_PINNED", "CONVERSION_BLOCK_CLASSED_CTA", "RETRIEVAL_ELIGIBILITY_PINNED", "SECTION_SOURCE_STRUCTURE")}
    cv = Draft7Validator(ctx.contract_schema)
    claimed = {}
    for sid, c in sorted(ctx.sections.items()):
        for e in cv.iter_errors(c):
            out["SECTION_CONTRACT_SCHEMA"].append(f"{sid}: {'/'.join(map(str, e.path)) or '<root>'}: {e.message[:140]}")
        sem, src = c.get("semantic") or {}, c.get("source") or {}
        if sem.get("id") != sid:
            out["SECTION_CONTRACT_SCHEMA"].append(f"{sid}: semantic.id {sem.get('id')!r} must equal the contract id")
        want = SECTION_TAXONOMY.get(sid)
        if want is None:
            out["SECTION_TAXONOMY_PINNED"].append(f"{sid}: no pinned taxonomy in semantic_validate.py (review it, then pin it)")
        elif sem.get("category") != want:
            out["SECTION_TAXONOMY_PINNED"].append(f"{sid}: semantic.category {sem.get('category')!r} but pinned {want!r}")
        props = set(((c.get("contentSchema") or {}).get("properties") or {}))
        if props & CONVERSION_FIELDS and sem.get("category") not in CONVERSION_CATEGORIES:
            out["CONVERSION_BLOCK_CLASSED_CTA"].append(f"{sid}: carries conversion fields {sorted(props & CONVERSION_FIELDS)} but is classed {sem.get('category')!r}")
        if props & {"reviewIds", "reviews"} and sem.get("category") != "proof":
            out["CONVERSION_BLOCK_CLASSED_CTA"].append(f"{sid}: review content must be classed proof, not {sem.get('category')!r}")
        got = c.get("retrievalEligible", True)
        pin = RETRIEVAL_PINNED.get(sid, True)
        if got is not pin:
            out["RETRIEVAL_ELIGIBILITY_PINNED"].append(f"{sid}: retrievalEligible is {got!r} but pinned {pin!r}")
        if any(w in sid for w in UTILITY_WORDS) and got is not False:
            out["RETRIEVAL_ELIGIBILITY_PINNED"].append(f"{sid} looks like utility/runtime UI and must set retrievalEligible false")
        if got is False and len(c.get("retrievalReason") or "") < MIN_RETRIEVAL_REASON:
            out["RETRIEVAL_ELIGIBILITY_PINNED"].append(f"{sid}: retrievalEligible false needs a retrievalReason of {MIN_RETRIEVAL_REASON}+ characters")
        a, b = (list(map(int, str(src.get("lines", "")).split("-"))) + [0, 0])[:2] if str(src.get("lines", "")).count("-") == 1 else (0, 0)
        if not (1 <= a <= b):
            out["SECTION_SOURCE_STRUCTURE"].append(f"{sid}: source.lines {src.get('lines')!r} must be 'a-b' with 1 <= a <= b")
        if src.get("id") == sid:
            out["SECTION_SOURCE_STRUCTURE"].append(f"{sid}: source.id must not equal the contract id (provenance is not taxonomy)")
        if str(src.get("file", "")).startswith("/") or ".." in str(src.get("file", "")).split("/"):
            out["SECTION_SOURCE_STRUCTURE"].append(f"{sid}: source.file must be project-relative")
        key = (src.get("file"), src.get("lines"))
        if key in claimed:
            out["SECTION_SOURCE_STRUCTURE"].append(f"{claimed[key]} and {sid} claim the same source range {key[0]}:{key[1]}")
        claimed[key] = sid
    ctx._contract_findings = out
    return out


def _contract_rule(rid):
    return lambda ctx, spec: contract_findings(ctx)[rid]


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
            if role["policy"] == "user-supplied-only":
                scheme = role.get("refScheme", "user-supplied:")
                if ref is not None and not str(ref).startswith(scheme):
                    errs.append(f"{where}: role {a['assetRole']} only accepts a user-supplied assetRef ({scheme}<name>), got {ref!r}")
                continue
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
    generated = spec.get("mode") == "generated"
    for n in spec.get("nodes", []):
        if not isinstance(n, dict):
            continue
        if generated:  # generated visuals are not video-typed; count the sections that carry the three videos
            if n.get("section") in VIDEO_SECTIONS:
                count += 1
        elif any(a["assetRole"] in VIDEO_ROLES for _, a in _assets(n.get("content", {}))):
            count += 1
    return [f"{count} video-bearing nodes > measured budget 3"] if count > 3 else []


def r_email_swipes(ctx, spec):
    n = _node(spec, "deck.email-stack")
    if n is None:
        return []
    k = len(n.get("content", {}).get("cards", []))
    return [f"deck.email-stack has {k} cards (<4): no visible stack after two swipes"] if k < 4 else []


# ------------------------------------------------------------------ generated mode
def _gen(spec):
    return spec.get("mode") == "generated"


def _node_roles(ctx, spec):
    for i, n in enumerate(spec.get("nodes", [])):
        if isinstance(n, dict):
            for path, a in _assets(n.get("content", {})):
                yield i, n, path, a


def r_gen_reference_asset(ctx, spec):
    if not _gen(spec):
        return []
    errs = []
    for i, n, path, a in _node_roles(ctx, spec):
        reg = ctx.assets["roles"].get(a["assetRole"])
        if reg and reg.get("availability") != "generation-safe":
            subs = ", ".join(reg.get("generationSafeSubstitutes", [])) or "none: omit it"
            errs.append(f"nodes[{i}] {n.get('section')}.{path}: role {a['assetRole']} is {reg.get('availability')} and cannot appear in a generated page (use: {subs})")
    return errs


def r_gen_role(ctx, spec):
    if not _gen(spec):
        return []
    errs = []
    for i, n, path, a in _node_roles(ctx, spec):
        reg = ctx.assets["roles"].get(a["assetRole"])
        sec = ctx.sections.get(n.get("section"))
        if reg and reg.get("availability") == "generation-safe" and sec is not None and a["assetRole"] not in sec.get("generatedAssetRoles", []):
            errs.append(f"nodes[{i}] {n.get('section')}.{path}: role {a['assetRole']} is not a generated-mode role of this section (allowed: {', '.join(sec.get('generatedAssetRoles', [])) or 'none'})")
    co = (spec.get("meta") or {}).get("copyOrigin") if isinstance(spec.get("meta"), dict) else None
    if not isinstance(co, dict) or co.get("assetRole") != "content.original-copy":
        errs.append("meta.copyOrigin (content.original-copy attestation) is required in generated mode")
    return errs


def _scan(cat, label):
    def fn(ctx, spec):
        if not _gen(spec):
            return []
        rx = ctx.brand.get(cat)
        errs = []
        if rx is None:
            return [f"no sourceBrand.patterns.{cat} regex is registered; generated mode cannot be checked"]
        for path, txt in strings(spec):
            m = rx.search(txt)
            if m:
                errs.append(f"{path}: {label} ('{m.group(0)}')")
        return errs
    return fn


def r_gen_url(ctx, spec):
    errs = _scan("urls", "source-specific URL")(ctx, spec)
    if not _gen(spec):
        return errs
    for path, txt in strings(spec):
        if URLISH.search(txt) and not PLACEHOLDER_URL.match(txt):
            errs.append(f"{path}: URL is not a placeholder (allowed: #, a relative path, https://example.com|org|net/..., mailto:...@example.com): {txt[:60]!r}")
    return errs


def r_gen_copy(ctx, spec):
    errs = _scan("copy", "source marketing copy")(ctx, spec)
    if not _gen(spec) or not ctx.ngram:
        return errs
    corpus = ctx.shingles()
    for path, txt in strings(spec):
        hit = grams(txt, ctx.ngram) & corpus
        if hit:
            errs.append(f"{path}: reuses a {ctx.ngram}-word run of the source's own copy ('{sorted(hit)[0]}')")
    return errs


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
    "SECTION_CONTRACT_SCHEMA": _contract_rule("SECTION_CONTRACT_SCHEMA"),
    "SECTION_TAXONOMY_PINNED": _contract_rule("SECTION_TAXONOMY_PINNED"),
    "CONVERSION_BLOCK_CLASSED_CTA": _contract_rule("CONVERSION_BLOCK_CLASSED_CTA"),
    "RETRIEVAL_ELIGIBILITY_PINNED": _contract_rule("RETRIEVAL_ELIGIBILITY_PINNED"),
    "SECTION_SOURCE_STRUCTURE": _contract_rule("SECTION_SOURCE_STRUCTURE"),
    "GENERATED_MODE_REFERENCE_ASSET": r_gen_reference_asset,
    "GENERATED_MODE_ROLE": r_gen_role,
    "GENERATED_MODE_SOURCE_BRAND": _scan("brand", "names or marks the Avec brand"),
    "GENERATED_MODE_STORE_MARK": _scan("storeMarks", "App Store / TestFlight / platform mark"),
    "GENERATED_MODE_SOURCE_URL": r_gen_url,
    "GENERATED_MODE_REVIEW": _scan("reviews", "real review, reviewer or review id"),
    "GENERATED_MODE_RATING": _scan("ratings", "the source's rating"),
    "GENERATED_MODE_PERSON": _scan("people", "real or demo person / sender identity"),
    "GENERATED_MODE_MEDIA": _scan("media", "source media file, path or hash"),
    "GENERATED_MODE_SOURCE_COPY": r_gen_copy,
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
    paths = argv[1:] or [os.path.join(REPO, "schema", "example.pagespec.json"),
                         os.path.join(REPO, "schema", "examples", "generated.template.home.pagespec.json")]
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
