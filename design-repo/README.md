# Avec design-repo

An AI-ready, machine-validated design system extracted from the Avec (avec.ai) clone in the parent
folder. It tells a generator what may be used, how it may be combined, and how it must behave, for
a page composition (a PageSpec), without inventing colours, copy budgets, sections, or assets.

Status: `design-review-pending`. `productionApproved: false`. Keep this private. It holds real
company copy, real third-party App Store reviews, and references to proprietary video and a
commercial font.

## What makes this source unusual

Read this before you generate anything. None of it has been smoothed over.

1. **The site is one route that behaves like an app.** `/` is a scroll-jacked `main[data-scroll-root]`
   (`h-dvh`, CSS scroll-snap) with **13 scroll stops**: `hero`, `deck_intro`, `deck_swipe_done`,
   `deck_swipe_later`, `triage_game`, `compose_intro`, `compose_record`, `compose_drafted`,
   `low_importance`, `deck_empty`, `search`, `notifications`, `footer`. Two sticky sections drive most
   of the motion from scroll state rather than entrance animation:
   - the Deck section uses a 3-step float (`useScrollFloat(ref, 3)`);
   - the Expand section uses one integer state from 0 to 6 (`useScrollProgress(ref, 7)`).
   `templates/templates.json` records each stop's active sections and its deck float or expand state.
2. **The only generation-eligible template is `template.home`.** `/terms` and `/privacy-policy` are
   linked from the footer but were never captured. `template.legal` exists so that route coverage is
   1:1, but it has `generationEligible: false` and **zero nodes**. Nothing was invented for it. The
   schema's `template` enum excludes it, and the validator rejects it.
3. **Every home node is required, and the order is fixed.** That is the only real page shape. The
   generative surface is content: copy within word budgets, fictional demo emails, and the
   search/notification demo content. The structure is not open to generation.
   `NO_ADJACENT_SAME_CATEGORY` is deliberately **not** enforced, because same-category adjacency is the
   page's structure (`compatibility/graph.json` → `notEnforced`).
4. **This is a real, live company** (Avec / Nearly Extraterrestrial Technology, Inc.). A PageSpec
   declares a `mode`: `reference` (reproduces the source, rules below) or `generated` (a new page for
   another brand, see "Generated mode"). See `assets/asset-roles.json` for the rules on assets in
   reference mode:
   - Logos, the app icon, the Apple TestFlight/App Store marks and the Outlook/Android marks are
     `reuse-exact-only`. They must never be generated or redrawn.
   - The product videos, the wave footage, the dot-preview frames and the sender-photo avatars are
     `no-generation-proprietary`. Use only the listed files, or leave a placeholder. Never generate
     lookalikes or new person photos. A photo avatar is bound to its original sender.
   - Only `avatar.initials`, which is text on an accent token, is `generate-new-allowed`.
   - App Store reviews are referenced **by id only** (`review.01` to `review.06`, stored verbatim in
     `sections/proof.reviews-carousel.json`). New review text, altered text and new authors are all
     rejected.
   - The rating (`400+ reviews`, `5.0`), the copyright entity, the social and legal links, and the
     TestFlight URL are pinned schema constants.
5. **Generated mode forbids the source's identity.** Generation guidance: a `generated` PageSpec must not
   contain Avec's logo or brand name, App Store / TestFlight marks or links, any real URL, real reviews or
   reviewers, the source's rating, real or demo people, proprietary screenshots or video, or Avec's
   marketing copy. The validator rejects them; the section below says how and what it cannot catch.
6. **Commercial font.** GT Standard VF (`public/fonts/GT_Standard_VF-…woff2`) ships with the source
   site. A licence to reuse it outside avec.ai has **not** been established, so a consumer must license
   it or substitute another font. Inter is SIL OFL.
7. **No outbound runtime requests.** The notify-me POST and the Stack Challenge leaderboard are
   stubbed in the source (`src/lib/analytics.js`), and PostHog was removed. A generated page must not
   wire the form or the game to any invented endpoint.
8. **Token source.** `tailwind.config.js` (v3) exists but is unused, because `postcss.config.js` loads
   no plugins. The real tokens are the `:root` custom properties, the utilities and the `.type-*`
   classes in `src/index.css`, which is the original compiled Tailwind v4 CSS. It is minified onto
   single lines, so its citations use `contains` rather than line ranges.
9. **Only a light theme exists.** The source has no dark mode, so do not generate one.

## Section contracts: provenance, taxonomy, retrieval, page-wrapper gate

Every contract has a closed `semantic {id, category}` (what the AI sees; `id` = the contract id) and a closed `source {id, tag, file, lines, citation}` (the real element it came from; `verify_all` re-reads the range).
`retrievalEligible` is false for runtime/utility UI (`shell.notify-modal`, `shell.scroll-hint`; reason 30+ chars) and pinned in both `verify_all.py` and `semantic_validate.py`. `schema/section-contract.schema.json` closes the contract shape.
`extraction/wrapper_gate.py` measures against `sectionHeights` (1440x900, `extraction/measure_sections.mjs` to re-measure): a hero over 1800px warns, over 3000px fails; a node holding over 50% of the page warns, over 60% fails; the whitelist
(`extraction/wrapper-whitelist.json`) is empty. Today: the tallest in-flow node is `expand.compose-demo` at 3,600 of 11,700px (30.8%), the hero is 900px. Heights depend on the 900px viewport (the page is built from 100dvh runways).

## Generated mode (PageSpec `mode: "generated"`)

`mode` is required and closed: `reference` | `generated` (`pageSpecVersion` 1.1.0). `schema/example.pagespec.json` is `reference`;
`schema/examples/generated.template.home.pagespec.json` is `generated` (a made-up brand, "Foldwell"). `template.legal` is not
generation-eligible and has no nodes, so it has no example of either mode.

Every asset role in `assets/asset-roles.json` has an `availability`:

| availability | roles | in a generated page |
|---|---|---|
| reference-only (7) | `brand.wordmark`, `brand.glyph`, `brand.app-icon`, `media.hero-demo-video`, `media.ambient-video`, `media.phone-demo-video`, `media.section-preview-frame` | absent (Avec's own brand and media); `generationSafeSubstitutes` name the replacement |
| blocked-for-generation (3) | `thirdparty.store-badge` (TestFlight, App Store), `thirdparty.platform-icon` (Outlook, Android), `avatar.sender-photo` | absent, never imitated |
| generation-safe (11) | `avatar.initials`, `brand.logo-placeholder`, `brand.logo-user-supplied`, `icon.generic-glyph`, `avatar.fictional-person`, `content.fictional-review`, `content.placeholder-rating`, `media.generated-product-visual`, `media.user-supplied`, `link.placeholder-url`, `content.original-copy` | allowed, only where the section lists them in `generatedAssetRoles` |

In a generated page: the logo is a placeholder or user-supplied mark, CTAs carry a generic glyph and a placeholder URL (`#`, a relative path, `example.com|org|net`), the rating is the
pinned placeholder (`X.X`, `[N] reviews`, zero stars), reviews are invented and marked `fictional: true`, senders are fictional with initials or a neutral avatar, product visuals are
generated or user-supplied, and `meta.copyOrigin` attests the copy is original. The validator (`GENERATED_MODE_*` rules in `compatibility/graph.json`) scans every string of the PageSpec
against `assets/asset-roles.json` `sourceBrand.patterns` (brand, store marks, URLs, reviews, ratings, people, media files and hashes, marketing claims) and against every 5-word run of the
source's own section copy.

What this does not do: it matches strings, so a lookalike logo, an obfuscated name or a reworded claim is not detected, and originality of copy cannot be proven. `Jordan`, `Diego`, `Android` and any
mention of `App Store` are blocked even when innocent. A PageSpec carries roles, not files, so a renderer still decides what it draws for a role. The patterns were derived from the source by
this tool and have **not been reviewed by a human**; `verify_all.py` only proves each regex traces to a real source string, that the availability of every role is pinned in code, and that
the validator still rejects a leak of each kind.

## Corrections to pre-existing groundwork

Each of these was checked against the source and screenshots. Details are in
`extraction/measured-values.json` → `corrections`.

| id | Pre-existing claim | What the source shows |
|---|---|---|
| corr.caption-index | CLONE_SPEC: the "reply" caption shows at B=1 | The caption shows where `index === B`: reply at B0 (`compose_intro`), dictation at B1, learn at B2, triage at B3. Confirmed by the desktop-05 screenshot. |
| corr.banner-icon | CLONE_SPEC: the notification banner icon is pacific-airlines.png | The icon is the Avec app icon (`square-logo-195.png`). Confirmed by the desktop-11 screenshot. |
| corr.footer-order | ia.json lists proof.reviews-carousel before footer.launch | The DOM order is footer.launch (headline and buttons), then the carousel, then the bar. Resolved: ia.json now uses this DOM order. |
| corr.legal-footer | ia.json puts footer.bar in template.legal | This is unverified, so template.legal has zero nodes. |
| corr.missing-frames | Dot tooltip frames 01 to 13 exist | Did not reproduce: all 13 referenced frames exist in `public/assets/frames`. |
| corr.tailwind | The project uses Tailwind v3 | The project uses compiled Tailwind v4 CSS. The v3 config is dead. |

## Layout

```
registry.manifest.json      status, versions (which are machine-checked), recomputed counts, entryPoints (inside this folder only)
tokens/00-foundation/       color, typography, radius, spacing, breakpoint, elevation, blur, icon-size, motion
tokens/10-semantic/         semantic colour intents (aliases)
tokens/20-component/        component-scoped tokens (raw values only where the source uses arbitrary values, with a rawReason)
tokens/30-layout/           section-max-w, section-frame, scroll-root, anchors
tokens/themes/light.json    resolves every semantic alias to a hex value
tokens/llm/                 component-allowlist, token-catalog, token-policy (the curated view a generator uses)
assets/asset-roles.json     closed assetRole set (21), generation/licensing policy, availability per role (reference-only / generation-safe / blocked-for-generation), pinned policies, sender bindings, sourceBrand patterns
primitives/ components/     content-agnostic building blocks
sections/                   16 section contracts (ids reused from ../ia.json): purpose, contentSchema, fieldBudgets, motion, responsive, a11y, referenceContent, generatedAssetRoles, generatedContentSchema, generatedReferenceContent
templates/                  templates.json (node lists and 13 scroll stops), routes.json (3 routes, each assigned once)
compatibility/graph.json    25 enforced rules (error/warn; 10 are GENERATED_MODE_*), plus the rules deliberately not enforced
schema/                     pagespec.schema.json (Draft-07), section-contract.schema.json (closed), example.pagespec.json (reference), examples/generated.template.home.pagespec.json, semantic_validate.py, tests/adversarial_test.py
extraction/                 measured-values.json (evidence ledger, corrections, sectionHeights), verify_all.py, wrapper_gate.py, wrapper-whitelist.json, measure_sections.mjs
```

## Running the checks

You need Python 3 and `jsonschema`.

```bash
python3 schema/semantic_validate.py            # both examples (reference and generated) → 0 errors
python3 schema/tests/adversarial_test.py       # every mutation rejected by its expected rule, controls pass, drift caught
python3 extraction/verify_all.py               # 24 repo-level checks
```

The scripts find the repo root from their own location. Citations resolve against the parent
folder, which is the source project. If that folder is missing, for example in a standalone or
unzipped copy, `verify_all.py` prints a **WARN** and skips only the external citation checks, the
asset-file existence checks and the ia.json checks. Every internal check still runs.

### Machine-checked and documentation-only

`allowlistVersion`, `repositoryVersion` (= the newest CHANGELOG heading), `pageSpecVersion` (= the schema `const`) and `counts` are machine-checked by `version_parity` and
`manifest_counts`, and this README's counts table is checked as well. Bumping a version is still a hand edit.

## Counts (checked by `verify_all.py` → `manifest_counts`)

<!-- counts:start -->
| key | value |
|---|---|
| foundationTokens | 111 |
| semanticTokens | 19 |
| componentTokens | 24 |
| layoutTokens | 6 |
| primitives | 8 |
| components | 7 |
| sections | 16 |
| templates | 2 |
| generationEligibleTemplates | 1 |
| routes | 3 |
| scrollStops | 13 |
| assetRoles | 21 |
| referenceOnlyAssetRoles | 7 |
| blockedAssetRoles | 3 |
| generationSafeAssetRoles | 11 |
| generatedExamples | 1 |
| retrievalIneligibleSections | 2 |
| graphRules | 30 |
| evidenceEntries | 186 |
| corrections | 6 |
<!-- counts:end -->

## Packaging

The sibling `design-repo.zip` is built with the CLI `zip` tool, regenerated last after every change,
and contains no `__MACOSX` or `.DS_Store` entries. The source project is not a git repository today.
If it ever becomes one, add `design-repo.zip` to the project's `.gitignore` and never commit it next
to this folder.
