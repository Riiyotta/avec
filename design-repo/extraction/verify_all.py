#!/usr/bin/env python3
"""verify_all.py -- every repo-level consistency check for the Avec design-repo, in one run.

Checks (each prints PASS / FAIL / WARN):
  json_parse, schema_meta, example_schema, example_semantic, allowlist_parity, version_parity,
  manifest_counts, entry_points, no_absolute_paths, evidence_ids, citations (WARN-skips when the
  sibling source project is absent), asset_roles (incl. pinned-policy check), graph_validator_parity,
  schema_contract_parity, tokens, token_policy, templates_routes, ia_consistency (graceful),
  no_zip_inside, generated_mode (reference / generated PageSpec mode: per-role availability PINNED in this
  file, substitutes, per-section generatedAssetRoles, generated schemas, sourceBrand patterns traced to the
  source and probed against PINNED strings, one reference and one generated example per eligible template,
  and an end-to-end leak self-test of the validator).

Drift-proofing: schema/tests/adversarial_test.py copies this repo to a scratch dir, injects each
class of drift (phantom allowlist entry, out-of-range / wrong-content citation, wrong manifest count,
version drift, pinned asset-policy change, graph rule without validator, schema/contract motion drift,
policy key not in catalog, absolute path, ../ entry point) and asserts the matching check FAILS.

Usage: python3 extraction/verify_all.py [--repo DIR] [--source-root DIR]
The repo root is derived from this file's location; nothing is hardcoded.
"""
import argparse
import importlib.util
import json
import os
import re
import sys

from jsonschema import Draft7Validator

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ABS_PATTERNS = ["/" + "Users/", "/" + "home/", "C:" + "\\\\"]

# Pinned in CODE, independent of assets/asset-roles.json: editing the registry alone cannot loosen any of these.
PINNED_POLICIES = {"brand.wordmark": "reuse-exact-only", "brand.glyph": "reuse-exact-only", "brand.app-icon": "reuse-exact-only",
                   "thirdparty.store-badge": "reuse-exact-only", "thirdparty.platform-icon": "reuse-exact-only",
                   "avatar.sender-photo": "no-generation-proprietary", "media.hero-demo-video": "no-generation-proprietary",
                   "media.phone-demo-video": "no-generation-proprietary"}
AVAILABILITY = ["reference-only", "generation-safe", "blocked-for-generation"]
PINNED_AVAILABILITY = {
    "brand.wordmark": "reference-only", "brand.glyph": "reference-only", "brand.app-icon": "reference-only",
    "media.hero-demo-video": "reference-only", "media.ambient-video": "reference-only", "media.phone-demo-video": "reference-only",
    "media.section-preview-frame": "reference-only",
    "thirdparty.store-badge": "blocked-for-generation", "thirdparty.platform-icon": "blocked-for-generation", "avatar.sender-photo": "blocked-for-generation",
    "avatar.initials": "generation-safe", "brand.logo-placeholder": "generation-safe", "brand.logo-user-supplied": "generation-safe",
    "icon.generic-glyph": "generation-safe", "avatar.fictional-person": "generation-safe", "content.fictional-review": "generation-safe",
    "content.placeholder-rating": "generation-safe", "media.generated-product-visual": "generation-safe", "media.user-supplied": "generation-safe",
    "link.placeholder-url": "generation-safe", "content.original-copy": "generation-safe"}
PINNED_SOURCE_PROBES = {
    "brand": ["Avec", "avec.ai", "Nearly Extraterrestrial Technology, Inc."],
    "storeMarks": ["TestFlight", "Download on the App Store", "Outlook", "Android"],
    "urls": ["https://testflight.apple.com/join/3JR2HxjZ", "https://x.com/avec", "https://www.linkedin.com/company/avec-ai", "hi@avec.ai"],
    "reviews": ["soda_cowboy", "Rudraksh Awasthi", "Way better than Gmail!", "review.03"],
    "ratings": ["5.0", "400+ reviews"],
    "people": ["Coach Marcus", "Dana Chen", "Sarah Chen-Ramirez", "Pacific Gas & Electric", "Dropbox"],
    "media": ["/assets/hero-triage.mp4", "wave_desktop.webm", "square-logo-195.png", "5d520b4b4002bff5"],
    "copy": ["Handle your inbox in one minute a day", "Tinder for email", "Made for people who hate email"],
}
PINNED_RULE_FOR = {"brand": "GENERATED_MODE_SOURCE_BRAND", "storeMarks": "GENERATED_MODE_STORE_MARK", "urls": "GENERATED_MODE_SOURCE_URL",
                   "reviews": "GENERATED_MODE_REVIEW", "ratings": "GENERATED_MODE_RATING", "people": "GENERATED_MODE_PERSON",
                   "media": "GENERATED_MODE_MEDIA", "copy": "GENERATED_MODE_SOURCE_COPY"}


def jload(repo, rel):
    return json.load(open(os.path.join(repo, rel), encoding="utf-8"))


def all_files(repo):
    for d, dirs, files in os.walk(repo):
        dirs[:] = [x for x in dirs if x != "__pycache__"]
        for f in files:
            yield os.path.join(d, f)


def load_validator(repo):
    spec = importlib.util.spec_from_file_location("sv_" + str(abs(hash(repo))), os.path.join(repo, "schema", "semantic_validate.py"))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def leaf_tokens(obj):
    n = 0
    if isinstance(obj, dict):
        if "$value" in obj:
            return 1
        for k, v in obj.items():
            if not k.startswith("$"):
                n += leaf_tokens(v)
    return n


def example_files(repo, mode=None):
    """Relative paths of every example PageSpec (mode None = all, else only those declaring that mode)."""
    out = ["schema/example.pagespec.json"]
    d = os.path.join(repo, "schema", "examples")
    if os.path.isdir(d):
        out += sorted(f"schema/examples/{f}" for f in os.listdir(d) if f.endswith(".json"))
    if mode:
        out = [r for r in out if jload(repo, r).get("mode") == mode]
    return out


def compute_counts(repo):
    tk = lambda rel: leaf_tokens(jload(repo, rel))
    fdir = os.path.join(repo, "tokens", "00-foundation")
    foundation = sum(tk(os.path.join("tokens", "00-foundation", f)) for f in os.listdir(fdir) if f.endswith(".json"))
    tpls = jload(repo, "templates/templates.json")["templates"]
    graph = jload(repo, "compatibility/graph.json")
    mv = jload(repo, "extraction/measured-values.json")
    cnt = lambda d: len([f for f in os.listdir(os.path.join(repo, d)) if f.endswith(".json")])
    return {
        "foundationTokens": foundation,
        "semanticTokens": tk("tokens/10-semantic/color.json"),
        "componentTokens": tk("tokens/20-component/component.json"),
        "layoutTokens": tk("tokens/30-layout/layout.json"),
        "primitives": cnt("primitives"),
        "components": cnt("components"),
        "sections": cnt("sections"),
        "templates": len(tpls),
        "generationEligibleTemplates": sum(1 for t in tpls.values() if t["generationEligible"]),
        "routes": len(jload(repo, "templates/routes.json")["routes"]),
        "scrollStops": sum(len(t["scrollStops"]) for t in tpls.values()),
        "assetRoles": len(jload(repo, "assets/asset-roles.json")["roles"]),
        "referenceOnlyAssetRoles": sum(1 for r in jload(repo, "assets/asset-roles.json")["roles"].values() if r.get("availability") == "reference-only"),
        "blockedAssetRoles": sum(1 for r in jload(repo, "assets/asset-roles.json")["roles"].values() if r.get("availability") == "blocked-for-generation"),
        "generationSafeAssetRoles": sum(1 for r in jload(repo, "assets/asset-roles.json")["roles"].values() if r.get("availability") == "generation-safe"),
        "generatedExamples": len(example_files(repo, "generated")),
        "graphRules": len(graph["rules"]),
        "evidenceEntries": len(mv["evidence"]),
        "corrections": len(mv["corrections"]),
    }


def collect_evidence_refs(obj, out):
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k in ("evidenceIds", "measuredFrom") and isinstance(v, list):
                out.update(v)
            else:
                collect_evidence_refs(v, out)
    elif isinstance(obj, list):
        for v in obj:
            collect_evidence_refs(v, out)


# ------------------------------------------------------------------ checks
def c_json_parse(repo, src):
    bad = []
    for p in all_files(repo):
        if p.endswith(".json"):
            try:
                json.load(open(p, encoding="utf-8"))
            except Exception as e:
                bad.append(f"{os.path.relpath(p, repo)}: {e}")
    return bad, []


def c_schema_meta(repo, src):
    try:
        Draft7Validator.check_schema(jload(repo, "schema/pagespec.schema.json"))
        return [], []
    except Exception as e:
        return [str(e)[:300]], []


def c_example_schema(repo, src):
    v = Draft7Validator(jload(repo, "schema/pagespec.schema.json"))
    return [f"{rel} {list(e.path)}: {e.message[:150]}" for rel in example_files(repo) for e in v.iter_errors(jload(repo, rel))], []


def c_example_semantic(repo, src):
    sv = load_validator(repo)
    ctx = sv.Context(repo)
    errs, warns = [], []
    for rel in example_files(repo):
        e, w = sv.validate(jload(repo, rel), ctx)
        errs += [f"{rel} [{r}] {m}" for r, m in e]
        warns += [f"{rel} [{r}] {m}" for r, m in w]
    return errs, warns


def c_allowlist(repo, src):
    al = jload(repo, "tokens/llm/component-allowlist.json")
    errs = []
    listed = {}
    for eid, e in al["entries"].items():
        p = os.path.join(repo, e["file"])
        if not os.path.exists(p):
            errs.append(f"phantom allowlist entry {eid}: {e['file']} missing")
            continue
        fid = json.load(open(p, encoding="utf-8")).get("id")
        if fid != eid:
            errs.append(f"allowlist id {eid} != file id {fid}")
        listed[os.path.normpath(e["file"])] = eid
    for d in ("primitives", "components", "sections"):
        for f in os.listdir(os.path.join(repo, d)):
            if f.endswith(".json") and os.path.normpath(f"{d}/{f}") not in listed:
                errs.append(f"orphan contract {d}/{f} has no allowlist entry")
    schema = jload(repo, "schema/pagespec.schema.json")
    props = sorted(schema["definitions"]["node"]["properties"].keys())
    if sorted(al["settableNodeProperties"]) != props:
        errs.append(f"settableNodeProperties {al['settableNodeProperties']} != schema node properties {props}")
    roles = sorted(jload(repo, "assets/asset-roles.json")["roles"].keys())
    if sorted(al["assetRoles"]) != roles:
        errs.append("allowlist assetRoles != assets/asset-roles.json roles")
    if sorted(al.get("pageSpecModes", [])) != sorted(schema["properties"].get("mode", {}).get("enum", [])):
        errs.append("allowlist pageSpecModes != schema mode enum")
    secs = sorted(k for k, e in al["entries"].items() if e["layer"] == "section")
    if secs != sorted(schema["definitions"]["node"]["properties"]["section"]["enum"]):
        errs.append("allowlist section entries != schema section enum")
    return errs, []


def c_version(repo, src):
    m, al = jload(repo, "registry.manifest.json"), jload(repo, "tokens/llm/component-allowlist.json")
    errs = [] if m["allowlistVersion"] == al["version"] else [f"manifest allowlistVersion {m['allowlistVersion']} != allowlist version {al['version']}"]
    sc = jload(repo, "schema/pagespec.schema.json")["properties"]["pageSpecVersion"].get("const")
    if m["pageSpecVersion"] != sc:
        errs.append(f"manifest pageSpecVersion {m['pageSpecVersion']} != schema pageSpecVersion const {sc}")
    head = re.search(r"^## (\d+\.\d+\.\d+)", open(os.path.join(repo, "CHANGELOG.md"), encoding="utf-8").read(), re.M)
    if not head or head.group(1) != m["repositoryVersion"]:
        errs.append(f"manifest repositoryVersion {m['repositoryVersion']} != newest CHANGELOG heading {head.group(1) if head else None}")
    return errs, []


def c_counts(repo, src):
    m = jload(repo, "registry.manifest.json")["counts"]
    real = compute_counts(repo)
    errs = [f"counts.{k}: manifest {m.get(k)} != actual {v}" for k, v in real.items() if m.get(k) != v]
    errs += [f"counts.{k}: not a recomputed count" for k in m if k not in real]
    readme = open(os.path.join(repo, "README.md"), encoding="utf-8").read()
    block = re.search(r"<!-- counts:start -->(.*?)<!-- counts:end -->", readme, re.S)
    if not block:
        errs.append("README.md counts table markers missing")
    else:
        rows = dict(re.findall(r"^\| (\w+) \| (\d+) \|$", block.group(1), re.M))
        errs += [f"README counts.{k}: {rows.get(k)} != actual {v}" for k, v in real.items() if rows.get(k) != str(v)]
    return errs, []


def c_entry_points(repo, src):
    eps = jload(repo, "registry.manifest.json")["entryPoints"]
    errs = []
    for name, rel in eps.items():
        if os.path.isabs(rel) or ".." in rel.split("/"):
            errs.append(f"entryPoint {name} points outside the package: {rel}")
        elif not os.path.exists(os.path.join(repo, rel)):
            errs.append(f"entryPoint {name} missing: {rel}")
    return errs, []


def c_abs_paths(repo, src):
    errs = []
    for p in all_files(repo):
        if p.endswith((".json", ".md", ".py", ".txt", ".csv")) or os.path.basename(p).startswith("."):
            t = open(p, encoding="utf-8", errors="ignore").read()
            for pat in ABS_PATTERNS:
                if pat in t:
                    errs.append(f"{os.path.relpath(p, repo)} contains absolute path fragment {pat!r}")
    return errs, []


def c_evidence_ids(repo, src):
    ev = jload(repo, "extraction/measured-values.json")["evidence"]
    refs = set()
    for p in all_files(repo):
        if p.endswith(".json") and not p.endswith("measured-values.json"):
            collect_evidence_refs(json.load(open(p, encoding="utf-8")), refs)
    mv = jload(repo, "extraction/measured-values.json")
    collect_evidence_refs(mv["corrections"], refs)
    missing = sorted(r for r in refs if r not in ev)
    unused = sorted(set(ev) - refs)
    return [f"unresolved evidence id {r}" for r in missing], ([f"{len(unused)} evidence entries not referenced by any contract (kept as ledger)"] if unused else [])


def check_citations(evidence, src):
    errs = []
    for eid, e in evidence.items():
        p = os.path.join(src, e["path"])
        if os.path.isabs(e["path"]) or ".." in e["path"].split("/"):
            errs.append(f"{eid}: citation path must be source-root relative: {e['path']}")
            continue
        if not os.path.exists(p):
            errs.append(f"{eid}: {e['path']} does not exist")
            continue
        if e["kind"] == "file":
            continue
        text = open(p, encoding="utf-8", errors="ignore").read()
        if e["kind"] == "contains":
            if e["expect"] not in text:
                errs.append(f"{eid}: {e['path']} does not contain expected text")
            continue
        lines = text.split("\n")
        m = re.fullmatch(r"(\d+)(?:-(\d+))?", e["lines"])
        if not m:
            errs.append(f"{eid}: bad line spec {e['lines']}")
            continue
        a, b = int(m.group(1)), int(m.group(2) or m.group(1))
        if a < 1 or b < a or b > len(lines):
            errs.append(f"{eid}: range {e['lines']} exceeds {e['path']} ({len(lines)} lines)")
            continue
        if e["expect"] not in "\n".join(lines[a - 1:b]):
            errs.append(f"{eid}: {e['path']}:{e['lines']} in range but does not contain the cited content")
    return errs


def c_citations(repo, src):
    if not src or not os.path.isdir(src) or not (os.path.exists(os.path.join(src, "CLONE_SPEC.md")) or os.path.isdir(os.path.join(src, "src"))):
        return [], ["source project not present next to this design-repo; external citations skipped (standalone copy)"]
    return check_citations(jload(repo, "extraction/measured-values.json")["evidence"], src), []


def c_assets(repo, src):
    a = jload(repo, "assets/asset-roles.json")
    errs, warns = [], []
    for rid, r in a["roles"].items():
        if r["policy"] not in a["policies"]:
            errs.append(f"{rid}: policy {r['policy']} not a defined policy")
        if r["policy"] in ("generate-new-allowed", "user-supplied-only") and r["allowedRefs"]:
            errs.append(f"{rid}: {r['policy']} role must have no allowedRefs")
        if r["policy"] == "user-supplied-only" and not r.get("refScheme"):
            errs.append(f"{rid}: user-supplied-only role needs a refScheme")
        for ref in r.get("senderBindings", {}):
            if ref not in r["allowedRefs"]:
                errs.append(f"{rid}: senderBinding {ref} not in allowedRefs")
        if not r.get("licensing"):
            errs.append(f"{rid}: missing licensing guidance")
    for rid, pol in a["pinnedPolicies"].items():
        got = a["roles"].get(rid, {}).get("policy")
        if got != pol:
            errs.append(f"PINNED {rid}: policy {got!r} != pinned {pol!r}")
    for rid, pol in PINNED_POLICIES.items():  # pinned in code too: the registry's own pinnedPolicies block can be edited together with the role
        got = a["roles"].get(rid, {}).get("policy")
        if got != pol:
            errs.append(f"PINNED (code) {rid}: policy {got!r} != pinned {pol!r}")
        if a["pinnedPolicies"].get(rid) != pol:
            errs.append(f"PINNED (code) {rid}: registry pinnedPolicies entry {a['pinnedPolicies'].get(rid)!r} != {pol!r}")
    if src and os.path.isdir(os.path.join(src, "public")):
        for rid, r in a["roles"].items():
            for ref in r["allowedRefs"]:
                if ref.startswith("/assets/") and not os.path.exists(os.path.join(src, "public", ref.lstrip("/"))):
                    errs.append(f"{rid}: allowedRef {ref} missing from source public/")
    else:
        warns.append("source public/ absent; asset file existence skipped")
    # every role referenced by a section contract exists
    for f in os.listdir(os.path.join(repo, "sections")):
        s = jload(repo, f"sections/{f}")
        for role in s.get("assetRoles", []):
            if role not in a["roles"]:
                errs.append(f"{s['id']}: assetRole {role} not registered")
        for role in s.get("generatedAssetRoles", []):
            if role not in a["roles"]:
                errs.append(f"{s['id']}: generatedAssetRole {role} not registered")
    return errs, warns


def c_graph_parity(repo, src):
    sv = load_validator(repo)
    g = {r["id"] for r in jload(repo, "compatibility/graph.json")["rules"]}
    v = set(sv.RULES)
    errs = [f"graph rule {r} has no validator implementation" for r in sorted(g - v)]
    errs += [f"validator rule {r} not documented in graph.json" for r in sorted(v - g)]
    for r in jload(repo, "compatibility/graph.json")["rules"]:
        if r["severity"] not in ("error", "warn"):
            errs.append(f"{r['id']}: bad severity {r['severity']}")
    return errs, []


def c_schema_contract(repo, src):
    schema = jload(repo, "schema/pagespec.schema.json")
    errs = []
    branches = {b["if"]["properties"]["section"]["const"]: b["then"] for b in schema["definitions"]["node"]["allOf"]}
    for f in sorted(os.listdir(os.path.join(repo, "sections"))):
        s = jload(repo, f"sections/{f}")
        sid = s["id"]
        if schema["definitions"].get(f"content.{sid}") != s["contentSchema"]:
            errs.append(f"{sid}: schema content definition != section contentSchema")
        br = branches.get(sid)
        if not br:
            errs.append(f"{sid}: no schema allOf branch")
            continue
        mc = br["properties"]["motion"]["properties"]
        for k in ("pattern", "trigger", "reducedMotionFallback"):
            if mc[k]["const"] != s["motion"][k]:
                errs.append(f"{sid}: schema motion.{k} {mc[k]['const']!r} != contract {s['motion'][k]!r}")
        if br["properties"]["variant"]["enum"] != s["variants"]:
            errs.append(f"{sid}: schema variants != contract variants")
        if schema["definitions"].get(f"content.generated.{sid}") != s.get("generatedContentSchema"):
            errs.append(f"{sid}: schema generated content definition != section generatedContentSchema")
        gbr = {b["if"]["properties"]["section"]["const"]: b["then"] for b in schema["definitions"]["node.generated"]["allOf"]}.get(sid)
        if not gbr:
            errs.append(f"{sid}: no node.generated allOf branch")
        else:
            if gbr["properties"]["content"] != {"$ref": f"#/definitions/content.generated.{sid}"}:
                errs.append(f"{sid}: node.generated content does not reference content.generated.{sid}")
            if gbr["properties"]["motion"] != br["properties"]["motion"] or gbr["properties"]["variant"] != br["properties"]["variant"]:
                errs.append(f"{sid}: node.generated motion/variant differ from node")
    if schema["definitions"]["motion"].get("additionalProperties") is not False:
        errs.append("motion schema is not closed (additionalProperties must be false)")
    return errs, []


def c_tokens(repo, src):
    errs = []
    found = {}
    fdir = os.path.join(repo, "tokens", "00-foundation")
    for f in os.listdir(fdir):
        if f.endswith(".json"):
            for k, v in json.load(open(os.path.join(fdir, f), encoding="utf-8")).items():
                if not k.startswith("$"):
                    found[k] = v
    def resolve(ref):
        grp, key = ref.strip("{}").split(".", 1)
        node = found.get(grp, {}).get(key)
        return node["$value"] if node else None
    sem = jload(repo, "tokens/10-semantic/color.json")["semantic"]
    theme = jload(repo, "tokens/themes/light.json")["resolved"]
    flat = {}
    for g, items in sem.items():
        for k, v in items.items():
            flat[f"{g}.{k}"] = v["$value"]
    for k, ref in flat.items():
        val = resolve(ref)
        if val is None:
            errs.append(f"semantic {k} -> {ref} does not resolve")
        elif theme.get(k) != val:
            errs.append(f"theme light {k}={theme.get(k)} != resolved {val}")
    if set(theme) != set(flat):
        errs.append("theme keys != semantic keys")
    comp = jload(repo, "tokens/20-component/component.json")["component"]
    for g, items in comp.items():
        for k, v in items.items():
            val = v["$value"]
            if isinstance(val, str) and val.startswith("{"):
                if resolve(val) is None:
                    errs.append(f"component.{g}.{k} -> {val} does not resolve")
            elif v["$type"] == "color" and not v.get("rawReason"):
                errs.append(f"component.{g}.{k} raw colour without rawReason")
    cat = jload(repo, "tokens/llm/token-catalog.json")
    for grp, node in found.items():
        if grp in cat and sorted(node.keys()) != cat[grp]:
            errs.append(f"catalog.{grp} != tokens on disk")
        if grp not in cat and grp not in ("reducedMotion",):
            errs.append(f"catalog missing group {grp}")
    if sorted(flat) != cat["semantic"]:
        errs.append("catalog.semantic != semantic tokens")
    return errs, []


def c_token_policy(repo, src):
    cat = jload(repo, "tokens/llm/token-catalog.json")
    pol = jload(repo, "tokens/llm/token-policy.json")
    return [f"token-policy key {k!r} is not a real catalog key" for k in pol["rawValueRestrictions"] if k not in cat], []


def c_templates(repo, src):
    errs = []
    tpls = jload(repo, "templates/templates.json")["templates"]
    routes = jload(repo, "templates/routes.json")["routes"]
    secs = {jload(repo, f"sections/{f}")["id"] for f in os.listdir(os.path.join(repo, "sections"))}
    seen = {}
    for r in routes:
        seen[r["route"]] = seen.get(r["route"], 0) + 1
        if r["template"] not in tpls:
            errs.append(f"route {r['route']} -> unknown template {r['template']}")
        elif r["route"] not in tpls[r["template"]]["routes"]:
            errs.append(f"route {r['route']} not listed by {r['template']}")
    errs += [f"route {k} assigned {v}x" for k, v in seen.items() if v != 1]
    trs = [rt for t in tpls.values() for rt in t["routes"]]
    if sorted(trs) != sorted(seen):
        errs.append("templates' route lists != routes.json")
    for tid, t in tpls.items():
        tsecs = [n["section"] for n in t["nodes"]]
        for s in tsecs:
            if s not in secs:
                errs.append(f"{tid}: node {s} has no section contract")
        ids = [s["id"] for s in t["scrollStops"]]
        if len(ids) != len(set(ids)):
            errs.append(f"{tid}: duplicate scroll stop ids")
        for st in t["scrollStops"]:
            for a in st["activeSections"]:
                if a not in tsecs:
                    errs.append(f"{tid}: stop {st['id']} activeSection {a} not in template")
        if t["generationEligible"] and not t["nodes"]:
            errs.append(f"{tid}: eligible template with no nodes")
    eligible = sorted(k for k, t in tpls.items() if t["generationEligible"])
    if eligible != sorted(jload(repo, "schema/pagespec.schema.json")["properties"]["template"]["enum"]):
        errs.append("schema template enum != generation-eligible templates")
    return errs, []


def c_ia(repo, src):
    p = os.path.join(src or "", "ia.json")
    if not src or not os.path.exists(p):
        return [], ["sibling ia.json absent; IA consistency skipped"]
    ia = json.load(open(p, encoding="utf-8"))
    errs, warns = [], []
    secs = {jload(repo, f"sections/{f}")["id"] for f in os.listdir(os.path.join(repo, "sections"))}
    if set(ia["sections"]) != secs:
        errs.append(f"section ids differ from ia.json: {sorted(set(ia['sections']) ^ secs)}")
    tpls = jload(repo, "templates/templates.json")["templates"]
    for t in ia["templates"]:
        if t["id"] not in tpls or sorted(t["routes"]) != sorted(tpls[t["id"]]["routes"]):
            errs.append(f"ia template {t['id']} routes differ")
        elif t["id"] == "template.home" and set(t["sections"]) != {n["section"] for n in tpls[t["id"]]["nodes"]}:
            errs.append("template.home section set differs from ia.json")
        elif t["id"] == "template.home" and t["sections"] != [n["section"] for n in tpls[t["id"]]["nodes"]]:
            errs.append("template.home order differs from ia.json")
    return errs, warns


def _node_of(spec, sid):
    return next(n for n in spec["nodes"] if n["section"] == sid)


def _leaks():
    """(label, expected rule, mutator) -- one leak per blocked category; the validator must reject each in generated mode."""
    def setv(sid, path, val):
        def f(s):
            o = _node_of(s, sid)["content"]
            for k in path[:-1]:
                o = o[k]
            o[path[-1]] = val
        return f
    return [
        ("Avec name in headline", "GENERATED_MODE_SOURCE_BRAND", setv("hero.copy", ["headline"], "Avec helps you sort mail")),
        ("TestFlight in a CTA label", "GENERATED_MODE_STORE_MARK", setv("shell.header", ["primaryCta", "label"], "Get on TestFlight")),
        ("source social URL", "GENERATED_MODE_SOURCE_URL", setv("footer.bar", ["socialLinks", 0, "href", "url"], "https://x.com/avec")),
        ("real store URL", "GENERATED_MODE_SOURCE_URL", setv("hero.copy", ["cta", "href", "url"], "https://testflight.apple.com/join/3JR2HxjZ")),
        ("real reviewer", "GENERATED_MODE_REVIEW", setv("proof.reviews-carousel", ["reviews", 0, "author"], "soda_cowboy")),
        ("source rating", "GENERATED_MODE_RATING", setv("hero.copy", ["subheadline"], "Rated 5.0 by readers")),
        ("source persona", "GENERATED_MODE_PERSON", setv("deck.email-stack", ["cards", 0, "sender"], "Dana Chen")),
        ("source media path", "GENERATED_MODE_MEDIA", setv("expand.notifications-demo", ["emailBody"], "See /assets/hero-triage.mp4 for details")),
        ("non-placeholder URL", "GENERATED_MODE_SOURCE_URL", setv("footer.launch", ["primaryCta", "href", "url"], "https://acme-mail.io/download")),
        ("5-word run copied from the source's copy", "GENERATED_MODE_SOURCE_COPY", setv("expand.compose-demo", ["captions", "learn"], "Review it, tweak it, and send it.")),
        ("source marketing claim", "GENERATED_MODE_SOURCE_COPY", setv("hero.copy", ["headline"], "Handle your inbox in one minute a day")),
        ("reference-only role", "GENERATED_MODE_REFERENCE_ASSET", setv("shell.header", ["logo", "assetRole"], "brand.wordmark")),
        ("role outside the section's generatedAssetRoles", "GENERATED_MODE_ROLE", setv("shell.progress-dots", ["previewFrames", "assetRole"], "icon.generic-glyph")),
    ]


def c_generated_mode(repo, src):
    import copy
    errs, warns = [], []
    a = jload(repo, "assets/asset-roles.json")
    roles = a["roles"]
    schema = jload(repo, "schema/pagespec.schema.json")
    # --- schema: required closed `mode`, one branch per mode
    if schema["properties"].get("mode", {}).get("enum") != ["reference", "generated"]:
        errs.append("schema mode enum must be exactly ['reference', 'generated']")
    if "mode" not in schema.get("required", []):
        errs.append("schema must require 'mode'")
    branches = {}
    for b in schema.get("allOf", []):
        c = b.get("if", {}).get("properties", {}).get("mode", {}).get("const")
        branches[c] = b.get("then", {}).get("properties", {}).get("nodes", {}).get("items", {}).get("$ref")
    if branches != {"reference": "#/definitions/node", "generated": "#/definitions/node.generated"}:
        errs.append(f"schema mode branches must map reference -> node and generated -> node.generated, found {branches}")
    if sorted(al_modes := jload(repo, "tokens/llm/component-allowlist.json").get("pageSpecModes", [])) != ["generated", "reference"]:
        errs.append(f"allowlist pageSpecModes must be ['generated', 'reference'], found {al_modes}")
    # --- availability: closed enum, pinned in code, substitutes
    if sorted(a.get("availabilityValues", {})) != sorted(AVAILABILITY):
        errs.append(f"asset-roles availabilityValues keys must be {AVAILABILITY}")
    if sorted(a.get("modes", {})) != ["generated", "reference"]:
        errs.append("asset-roles modes must describe exactly reference and generated")
    for rid, r in roles.items():
        if r.get("availability") not in AVAILABILITY:
            errs.append(f"role {rid}: availability {r.get('availability')!r} is not one of {AVAILABILITY}")
        if not r.get("generatedModeGuidance"):
            errs.append(f"role {rid}: missing generatedModeGuidance")
    for rid, want in PINNED_AVAILABILITY.items():
        if rid not in roles:
            errs.append(f"pinned availability: role {rid} missing from the registry")
        elif roles[rid].get("availability") != want:
            errs.append(f"pinned availability: role {rid} must be {want!r}, found {roles[rid].get('availability')!r}")
    for rid in roles:
        if rid not in PINNED_AVAILABILITY:
            errs.append(f"role {rid} has no pinned availability in verify_all.py (add it to PINNED_AVAILABILITY)")
    for rid, r in roles.items():
        av, subs = r.get("availability"), r.get("generationSafeSubstitutes", [])
        if av in ("reference-only", "blocked-for-generation"):
            if not subs:
                errs.append(f"role {rid} is {av} but names no generation-safe substitute")
            for s_ in subs:
                if s_ not in roles or roles[s_].get("availability") != "generation-safe":
                    errs.append(f"role {rid}: substitute {s_} is not a generation-safe role")
        elif subs:
            errs.append(f"role {rid} is generation-safe but lists substitutes")
    # --- sections: generated role sets, usedBy recomputed
    secs = {}
    for f in sorted(os.listdir(os.path.join(repo, "sections"))):
        s = jload(repo, f"sections/{f}")
        secs[s["id"]] = s
    users = {}
    for sid, s in secs.items():
        gen = s.get("generatedAssetRoles")
        if not gen:
            errs.append(f"sections/{sid}.json: generatedAssetRoles missing or empty (a generated page could not fill it)")
            continue
        for r in gen:
            users.setdefault(r, set()).add(sid)
            if r not in roles or roles[r].get("availability") != "generation-safe":
                errs.append(f"sections/{sid}.json generatedAssetRoles lists {r}, which is not a generation-safe role")
        for k in ("generatedContentSchema", "generatedReferenceContent"):
            if k not in s:
                errs.append(f"sections/{sid}.json: missing {k}")
        if "generatedContentSchema" in s and "generatedReferenceContent" in s:
            for e in Draft7Validator(s["generatedContentSchema"]).iter_errors(s["generatedReferenceContent"]):
                errs.append(f"sections/{sid}.json generatedReferenceContent {list(e.path)}: {e.message[:120]}")
    for rid, r in roles.items():
        if r.get("availability") == "generation-safe" and r.get("observed", 1) == 0 and rid not in users:
            errs.append(f"generation-safe role {rid} is not listed by any section's generatedAssetRoles (a dead role)")
        if r.get("availability") == "generation-safe" and "usedBy" in r and r.get("observed", 1) == 0 and set(r["usedBy"]) != users.get(rid, set()):
            errs.append(f"role {rid}: usedBy {sorted(r['usedBy'])} != sections listing it {sorted(users.get(rid, []))}")
    # --- generated schemas / content carry no source material
    sv = load_validator(repo)
    ctx = sv.Context(repo)
    for sid, s in secs.items():
        blob = json.dumps([s.get("generatedContentSchema"), s.get("generatedReferenceContent")], ensure_ascii=False)
        for cat in ("brand", "storeMarks", "urls", "reviews", "ratings", "people", "media"):
            m_ = ctx.brand.get(cat) and ctx.brand[cat].search(blob)
            if m_:
                errs.append(f"sections/{sid}.json generated schema/content carries source material ({cat}: {m_.group(0)!r})")
    # --- sourceBrand: complete, compiled, traced to examples, probed against pinned strings
    sb = a.get("sourceBrand", {})
    pats = sb.get("patterns", {})
    if sorted(pats) != sorted(PINNED_SOURCE_PROBES):
        errs.append(f"sourceBrand.patterns categories {sorted(pats)} != {sorted(PINNED_SOURCE_PROBES)}")
    for cat, c in pats.items():
        if c.get("rule") != PINNED_RULE_FOR.get(cat):
            errs.append(f"sourceBrand.patterns.{cat}.rule {c.get('rule')!r} != {PINNED_RULE_FOR.get(cat)!r}")
        try:
            comp = [re.compile(x, re.I) for x in c.get("regex", [])]
        except re.error as e:
            errs.append(f"sourceBrand.patterns.{cat}: regex does not compile: {e}")
            continue
        if not comp:
            errs.append(f"sourceBrand.patterns.{cat}: no regex")
            continue
        ex = c.get("examples", [])
        hashes = [h["sha256"][:16] for h in c.get("sha256", [])]
        for x in ex:
            if not any(r_.search(x["text"]) for r_ in comp):
                errs.append(f"sourceBrand.patterns.{cat}: example {x['text']!r} is matched by no regex")
        for r_, raw in zip(comp, c["regex"]):
            if not any(r_.search(x["text"]) for x in ex) and not any(h in raw for h in hashes):
                errs.append(f"sourceBrand.patterns.{cat}: regex {raw!r} has no example from the source (an invented pattern)")
        for h in hashes:
            if not any(h in raw for raw in c["regex"]):
                errs.append(f"sourceBrand.patterns.{cat}: sha256 {h} is not in a regex")
        rx = ctx.brand.get(cat)  # the validator's own compiled regex, not this file's
        for probe in PINNED_SOURCE_PROBES.get(cat, []):
            if rx is None or not rx.search(probe):
                errs.append(f"pinned probe: sourceBrand.patterns.{cat} no longer matches {probe!r}")
        if src and os.path.isdir(src) and (os.path.isdir(os.path.join(src, "src")) or os.path.exists(os.path.join(src, "CLONE_SPEC.md"))):
            for x in ex:
                fp = os.path.join(src, x["path"])
                if not os.path.exists(fp):
                    errs.append(f"sourceBrand.patterns.{cat}: example file {x['path']} not found in the source")
                elif x["text"].lower() not in open(fp, encoding="utf-8", errors="ignore").read().lower():
                    errs.append(f"sourceBrand.patterns.{cat}: example {x['text']!r} not found in {x['path']}")
            for h in c.get("sha256", []):
                fp = os.path.join(src, h["path"])
                if os.path.exists(fp):
                    import hashlib
                    if hashlib.sha256(open(fp, "rb").read()).hexdigest() != h["sha256"]:
                        errs.append(f"sourceBrand.patterns.{cat}: {h['path']} hash differs from the pinned sha256 (the source file changed)")
    if not (src and os.path.isdir(os.path.join(src or "", "src"))):
        warns.append("source project absent: sourceBrand examples and media hashes were not re-checked against it")
    for nm in sb.get("names", []):
        if not (ctx.brand.get("brand") and ctx.brand["brand"].search(nm)) and not (ctx.brand.get("urls") and ctx.brand["urls"].search(nm)):
            errs.append(f"sourceBrand name {nm!r} is matched by no brand/url pattern")
    # --- examples: one reference and one generated per generation-eligible template
    tpls = jload(repo, "templates/templates.json")["templates"]
    for tid, tp in tpls.items():
        if not tp["generationEligible"]:
            continue
        for mode in ("reference", "generated"):
            if not any(jload(repo, r).get("template") == tid for r in example_files(repo, mode)):
                errs.append(f"template {tid} has no example PageSpec with mode {mode!r}")
    for rel in example_files(repo):
        sp = jload(repo, rel)
        if sp.get("mode") not in ("reference", "generated"):
            errs.append(f"{rel}: mode missing or invalid")
    if jload(repo, "schema/example.pagespec.json").get("mode") != "reference":
        errs.append("schema/example.pagespec.json must have mode 'reference'")
    # --- end-to-end: the validator still rejects each leak in generated mode and accepts the clean example
    gens = example_files(repo, "generated")
    if gens:
        base = jload(repo, gens[0])
        e0, _ = sv.validate(copy.deepcopy(base), ctx)
        if e0:
            errs.append(f"leak self-test: the clean generated example already fails ({e0[0][0]})")
        for label, rule, fn in _leaks():
            sp = copy.deepcopy(base)
            try:
                fn(sp)
            except Exception as ex_:
                errs.append(f"leak self-test '{label}': mutator failed on the generated example ({ex_!r})")
                continue
            got = {r for r, _ in sv.validate(sp, ctx)[0]}
            if rule not in got:
                errs.append(f"leak self-test '{label}': validator did not raise {rule} (got {sorted(got) or 'nothing'}): generated mode is not enforced")
        ref = copy.deepcopy(jload(repo, "schema/example.pagespec.json"))
        ref["mode"] = "generated"
        if not any(r in ("SCHEMA", "GENERATED_MODE_REFERENCE_ASSET") for r, _ in sv.validate(ref, ctx)[0]):
            errs.append("leak self-test: the reference example flipped to mode generated was accepted")
    return errs, warns


def c_no_zip(repo, src):
    return [f"zip inside package: {os.path.relpath(p, repo)}" for p in all_files(repo) if p.endswith(".zip")], []


CHECKS = [
    ("json_parse", c_json_parse), ("schema_meta", c_schema_meta), ("example_schema", c_example_schema),
    ("example_semantic", c_example_semantic), ("allowlist_parity", c_allowlist), ("version_parity", c_version),
    ("manifest_counts", c_counts), ("entry_points", c_entry_points), ("no_absolute_paths", c_abs_paths),
    ("evidence_ids", c_evidence_ids), ("citations", c_citations), ("asset_roles", c_assets),
    ("graph_validator_parity", c_graph_parity), ("schema_contract_parity", c_schema_contract), ("tokens", c_tokens),
    ("token_policy", c_token_policy), ("templates_routes", c_templates), ("ia_consistency", c_ia), ("no_zip_inside", c_no_zip),
    ("generated_mode", c_generated_mode),
]


def run_checks(repo, src, quiet=False):
    results = {}
    for name, fn in CHECKS:
        try:
            errs, warns = fn(repo, src)
        except Exception as e:
            errs, warns = [f"check crashed: {e!r}"], []
        results[name] = (errs, warns)
        if not quiet:
            print(f"{'FAIL' if errs else 'PASS'} {name}")
            for e in errs:
                print(f"     - {e}")
            for w in warns:
                print(f"     ~ WARN {w}")
    return results


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--repo", default=HERE)
    ap.add_argument("--source-root", default=None, help="defaults to the design-repo's parent directory (graceful if absent)")
    a = ap.parse_args()
    repo = os.path.abspath(a.repo)
    src = os.path.abspath(a.source_root) if a.source_root else os.path.dirname(repo)
    res = run_checks(repo, src)
    failed = [k for k, (e, _) in res.items() if e]
    print(f"\n{len(res) - len(failed)}/{len(res)} checks passed" + (f"; FAILED: {failed}" if failed else ""))
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
