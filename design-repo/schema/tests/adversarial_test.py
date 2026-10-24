#!/usr/bin/env python3
"""Adversarial suite for the Avec design-repo.

Part A - PageSpec mutations: each mutates schema/example.pagespec.json (mode `reference`) or
         schema/examples/generated.template.home.pagespec.json (mode `generated`) and must be REJECTED, and
         the expected rule id must be among the errors (so a mutation rejected for an unrelated reason
         does not count as a pass). The generated-mode set covers brand/logo, App Store / TestFlight, real
         review / rating, person identity, source URL, proprietary media and source copy leakage.
Part B - Controls: both unmutated examples, and per generation-eligible template one reference PageSpec
         (from each section's referenceContent) and one generated PageSpec (from generatedReferenceContent),
         must produce ZERO errors.
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
GEN = json.load(open(os.path.join(REPO, "schema", "examples", "generated.template.home.pagespec.json"), encoding="utf-8"))


def node(spec, sid):
    return next(n for n in spec["nodes"] if n["section"] == sid)


def move(spec, sid, new_index):
    n = node(spec, sid)
    spec["nodes"].remove(n)
    spec["nodes"].insert(new_index, n)


def idx(spec, sid):
    return [n["section"] for n in spec["nodes"]].index(sid)


def cset(sid, path, val):
    """Mutator: set content.<path...> of section sid (path items may be list indexes)."""
    def fn(s):
        o = node(s, sid)["content"]
        for k in path[:-1]:
            o = o[k]
        o[path[-1]] = val
    return m(fn)


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
    ("old pageSpecVersion 1.0.0 (no mode era)", "SCHEMA", m(lambda s: s.update(pageSpecVersion="1.0.0"))),
    ("mode missing", "SCHEMA", m(lambda s: s.pop("mode"))),
    ("mode wrong case", "SCHEMA", m(lambda s: s.update(mode="Reference"))),
    ("mode invented value", "SCHEMA", m(lambda s: s.update(mode="clone"))),
    ("reference example flipped to generated", "SCHEMA", m(lambda s: s.update(mode="generated"))),
    ("reference page uses a generation-safe-only logo role", "SCHEMA", m(lambda s: node(s, "shell.header")["content"]["logo"].update(assetRole="brand.logo-placeholder"))),
    ("reference page carries copyOrigin", "SCHEMA", m(lambda s: s["meta"].update(copyOrigin={"assetRole": "content.original-copy", "attestation": "original-or-user-supplied"}))),
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


def gset(*a):
    return cset(*a)


GEN_MUTATIONS = [
    # ---- brand / logo leakage
    ("Avec name in hero headline", "GENERATED_MODE_SOURCE_BRAND", gset("hero.copy", ["headline"], "Avec clears your mail")),
    ("Avec name in meta.title", "GENERATED_MODE_SOURCE_BRAND", m(lambda s: s["meta"].update(title="Avec - Calm mail"))),
    ("Avec company name in the copyright placeholder", "GENERATED_MODE_SOURCE_BRAND", gset("footer.bar", ["copyright"], "Copyright \u00a9 2026 Nearly Extraterrestrial Technology, Inc.")),
    ("Avec logo role (wordmark) in the header", "GENERATED_MODE_REFERENCE_ASSET", gset("shell.header", ["logo"], {"assetRole": "brand.wordmark", "assetRef": "/assets/avec-logo.svg"})),
    ("Avec glyph role in the footer", "GENERATED_MODE_REFERENCE_ASSET", gset("footer.launch", ["glyph"], {"assetRole": "brand.glyph", "assetRef": "inline:Icons.AvecLogo"})),
    ("Avec app icon role on the banner", "GENERATED_MODE_REFERENCE_ASSET", gset("expand.notifications-demo", ["bannerIcon"], {"assetRole": "brand.app-icon", "assetRef": "/assets/square-logo-195.png"})),
    ("user-supplied logo ref points at the Avec logo file", "GENERATED_MODE_SOURCE_BRAND", gset("shell.header", ["logo"], {"assetRole": "brand.logo-user-supplied", "assetRef": "user-supplied:avec-logo.svg"})),
    ("placeholder logo carrying an assetRef", "ASSET_ROLE_POLICY", gset("shell.header", ["logo"], {"assetRole": "brand.logo-placeholder", "assetRef": "user-supplied:mine.svg"})),
    ("user-supplied logo with a non user-supplied ref", "ASSET_ROLE_POLICY", gset("shell.header", ["logo"], {"assetRole": "brand.logo-user-supplied", "assetRef": "/assets/avec-logo.svg"})),
    # ---- App Store / TestFlight marks
    ("TestFlight store-badge role on the header CTA", "GENERATED_MODE_REFERENCE_ASSET", gset("shell.header", ["primaryCta", "icon"], {"assetRole": "thirdparty.store-badge", "assetRef": "/assets/testflight.png"})),
    ("App Store wordmark role on the hero rating", "GENERATED_MODE_REFERENCE_ASSET", gset("hero.copy", ["rating", "storeBadge"], {"assetRole": "thirdparty.store-badge", "assetRef": "/assets/app-store-wordmark.svg"})),
    ("Outlook/Android platform-icon role on the modal", "GENERATED_MODE_REFERENCE_ASSET", gset("shell.notify-modal", ["icon"], {"assetRole": "thirdparty.platform-icon", "assetRef": "/assets/outlook-icon.svg"})),
    ("TestFlight named in a CTA label", "GENERATED_MODE_STORE_MARK", gset("shell.header", ["primaryCta", "label"], "Join on TestFlight")),
    ("'Download on the App Store' in the subheadline", "GENERATED_MODE_STORE_MARK", gset("hero.copy", ["subheadline"], "Download on the App Store today")),
    ("Outlook and Android named in the modal subtitle", "GENERATED_MODE_STORE_MARK", gset("shell.notify-modal", ["subtitle"], "Outlook and Android versions soon")),
    # ---- real ratings / reviews
    ("source rating 5.0 in the subheadline", "GENERATED_MODE_RATING", gset("hero.copy", ["subheadline"], "Rated 5.0 by readers")),
    ("source review count in the rating label", "GENERATED_MODE_RATING", gset("hero.copy", ["rating", "reviewCountLabel"], "400+ reviews")),
    ("source score in the rating", "GENERATED_MODE_RATING", gset("hero.copy", ["rating", "score"], "5.0")),
    ("rating without the placeholder role (stars 5)", "SCHEMA", gset("hero.copy", ["rating", "stars"], 5)),
    ("verbatim real review title", "GENERATED_MODE_REVIEW", gset("proof.reviews-carousel", ["reviews", 0, "title"], "Way better than Gmail!")),
    ("real reviewer handle as author", "GENERATED_MODE_REVIEW", gset("proof.reviews-carousel", ["reviews", 1, "author"], "Rudraksh Awasthi")),
    ("real review id reused", "GENERATED_MODE_REVIEW", gset("proof.reviews-carousel", ["reviews", 2, "body"], "See review.03 for the full text")),
    ("review not marked fictional", "SCHEMA", gset("proof.reviews-carousel", ["reviews", 0, "fictional"], False)),
    ("source-shaped reviewIds list instead of fictional reviews", "SCHEMA", m(lambda s: node(s, "proof.reviews-carousel").update(content={"reviewIds": ["review.01", "review.02", "review.03"], "starsPerReview": 5}))),
    # ---- real people / reviewer identities
    ("source persona as email sender", "GENERATED_MODE_PERSON", gset("deck.email-stack", ["cards", 0, "sender"], "Dana Chen")),
    ("source sender brand in a search result", "GENERATED_MODE_PERSON", gset("expand.search-demo", ["sources", 0, "name"], "Acorns")),
    ("source persona addressed in an email body", "GENERATED_MODE_PERSON", gset("expand.notifications-demo", ["emailBody"], "Hi Diego,\n\nYour train moved.")),
    ("real sender photo role on an email card", "GENERATED_MODE_REFERENCE_ASSET", gset("deck.email-stack", ["cards", 0, "avatar"], {"assetRole": "avatar.sender-photo", "assetRef": "/assets/avatars/dana-chen.png"})),
    ("real sender photo role on the notification", "GENERATED_MODE_REFERENCE_ASSET", gset("expand.notifications-demo", ["senderAvatar"], {"assetRole": "avatar.sender-photo", "assetRef": "/assets/avatars/pacific-airlines.png"})),
    # ---- source URLs
    ("real TestFlight URL on the hero CTA", "GENERATED_MODE_SOURCE_URL", gset("hero.copy", ["cta", "href", "url"], "https://testflight.apple.com/join/3JR2HxjZ")),
    ("source social profile URL", "GENERATED_MODE_SOURCE_URL", gset("footer.bar", ["socialLinks", 0, "href", "url"], "https://x.com/avec")),
    ("source contact mailbox", "GENERATED_MODE_SOURCE_URL", gset("footer.bar", ["socialLinks", 2, "href", "url"], "mailto:hi@avec.ai")),
    ("non-placeholder real-looking URL", "GENERATED_MODE_SOURCE_URL", gset("footer.launch", ["primaryCta", "href", "url"], "https://acme-mail.io/download")),
    ("href as a bare string (no placeholder role)", "SCHEMA", gset("footer.launch", ["primaryCta", "href"], "https://testflight.apple.com/join/3JR2HxjZ")),
    # ---- proprietary media / screenshots
    ("hero demo video role", "GENERATED_MODE_REFERENCE_ASSET", gset("hero.video", ["primaryVideo"], {"assetRole": "media.hero-demo-video", "assetRef": "/assets/hero-triage.mp4"})),
    ("ambient wave video role", "GENERATED_MODE_REFERENCE_ASSET", gset("expand.be-here-now", ["expandVideo"], {"assetRole": "media.ambient-video", "assetRef": "/assets/hero-waves.mp4"})),
    ("phone demo video role", "GENERATED_MODE_REFERENCE_ASSET", gset("expand.compose-demo", ["phoneVideo"], {"assetRole": "media.phone-demo-video", "assetRef": "/assets/phone-demo.webm"})),
    ("section preview screenshot role", "GENERATED_MODE_REFERENCE_ASSET", gset("shell.progress-dots", ["previewFrames"], {"assetRole": "media.section-preview-frame", "assetRef": "/assets/frames/frame-01.057mo71r_kzoc.png"})),
    ("generated visual pointing at a source file", "GENERATED_MODE_MEDIA", gset("hero.video", ["loopVideo"], {"assetRole": "media.user-supplied", "assetRef": "user-supplied:hero-waves.mp4"})),
    ("source media hash in a label", "GENERATED_MODE_MEDIA", gset("hero.video", ["overlayCtaLabel"], "5d520b4b4002bff5")),
    ("source media path in copy", "GENERATED_MODE_MEDIA", gset("expand.notifications-demo", ["emailBody"], "See /assets/hero-triage.mp4 for the clip")),
    ("generated visual carrying a source assetRef", "SCHEMA", gset("hero.video", ["primaryVideo"], {"assetRole": "media.generated-product-visual", "assetRef": "/assets/hero-triage.mp4"})),
    # ---- source marketing copy
    ("source headline", "GENERATED_MODE_SOURCE_COPY", gset("hero.copy", ["headline"], "Handle your inbox in one minute a day")),
    ("source claim in the subheadline", "GENERATED_MODE_SOURCE_COPY", gset("hero.copy", ["subheadline"], "Made for people who hate email.")),
    ("source joke reworded in the aside", "GENERATED_MODE_SOURCE_COPY", gset("deck.word-reveal-copy", ["aside"], "(Yes, like Tinder for email)")),
    ("5-word run copied from a source caption", "GENERATED_MODE_SOURCE_COPY", gset("expand.compose-demo", ["captions", "learn"], "Review it, tweak it, and send it.")),
    # ---- roles outside the section's generated set / attestation
    ("role not listed for the section", "GENERATED_MODE_ROLE", gset("shell.progress-dots", ["previewFrames"], {"assetRole": "icon.generic-glyph"})),
    ("copyOrigin attestation missing", "GENERATED_MODE_ROLE", m(lambda s: s["meta"].pop("copyOrigin"))),
    ("mode missing on the generated example", "SCHEMA", m(lambda s: s.pop("mode"))),
    ("generated example flipped to reference", "SCHEMA", m(lambda s: s.update(mode="reference"))),
    ("mode wrong case on the generated example", "SCHEMA", m(lambda s: s.update(mode="GENERATED"))),
    ("reference-shaped content (real TestFlight href const) in generated mode", "SCHEMA", gset("hero.copy", ["cta"], {"label": "Get it", "href": "https://testflight.apple.com/join/3JR2HxjZ", "icon": {"assetRole": "thirdparty.store-badge"}})),
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
        out.append((f"synthesized reference control for {tid}", {"pageSpecVersion": "1.1.0", "mode": "reference", "template": tid, "route": t["routes"][0], "theme": "light",
                                                                  "meta": {"title": "Control", "description": "Synthesized from section referenceContent."}, "nodes": nodes}))
        gnodes = []
        for i, tn in enumerate(t["nodes"]):
            c = CTX.sections[tn["section"]]
            mo = c["motion"]
            gnodes.append({"id": f"n{i:02d}", "section": tn["section"], "variant": c["variants"][0], "content": copy.deepcopy(c["generatedReferenceContent"]),
                           "motion": {"pattern": mo["pattern"], "trigger": mo["trigger"], "reducedMotionFallback": mo["reducedMotionFallback"]}})
        out.append((f"synthesized generated control for {tid}", {"pageSpecVersion": "1.1.0", "mode": "generated", "template": tid, "route": t["routes"][0], "theme": "light",
                                                                 "meta": {"title": "Control", "description": "Synthesized from section generatedReferenceContent.",
                                                                          "copyOrigin": {"assetRole": "content.original-copy", "attestation": "original-or-user-supplied"}}, "nodes": gnodes}))
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
def role_av(rid, val):
    return lambda r: jedit(r, "assets/asset-roles.json", lambda d: d["roles"][rid].update(availability=val))


def drop_regex(cat, rx):
    return lambda r: jedit(r, "assets/asset-roles.json", lambda d: d["sourceBrand"]["patterns"][cat]["regex"].remove(rx))


def validator_text(a, b):
    def fn(r):
        p = os.path.join(r, "schema", "semantic_validate.py")
        t = open(p, encoding="utf-8").read()
        assert a in t, a
        open(p, "w", encoding="utf-8").write(t.replace(a, b))
    return fn


def pinned_pair(r):
    def f(d):
        d["roles"]["brand.wordmark"]["policy"] = "no-generation-proprietary"
        d["pinnedPolicies"]["brand.wordmark"] = "no-generation-proprietary"
    jedit(r, "assets/asset-roles.json", f)


def gen_example_edit(fn):
    return lambda r: jedit(r, "schema/examples/generated.template.home.pagespec.json", fn)


DRIFT_GEN = [
    ("PIN: reference-only brand.wordmark loosened to generation-safe (substitutes also dropped)", "generated_mode", lambda r: jedit(r, "assets/asset-roles.json", lambda d: (d["roles"]["brand.wordmark"].update(availability="generation-safe"), d["roles"]["brand.wordmark"].pop("generationSafeSubstitutes")))),
    ("PIN: blocked thirdparty.store-badge loosened to generation-safe", "generated_mode", lambda r: jedit(r, "assets/asset-roles.json", lambda d: (d["roles"]["thirdparty.store-badge"].update(availability="generation-safe"), d["roles"]["thirdparty.store-badge"].pop("generationSafeSubstitutes")))),
    ("PIN: blocked avatar.sender-photo changed to a different VALID availability (reference-only)", "generated_mode", role_av("avatar.sender-photo", "reference-only")),
    ("PIN: generation-safe link.placeholder-url tightened to reference-only", "generated_mode", lambda r: jedit(r, "assets/asset-roles.json", lambda d: (d["roles"]["link.placeholder-url"].update(availability="reference-only", generationSafeSubstitutes=["content.original-copy"])))),
    ("availability set to an invalid value", "generated_mode", role_av("media.hero-demo-video", "public")),
    ("availability closed enum edited (blocked-for-generation removed)", "generated_mode", lambda r: jedit(r, "assets/asset-roles.json", lambda d: d["availabilityValues"].pop("blocked-for-generation"))),
    ("reference-only role without a substitute", "generated_mode", lambda r: jedit(r, "assets/asset-roles.json", lambda d: d["roles"]["media.hero-demo-video"].pop("generationSafeSubstitutes"))),
    ("a new role with no pinned availability", "generated_mode", lambda r: jedit(r, "assets/asset-roles.json", lambda d: d["roles"].update({"icon.extra": dict(d["roles"]["icon.generic-glyph"], usedBy=[])}))),
    ("PIN: policy AND registry pinnedPolicies edited together (brand.wordmark)", "asset_roles", pinned_pair),
    ("a reference-only role added to a section's generatedAssetRoles", "generated_mode", lambda r: jedit(r, "sections/hero.video.json", lambda d: d["generatedAssetRoles"].append("media.hero-demo-video"))),
    ("a section's generatedAssetRoles emptied", "generated_mode", lambda r: jedit(r, "sections/hero.copy.json", lambda d: d.update(generatedAssetRoles=[]))),
    ("generation-safe role no section lists (dead role)", "generated_mode", lambda r: jedit(r, "sections/proof.reviews-carousel.json", lambda d: d.update(generatedAssetRoles=["content.placeholder-rating"]))),
    ("source material left in a section's generated content", "generated_mode", lambda r: jedit(r, "sections/hero.copy.json", lambda d: d["generatedReferenceContent"].update(headline="Avec clears your mail"))),
    ("schema `mode` no longer required", "generated_mode", lambda r: jedit(r, "schema/pagespec.schema.json", lambda d: d["required"].remove("mode"))),
    ("schema generated branch points at the reference node", "generated_mode", lambda r: jedit(r, "schema/pagespec.schema.json", lambda d: d["allOf"][1]["then"]["properties"]["nodes"]["items"].update({"$ref": "#/definitions/node"}))),
    ("schema generated content definition drifts from the section", "schema_contract_parity", lambda r: jedit(r, "schema/pagespec.schema.json", lambda d: d["definitions"]["content.generated.hero.copy"]["properties"].pop("rating"))),
    ("allowlist pageSpecModes drifts from the schema", "allowlist_parity", lambda r: jedit(r, "tokens/llm/component-allowlist.json", lambda d: d.update(pageSpecModes=["reference"]))),
    ("sourceBrand: brand regex deleted", "generated_mode", drop_regex("brand", r"\bavec(mail)?\b")),
    ("sourceBrand: TestFlight regex deleted", "generated_mode", drop_regex("storeMarks", r"test\s*flight")),
    ("sourceBrand: rating regex deleted", "generated_mode", drop_regex("ratings", r"\b5\.0\b")),
    ("sourceBrand: a real reviewer handle deleted", "generated_mode", drop_regex("reviews", r"soda_cowboy")),
    ("sourceBrand: a source persona deleted", "generated_mode", drop_regex("people", r"dana\s+chen")),
    ("sourceBrand: the headline claim deleted (both regexes that cover it)", "generated_mode", lambda r: jedit(r, "assets/asset-roles.json", lambda d: [d["sourceBrand"]["patterns"]["copy"]["regex"].remove(x) for x in (r"one\s+minute\s+a\s+day", r"handle\s+your\s+inbox")])),
    ("sourceBrand: media hash regex deleted", "generated_mode", lambda r: jedit(r, "assets/asset-roles.json", lambda d: d["sourceBrand"]["patterns"]["media"]["regex"].pop())),
    ("sourceBrand: a whole category removed (reviews)", "generated_mode", lambda r: jedit(r, "assets/asset-roles.json", lambda d: d["sourceBrand"]["patterns"].pop("reviews"))),
    ("sourceBrand: an invented pattern with no source example", "generated_mode", lambda r: jedit(r, "assets/asset-roles.json", lambda d: d["sourceBrand"]["patterns"]["brand"]["regex"].append(r"\bzorgblat\b"))),
    ("validator stops enforcing generated mode (_gen() always false)", "generated_mode", validator_text('return spec.get("mode") == "generated"', 'return False')),
    ("validator stops scanning URL-like strings", "generated_mode", validator_text('if URLISH.search(txt) and not PLACEHOLDER_URL.match(txt):', 'if False:')),
    ("validator drops the n-gram copy check", "generated_mode", validator_text('if not _gen(spec) or not ctx.ngram:', 'if True:')),
    ("validator drops a GENERATED_MODE rule", "graph_validator_parity", validator_text('    "GENERATED_MODE_PERSON": _scan("people", "real or demo person / sender identity"),\n', '')),
    ("generated example flipped to mode reference", "example_schema", gen_example_edit(lambda d: d.update(mode="reference"))),
    ("generated example carries an Avec leak", "example_semantic", gen_example_edit(lambda d: d["nodes"][4]["content"].update(headline="Avec clears your mail"))),
    ("generated example removed", "generated_mode", lambda r: os.remove(os.path.join(r, "schema", "examples", "generated.template.home.pagespec.json"))),
    ("reference example flipped to mode generated", "example_schema", lambda r: jedit(r, "schema/example.pagespec.json", lambda d: d.update(mode="generated"))),
    ("manifest pageSpecVersion drifts from the schema", "version_parity", lambda r: jedit(r, "registry.manifest.json", lambda d: d.update(pageSpecVersion="1.0.0"))),
    ("manifest repositoryVersion drifts from the CHANGELOG", "version_parity", lambda r: jedit(r, "registry.manifest.json", lambda d: d.update(repositoryVersion="1.2.0"))),
    ("manifest asset-availability count wrong", "manifest_counts", lambda r: jedit(r, "registry.manifest.json", lambda d: d["counts"].update(generationSafeAssetRoles=12))),
]
DRIFT += DRIFT_GEN
CITATION_DRIFT = [
    ("citation out of range", {"ev.demo": dict(GOOD_EV["ev.demo"], lines="2-40")}),
    ("citation in range but wrong content", {"ev.demo": dict(GOOD_EV["ev.demo"], lines="1", expect="const beta")}),
    ("citation file missing", {"ev.demo": dict(GOOD_EV["ev.demo"], path="src/gone.js")}),
    ("citation escapes source root", {"ev.demo": dict(GOOD_EV["ev.demo"], path="../outside.js")}),
]


def main():
    fails = 0
    print("== Part A: PageSpec mutations (must be rejected by the expected rule)")
    for tag, base_spec, muts in (("reference", EXAMPLE, MUTATIONS), ("generated", GEN, GEN_MUTATIONS)):
        for name, rule, fn in muts:
            spec = fn(copy.deepcopy(base_spec))
            errs, _ = sv.validate(spec, CTX)
            rules = {r for r, _ in errs}
            ok = bool(errs) and rule in rules
            fails += not ok
            print(f"  {'REJECTED' if ok else 'NOT-CAUGHT'}  [{tag}] {name}  [expect {rule}; got {sorted(rules) or 'no errors'}]")

    print("== Part B: controls (must pass with zero errors)")
    controls = [("unmutated example.pagespec.json (mode reference, real assets)", copy.deepcopy(EXAMPLE)),
                ("unmutated generated.template.home.pagespec.json (mode generated)", copy.deepcopy(GEN))] + synth_controls()
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

    total = len(MUTATIONS) + len(GEN_MUTATIONS) + len(controls) + len(DRIFT) + len(CITATION_DRIFT) + 1
    print(f"\n{total - fails}/{total} adversarial expectations met ({len(MUTATIONS)} reference + {len(GEN_MUTATIONS)} generated PageSpec mutations, {len(controls)} controls, {len(DRIFT) + len(CITATION_DRIFT)} repo-drift injections, 1 citation control)")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
