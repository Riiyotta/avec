# Changelog

Versioning: `registry.manifest.json` `repositoryVersion` must equal the newest `## x.y.z` heading below (machine-checked by `version_parity`, as is `pageSpecVersion` = the schema const).
Minor = any contract, schema, asset-policy or validator change that existing consumers can adopt; patch = wording or evidence only.

## 1.1.0 — 2026-10-24 — reference / generated PageSpec modes (Situation B: external review punch list)

Before this release a generator had no way to say "not Avec". The `reference` shapes pinned the real TestFlight link, the `400+ reviews` / `5.0` rating, the six verbatim App Store
reviews (by id), the real social links and copyright entity, and the only allowed logos, store badges, videos and sender photos were Avec's own. Every point of the review reproduced
against the 1.0.0 files; the one difference is that this repo has no `extraction/prove_drift.py`, its drift injections live in `schema/tests/adversarial_test.py` Part C.

- **`mode` (required, closed enum `reference` | `generated`)** on every PageSpec; `pageSpecVersion` 1.1.0 (schema const). The schema branches on it: `reference` validates nodes against the
  unchanged source-shaped content definitions, `generated` against new `content.generated.<section>` definitions (also stored as each section's `generatedContentSchema`). A PageSpec without
  `mode` is invalid, so older PageSpecs need `"mode": "reference"` and `pageSpecVersion` 1.1.0.
- **`assets/asset-roles.json`**: every role has `availability` (`reference-only` | `generation-safe` | `blocked-for-generation`), `generatedModeGuidance` and, where not generation-safe,
  `generationSafeSubstitutes`.
  - reference-only (7): `brand.wordmark`, `brand.glyph`, `brand.app-icon`, `media.hero-demo-video`, `media.ambient-video`, `media.phone-demo-video`, `media.section-preview-frame`.
  - blocked-for-generation (3): `thirdparty.store-badge` (Apple TestFlight / App Store), `thirdparty.platform-icon` (Outlook / Android), `avatar.sender-photo`.
  - generation-safe (11): `avatar.initials` plus ten new roles: `brand.logo-placeholder`, `brand.logo-user-supplied`, `icon.generic-glyph`, `avatar.fictional-person`, `content.fictional-review`,
    `content.placeholder-rating`, `media.generated-product-visual`, `media.user-supplied`, `link.placeholder-url`, `content.original-copy`. New policy `user-supplied-only` (assetRef must be `user-supplied:<name>`).
  - `sourceBrand.patterns` (8 categories: brand, storeMarks, urls, reviews, ratings, people, media, copy): regexes derived from `src/` and `CLONE_SPEC.md`, each with source `examples`
    (file and text) and, for media, the sha256 of 17 files in `public/assets`. **No human has reviewed these patterns.**
- **Sections**: `generatedAssetRoles` (every entry generation-safe, every new role used by at least one section), `generatedContentSchema`, `generatedReferenceContent` (invented content for a made-up
  brand, Foldwell, validated against the schema).
- **Validator** (`schema/semantic_validate.py`): ten new graph rules, all `error`: `GENERATED_MODE_REFERENCE_ASSET`, `_ROLE`, `_SOURCE_BRAND`, `_STORE_MARK`, `_SOURCE_URL` (also: every URL-like string must be a
  placeholder), `_REVIEW`, `_RATING`, `_PERSON`, `_MEDIA`, `_SOURCE_COPY` (patterns plus any 5-word run copied from the source's own section copy). They scan every string of the PageSpec. In generated
  mode `meta.copyOrigin` (the `content.original-copy` attestation) is required; the reference-only roles must be absent.
- **Example**: `schema/examples/generated.template.home.pagespec.json` (mode `generated`); `schema/example.pagespec.json` is now mode `reference`. `template.legal` is `generationEligible: false` with zero nodes,
  so it has no example of either mode.
- **`verify_all.py`**: 20 checks (new `generated_mode`). Availability of all 21 roles and the 8 existing policies are **pinned in the script**, independent of the registry; pinned source probes
  (e.g. `Avec`, the TestFlight URL, `soda_cowboy`, `400+ reviews`, `Dana Chen`, a media hash) must still match the validator's compiled regexes; each regex must trace to a source example; and an end-to-end
  self-test mutates the generated example 13 ways and requires the matching rule to fire. `version_parity` now also checks `repositoryVersion` and `pageSpecVersion`.
- **Tests** (`schema/tests/adversarial_test.py`, 163 expectations): 46 reference-mode mutations (7 new: missing, wrong-case and invented `mode`, old `pageSpecVersion`, reference page flipped to
  generated, generation-safe-only role in a reference page, `copyOrigin` in a reference page) and 52 generated-mode mutations (brand and logo, App Store / TestFlight, real review and rating, person identity, source
  URL, proprietary media, source copy, role outside the section's set, missing `copyOrigin`, `mode` errors); 4 controls (the reference example with real assets, the generated example, and one synthesized reference and one
  synthesized generated PageSpec for `template.home`); 60 repo-drift injections (37 new, covering the pins: availability loosened or changed to a different valid value, registry edited together with its own pinned
  block, sourceBrand regex or category deleted, invented pattern, validator stops enforcing generated mode, schema `mode` branch drift, example flipped or removed, version and count drift) plus 1 citation control.
- **Known limits (not fixed here):** the validator matches strings, so a lookalike logo, an obfuscated name or a reworded claim is not detected, and copy originality cannot be proven; `Jordan`, `Diego`,
  `Android` and any mention of `App Store` are blocked even when innocent; a PageSpec carries roles, not files, so a renderer still decides what it draws for a role; the Avec name and real reviews remain in
  the section contracts and `extraction/measured-values.json` as reference/evidence data, not as generation input.

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
