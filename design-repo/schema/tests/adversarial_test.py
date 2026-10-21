#!/usr/bin/env python3
"""Adversarial suite for the Avec design-repo.

Part A - PageSpec mutations: each mutates schema/example.pagespec.json and must be REJECTED, and the
         expected rule id must be among the errors (so a mutation rejected for an unrelated reason
         does not count as a pass).
Part B - Controls: the unmutated example, and one PageSpec synthesized generically per
         generation-eligible template from each section contract's referenceContent, must produce
         ZERO errors.
Part C - Repo-drift mutations: copy the repo to a scratch dir, inject drift, run
         extraction/verify_all.py's checks there, and assert the matching check FAILS (and that the
         unmutated scratch copy passes that same check).

Usage: python3 schema/tests/adversarial_test.py     (exit 1 on any unexpected outcome)
"""
import copy
import importlib.util
import json
import os
import shutil
import sys
import tempfile

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def load(name, rel, repo=REPO):
    spec = importlib.util.spec_from_file_location(name + str(abs(hash(repo))), os.path.join(repo, rel))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


sv = load("sv", "schema/semantic_validate.py")
va = load("va", "extraction/verify_all.py")
CTX = sv.Context(REPO)
EXAMPLE = json.load(open(os.path.join(REPO, "schema", "example.pagespec.json"), encoding="utf-8"))


def node(spec, sid):
    return next(n for n in spec["nodes"] if n["section"] == sid)


def move(spec, sid, new_index):
    n = node(spec, sid)
    spec["nodes"].remove(n)
    spec["nodes"].insert(new_index, n)


def idx(spec, sid):
    return [n["section"] for n in spec["nodes"]].index(sid)


def m(fn):
    def apply(s):
        fn(s)
        return s
    return apply


MUTATIONS = [
    # ---- schema layer
    ("unknown template id", "SCHEMA", m(lambda s: s.update(template="template.landing"))),
    ("not-eligible template.legal", "TEMPLATE_GENERATION_ELIGIBLE", m(lambda s: s.update(template="template.legal", route="/terms"))),
    ("missing reducedMotionFallback", "SCHEMA", m(lambda s: node(s, "hero.video")["motion"].pop("reducedMotionFallback"))),
    ("invented motion field", "SCHEMA", m(lambda s: node(s, "deck.email-stack")["motion"].update(inventedAnimation="parallax"))),
    ("wrong motion pattern for section", "SCHEMA", m(lambda s: node(s, "hero.video")["motion"].update(pattern="static"))),
    ("wrong reducedMotionFallback for section", "SCHEMA", m(lambda s: node(s, "expand.compose-demo")["motion"].update(reducedMotionFallback="instant-state-change"))),
    ("invented section type", "SCHEMA", m(lambda s: node(s, "hero.copy").update(section="hero.split"))),
    ("extra content property", "SCHEMA", m(lambda s: node(s, "hero.copy")["content"].update(eyebrow="New"))),
    ("missing required content field", "SCHEMA", m(lambda s: node(s, "hero.copy")["content"].pop("headline"))),
    ("invented assetRole", "SCHEMA", m(lambda s: node(s, "shell.header")["content"]["logo"].update(assetRole="brand.logo-ai-generated"))),
    ("TestFlight href changed", "SCHEMA", m(lambda s: node(s, "hero.copy")["content"]["cta"].update(href="https://example.com/download"))),
    ("copyright entity changed", "SCHEMA", m(lambda s: node(s, "footer.bar")["content"].update(copyright="Copyright © 2026 Avec Inc."))),
    ("rating fabricated", "SCHEMA", m(lambda s: node(s, "hero.copy")["content"]["rating"].update(reviewCountLabel="10,000+ reviews"))),
    ("invented review id", "SCHEMA", m(lambda s: node(s, "proof.reviews-carousel")["content"]["reviewIds"].append("review.07"))),
    ("free-text review smuggled in", "SCHEMA", m(lambda s: node(s, "proof.reviews-carousel")["content"].update(reviews=[{"title": "Love it", "author": "new_user", "body": "Great"}]))),
    ("deck chunks != 3", "SCHEMA", m(lambda s: node(s, "deck.word-reveal-copy")["content"]["chunks"].append("And search too."))),
    ("variant not in contract", "SCHEMA", m(lambda s: node(s, "hero.copy").update(variant="split"))),
    ("bad pageSpecVersion", "SCHEMA", m(lambda s: s.update(pageSpecVersion="2.0.0"))),
    ("dark theme requested", "SCHEMA", m(lambda s: s.update(theme="dark"))),
    # ---- structural / template cross-reference
    ("removed required section", "NODE_SEQUENCE_MATCHES_TEMPLATE", m(lambda s: s["nodes"].remove(node(s, "deck.triage-game")))),
    ("duplicate hero.copy", "ONE_HERO", m(lambda s: s["nodes"].insert(idx(s, "hero.copy") + 2, copy.deepcopy(node(s, "hero.copy"))))),
    ("duplicate non-repeatable node", "NODE_SEQUENCE_MATCHES_TEMPLATE", m(lambda s: s["nodes"].insert(idx(s, "expand.search-demo"), copy.deepcopy(node(s, "expand.search-demo"))))),
    ("footer.bar not last", "FOOTER_SEQUENCE", m(lambda s: move(s, "footer.bar", idx(s, "footer.launch")))),
    ("ia.json footer order (proof before launch)", "NODE_SEQUENCE_MATCHES_TEMPLATE", m(lambda s: move(s, "proof.reviews-carousel", idx(s, "footer.launch")))),
    ("expand group reordered", "EXPAND_GROUP_CONTIGUOUS", m(lambda s: move(s, "expand.search-demo", idx(s, "expand.be-here-now")))),
    ("deck group split by expand node", "DECK_GROUP_CONTIGUOUS", m(lambda s: move(s, "expand.compose-demo", idx(s, "deck.email-stack")))),
    ("shell node after content", "SHELL_FIRST", m(lambda s: move(s, "shell.scroll-hint", idx(s, "hero.video") + 1))),
    ("hero.video detached from hero.copy", "ONE_HERO", m(lambda s: move(s, "hero.video", idx(s, "deck.email-stack")))),
    ("route not in template", "ROUTE_MATCHES_TEMPLATE", m(lambda s: s.update(route="/pricing"))),
    ("progress dots stopCount drift", "STOP_COUNT_MATCHES_TEMPLATE", m(lambda s: node(s, "shell.progress-dots")["content"].update(stopCount=12))),
    ("durationToken outside contract", "MOTION_MATCHES_CONTRACT", m(lambda s: node(s, "hero.copy")["motion"].update(durationTokens=["press", "crossfade"]))),
    # ---- runtime word budgets
    ("maxWords overflow hero headline", "MAX_WORDS", m(lambda s: node(s, "hero.copy")["content"].update(headline="Handle your entire inbox, every single newsletter and thread, in just one minute a day"))),
    ("maxWords overflow email body (array path)", "MAX_WORDS", m(lambda s: node(s, "deck.email-stack")["content"]["cards"][2].update(body=" ".join(["word"] * 120)))),
    ("maxWords overflow caption (nested path)", "MAX_WORDS", m(lambda s: node(s, "expand.compose-demo")["content"]["captions"].update(learn=" ".join(["sound"] * 30)))),
    # ---- asset roles / likeness / trademarks
    ("sender photo not an allowed ref", "ASSET_ROLE_POLICY", m(lambda s: node(s, "deck.email-stack")["content"]["cards"][0]["avatar"].update(assetRef="/assets/avatars/ai-generated-person.png"))),
    ("sender photo bound to wrong sender", "ASSET_ROLE_POLICY", m(lambda s: node(s, "deck.email-stack")["content"]["cards"][0].update(sender="Dana Chen"))),
    ("wordmark swapped for generated file", "ASSET_ROLE_POLICY", m(lambda s: node(s, "shell.header")["content"]["logo"].update(assetRef="/assets/avec-logo-redrawn.svg"))),
    ("token-only initials avatar carries image", "ASSET_ROLE_POLICY", m(lambda s: node(s, "deck.email-stack")["content"]["cards"][1].update(avatar={"assetRole": "avatar.initials", "assetRef": "/assets/avatars/nina-park.png"}))),
    ("store badge replaced", "ASSET_ROLE_POLICY", m(lambda s: node(s, "hero.copy")["content"]["rating"]["storeBadge"].update(assetRef="/assets/google-play-badge.svg"))),
]


def synth_controls():
    out = []
    for tid, t in CTX.templates.items():
        if not t["generationEligible"]:
            continue
        nodes = []
        for i, tn in enumerate(t["nodes"]):
            c = CTX.sections[tn["section"]]
            mo = c["motion"]
            nodes.append({"id": f"n{i:02d}", "section": tn["section"], "variant": c["variants"][0], "content": copy.deepcopy(c["referenceContent"]),
                          "motion": {"pattern": mo["pattern"], "trigger": mo["trigger"], "reducedMotionFallback": mo["reducedMotionFallback"]}})
        out.append((f"synthesized control for {tid}", {"pageSpecVersion": "1.0.0", "template": tid, "route": t["routes"][0], "theme": "light",
                                                         "meta": {"title": "Control", "description": "Synthesized from section referenceContent."}, "nodes": nodes}))
    return out


# ------------------------------------------------------------------ repo drift (Part C)
def scratch():
    d = tempfile.mkdtemp(prefix="avec-drift-")
    dst = os.path.join(d, "design-repo")
    shutil.copytree(REPO, dst, ignore=shutil.ignore_patterns("__pycache__"))
    return d, dst


def jedit(repo, rel, fn):
    p = os.path.join(repo, rel)
    d = json.load(open(p, encoding="utf-8"))
    fn(d)
    json.dump(d, open(p, "w", encoding="utf-8"), indent=2, ensure_ascii=False)


def fake_source(root):
    os.makedirs(os.path.join(root, "src"), exist_ok=True)
    open(os.path.join(root, "src", "demo.js"), "w").write("const alpha = 1\nconst beta = 2\nconst gamma = 3\n")
    open(os.path.join(root, "CLONE_SPEC.md"), "w").write("fake\n")


def set_evidence(ev):
    def fn(mv):
        mv["evidence"] = ev
    return fn


def stale_readme(r):
    p = os.path.join(r, "README.md")
    text = open(p, encoding="utf-8").read()
    assert "| sections | 16 |" in text
    open(p, "w", encoding="utf-8").write(text.replace("| sections | 16 |", "| sections | 15 |"))


GOOD_EV = {"ev.demo": {"kind": "lines", "path": "src/demo.js", "lines": "1-2", "expect": "const beta"}}

DRIFT = [
    ("phantom allowlist entry", "allowlist_parity", lambda r: jedit(r, "tokens/llm/component-allowlist.json", lambda d: d["entries"].update({"primitive.divider": {"layer": "primitive", "file": "primitives/divider.json"}}))),
    ("orphan contract file", "allowlist_parity", lambda r: shutil.copy(os.path.join(r, "primitives/avatar.json"), os.path.join(r, "primitives/avatar-copy.json"))),
    ("allowlist version drift", "version_parity", lambda r: jedit(r, "tokens/llm/component-allowlist.json", lambda d: d.update(version="1.1.0"))),
    ("manifest count wrong", "manifest_counts", lambda r: jedit(r, "registry.manifest.json", lambda d: d["counts"].update(sections=17))),
    ("manifest count stale after adding a section", "manifest_counts", lambda r: shutil.copy(os.path.join(r, "sections/footer.bar.json"), os.path.join(r, "sections/footer.bar-copy.json"))),
    ("README count table stale", "manifest_counts", lambda r: stale_readme(r)),
    ("entryPoint outside package", "entry_points", lambda r: jedit(r, "registry.manifest.json", lambda d: d["entryPoints"].update(ia="../ia.json"))),
    ("absolute path injected", "no_absolute_paths", lambda r: jedit(r, "templates/routes.json",lambda d: d.update(note="/" + "Users/someone/avec"))),
    ("pinned asset policy changed to a different VALID value", "asset_roles", lambda r: jedit(r, "assets/asset-roles.json", lambda d: d["roles"]["brand.wordmark"].update(policy="no-generation-proprietary"))),
    ("sender-photo policy loosened to generate-new-allowed", "asset_roles", lambda r: jedit(r, "assets/asset-roles.json", lambda d: d["roles"]["avatar.sender-photo"].update(policy="generate-new-allowed"))),
    ("graph rule without validator", "graph_validator_parity", lambda r: jedit(r, "compatibility/graph.json", lambda d: d["rules"].append({"id": "NO_ADJACENT_SAME_CATEGORY", "severity": "error", "rule": "x"}))),
    ("section motion drifts from schema const", "schema_contract_parity", lambda r: jedit(r, "sections/hero.video.json", lambda d: d["motion"].update(pattern="static"))),
    ("motion schema opened", "schema_contract_parity", lambda r: jedit(r, "schema/pagespec.schema.json", lambda d: d["definitions"]["motion"].update(additionalProperties=True))),
    ("policy key not a real catalog key", "token_policy", lambda r: jedit(r, "tokens/llm/token-policy.json", lambda d: d["rawValueRestrictions"].update(typography="x"))),
    ("semantic alias to missing foundation", "tokens", lambda r: jedit(r, "tokens/10-semantic/color.json", lambda d: d["semantic"]["text"]["primary"].update({"$value": "{color.ink}"}))),
    ("route double-assigned", "templates_routes", lambda r: jedit(r, "templates/routes.json", lambda d: d["routes"].append({"route": "/", "template": "template.legal", "evidenceLevel": "x"}))),
    ("legal template made eligible with no nodes", "templates_routes", lambda r: jedit(r, "templates/templates.json", lambda d: d["templates"]["template.legal"].update(generationEligible=True))),
    ("unresolved evidence id", "evidence_ids", lambda r: jedit(r, "sections/hero.copy.json", lambda d: d["evidenceIds"].append("ev.made.up"))),
    ("zip shipped inside package", "no_zip_inside", lambda r: open(os.path.join(r, "design-repo.zip"), "wb").write(b"PK")),
]
CITATION_DRIFT = [
    ("citation out of range", {"ev.demo": dict(GOOD_EV["ev.demo"], lines="2-40")}),
    ("citation in range but wrong content", {"ev.demo": dict(GOOD_EV["ev.demo"], lines="1", expect="const beta")}),
    ("citation file missing", {"ev.demo": dict(GOOD_EV["ev.demo"], path="src/gone.js")}),
    ("citation escapes source root", {"ev.demo": dict(GOOD_EV["ev.demo"], path="../outside.js")}),
]


def main():
    fails = 0
    print("== Part A: PageSpec mutations (must be rejected by the expected rule)")
    for name, rule, fn in MUTATIONS:
        spec = fn(copy.deepcopy(EXAMPLE))
        errs, _ = sv.validate(spec, CTX)
        rules = {r for r, _ in errs}
        ok = bool(errs) and rule in rules
        fails += not ok
        print(f"  {'REJECTED' if ok else 'NOT-CAUGHT'}  {name}  [expect {rule}; got {sorted(rules) or 'no errors'}]")

    print("== Part B: controls (must pass with zero errors)")
    controls = [("unmutated example.pagespec.json", copy.deepcopy(EXAMPLE))] + synth_controls()
    for name, spec in controls:
        errs, warns = sv.validate(spec, CTX)
        ok = not errs
        fails += not ok
        print(f"  {'PASS' if ok else 'FAIL'}  {name}  ({len(errs)} errors, {len(warns)} warnings{': ' + '; '.join(r for r, _ in warns) if warns else ''})")
        for r, msg in errs:
            print(f"      ERROR [{r}] {msg}")

    print("== Part C: repo drift injected into a scratch copy (matching verify_all check must FAIL)")
    base_dir, base = scratch()
    try:
        base_res = va.run_checks(base, None, quiet=True)
    finally:
        shutil.rmtree(base_dir)
    for name, check, fn in DRIFT:
        d, r = scratch()
        try:
            clean_ok = not base_res[check][0]
            fn(r)
            res = va.run_checks(r, None, quiet=True)
            caught = bool(res[check][0])
            ok = clean_ok and caught
            fails += not ok
            print(f"  {'CAUGHT' if ok else 'MISSED'}  {name}  [{check}: clean={'pass' if clean_ok else 'FAIL'}, drifted={'fail' if caught else 'pass'}]")
        finally:
            shutil.rmtree(d)
    for name, ev in [("citation control (valid fake citation)", GOOD_EV)] + CITATION_DRIFT:
        d, r = scratch()
        try:
            fake_source(d)
            errs = va.check_citations(ev, d)
            if name.startswith("citation control"):
                ok = not errs
                print(f"  {'PASS' if ok else 'FAIL'}  {name}")
            else:
                ok = bool(errs)
                print(f"  {'CAUGHT' if ok else 'MISSED'}  {name}  [{errs[0] if errs else 'no error'}]")
            fails += not ok
        finally:
            shutil.rmtree(d)

    total = len(MUTATIONS) + len(controls) + len(DRIFT) + len(CITATION_DRIFT) + 1
    print(f"\n{total - fails}/{total} adversarial expectations met ({len(MUTATIONS)} PageSpec mutations, {len(controls)} controls, {len(DRIFT) + len(CITATION_DRIFT)} repo-drift injections, 1 citation control)")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
