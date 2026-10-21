# Changelog

## 1.0.0 — 2026-10-21 — initial build (Situation A: no design-repo existed)

- Built from the following sources, all read-only:
  - `src/index.css`, the original compiled Tailwind v4 CSS
  - the `src/` React 18.3 + Vite 5 components, hooks and content
  - `CLONE_SPEC.md`, measured live with Playwright on 2026-10-21
  - 26 reference screenshots
  - `ia.json`
- Tokens: 111 foundation, 19 semantic aliases, 24 component and 6 layout tokens, and one theme
  (`light`). There is no dark mode in the source.
- 8 primitives, 7 components and 16 section contracts. The section ids are reused from `ia.json`.
- `template.home`:
  - 16 required, non-repeatable nodes in real DOM order
  - 13 scroll stops, each with its active sections and its deck float or expand state
- `template.legal`: `generationEligible: false`, zero nodes. `/terms` and `/privacy-policy` were never
  captured, so no sections were invented for it.
- Closed `assetRole` set of 11 roles with three generation/licensing policies:
  - pinned policies for the brand, third-party, sender-photo and product-video roles
  - sender-photo ↔ sender bindings
  - App Store reviews referenced by id only
- Compatibility graph: 15 rules (13 `error`, 2 `warn`), plus `NO_ADJACENT_SAME_CATEGORY`, which is
  documented as deliberately not enforced.
- `semantic_validate.py` cross-references the declared template's real node list (in order, with
  required/repeatable and (section, variant) keys). It also enforces route, rhythm, motion-contract,
  maxWords, asset-policy and stop-count rules.
- `adversarial_test.py`:
  - 39 PageSpec mutations, each of which must fail with its expected rule id
  - 2 controls: the example, and a control synthesized generically from `referenceContent` for each
    eligible template
  - 23 repo-drift injections in scratch copies, plus a citation control
- `verify_all.py`: 19 checks, including:
  - allowlist parity
  - citation range and content validity, with graceful degradation when no source is present
  - manifest and README counts recomputed from disk
  - graph ↔ validator parity
  - schema ↔ contract parity
  - pinned asset policies
- Corrections recorded against the pre-existing groundwork (see the README):
  - caption index
  - notification banner icon
  - footer order versus ia.json
  - footer.bar presumed on the legal routes
  - missing tooltip frames 08 to 13 (later found not to reproduce; all 13 exist)
  - unused Tailwind v3 config
