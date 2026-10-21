#!/usr/bin/env python3
"""verify_all.py -- every repo-level consistency check for the Avec design-repo, in one run.

Checks (each prints PASS / FAIL / WARN):
  json_parse, schema_meta, example_schema, example_semantic, allowlist_parity, version_parity,
  manifest_counts, entry_points, no_absolute_paths, evidence_ids, citations (WARN-skips when the
  sibling source project is absent), asset_roles (incl. pinned-policy check), graph_validator_parity,
  schema_contract_parity, tokens, token_policy, templates_routes, ia_consistency (graceful),
  no_zip_inside.

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
    return [f"{list(e.path)}: {e.message[:150]}" for e in v.iter_errors(jload(repo, "schema/example.pagespec.json"))], []


def c_example_semantic(repo, src):
    sv = load_validator(repo)
    errs, warns = sv.validate(jload(repo, "schema/example.pagespec.json"), sv.Context(repo))
    return [f"[{r}] {m}" for r, m in errs], [f"[{r}] {m}" for r, m in warns]


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
    secs = sorted(k for k, e in al["entries"].items() if e["layer"] == "section")
    if secs != sorted(schema["definitions"]["node"]["properties"]["section"]["enum"]):
        errs.append("allowlist section entries != schema section enum")
    return errs, []


def c_version(repo, src):
    m, al = jload(repo, "registry.manifest.json"), jload(repo, "tokens/llm/component-allowlist.json")
    return ([] if m["allowlistVersion"] == al["version"] else [f"manifest allowlistVersion {m['allowlistVersion']} != allowlist version {al['version']}"]), []


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
        if r["policy"] == "generate-new-allowed" and r["allowedRefs"]:
            errs.append(f"{rid}: token-only role must have no allowedRefs")
        for ref in r.get("senderBindings", {}):
            if ref not in r["allowedRefs"]:
                errs.append(f"{rid}: senderBinding {ref} not in allowedRefs")
        if not r.get("licensing"):
            errs.append(f"{rid}: missing licensing guidance")
    for rid, pol in a["pinnedPolicies"].items():
        got = a["roles"].get(rid, {}).get("policy")
        if got != pol:
            errs.append(f"PINNED {rid}: policy {got!r} != pinned {pol!r}")
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


def c_no_zip(repo, src):
    return [f"zip inside package: {os.path.relpath(p, repo)}" for p in all_files(repo) if p.endswith(".zip")], []


CHECKS = [
    ("json_parse", c_json_parse), ("schema_meta", c_schema_meta), ("example_schema", c_example_schema),
    ("example_semantic", c_example_semantic), ("allowlist_parity", c_allowlist), ("version_parity", c_version),
    ("manifest_counts", c_counts), ("entry_points", c_entry_points), ("no_absolute_paths", c_abs_paths),
    ("evidence_ids", c_evidence_ids), ("citations", c_citations), ("asset_roles", c_assets),
    ("graph_validator_parity", c_graph_parity), ("schema_contract_parity", c_schema_contract), ("tokens", c_tokens),
    ("token_policy", c_token_policy), ("templates_routes", c_templates), ("ia_consistency", c_ia), ("no_zip_inside", c_no_zip),
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
