# https://www.avec.ai/ (measured via CLONE_SPEC.md, 2026-10-21; /terms and /privacy-policy are linked but were not captured)

Source: https://www.avec.ai/ (measured via CLONE_SPEC.md, 2026-10-21; /terms and /privacy-policy are linked but were not captured)
Status: **draft: home measured live, legal routes unverified**
3 routes · 2 templates · 16 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 2 templates (Legal pages (not captured), Home (scroll-snapped story)) account for 3 of 3 routes (100%). The remaining 0 routes span 0 templates.

| template | routes | share |
|---|---:|---:|
| Legal pages (not captured) | 2 | 67% |
| Home (scroll-snapped story) | 1 | 33% |

## Page chrome

**1 routes carry chrome = `full`** — Home (scroll-snapped story).

**2 routes carry chrome = `unknown`** — Legal pages (not captured).

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `footer.bar` | FOOTER | 2 | 3 | `Footer.jsx` | Home route, stop 'footer'. Presumed on the legal routes; not verified. |
| `shell.header` | SHELL | 1 | 1 | `Header.jsx` | Fixed over every scroll stop on the home route. |
| `shell.progress-dots` | SHELL | 1 | 1 | `ProgressDots.jsx` | Home route, md and wider only. |
| `shell.scroll-hint` | SHELL | 1 | 1 | `ScrollHint.jsx` | Home route, md and wider only. |
| `shell.notify-modal` | SHELL | 1 | 1 | `NotifyModal.jsx` | Opened from the 'Get notified' buttons in the header and footer on the home route. |
| `hero.copy` | HERO | 1 | 1 | `Hero.jsx` | Home route, stop 'hero'. |
| `hero.video` | HERO | 1 | 1 | `HeroVideo.jsx` | Home route, stop 'hero'. |
| `deck.word-reveal-copy` | DECK | 1 | 1 | `WordReveal.jsx` | Home route, stops 'deck_intro' to 'triage_game'. |
| `deck.email-stack` | DECK | 1 | 1 | `EmailStack.jsx` | Home route, stops 'deck_intro', 'deck_swipe_done', 'deck_swipe_later'. |
| `deck.triage-game` | DECK | 1 | 1 | `TriageGame.jsx` | Home route, stop 'triage_game'. |
| `expand.compose-demo` | EXPAND | 1 | 1 | `Expand.jsx` | Home route, stops 'compose_intro', 'compose_record', 'compose_drafted', 'low_importance'. |
| `expand.be-here-now` | EXPAND | 1 | 1 | `Expand.jsx` | Home route, stops 'deck_empty' to 'notifications'. |
| `expand.search-demo` | EXPAND | 1 | 1 | `Expand.jsx` | Home route, stop 'search'. |
| `expand.notifications-demo` | EXPAND | 1 | 1 | `Expand.jsx` | Home route, stop 'notifications'. |
| `proof.reviews-carousel` | PROOF | 1 | 1 | `ReviewsCarousel.jsx` | Home route, stop 'footer'. |
| `footer.launch` | FOOTER | 1 | 1 | `Footer.jsx` | Home route, stop 'footer'. |

**1 shared section** appears in more than one template and belongs in a component library.

**15 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Home (scroll-snapped story) — `template.home`

1 route · `/` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | page-local |
| 2 | SHELL | `shell.progress-dots` | page-local |
| 3 | SHELL | `shell.scroll-hint` | page-local |
| 4 | SHELL | `shell.notify-modal` | page-local |
| 5 | HERO | `hero.copy` | page-local |
| 6 | HERO | `hero.video` | page-local |
| 7 | DECK | `deck.word-reveal-copy` | page-local |
| 8 | DECK | `deck.email-stack` | page-local |
| 9 | DECK | `deck.triage-game` | page-local |
| 10 | EXPAND | `expand.compose-demo` | page-local |
| 11 | EXPAND | `expand.be-here-now` | page-local |
| 12 | EXPAND | `expand.search-demo` | page-local |
| 13 | EXPAND | `expand.notifications-demo` | page-local |
| 14 | FOOTER | `footer.launch` | page-local |
| 15 | PROOF | `proof.reviews-carousel` | page-local |
| 16 | FOOTER | `footer.bar` | shared ×2 |

### Legal pages (not captured) — `template.legal`

2 routes · `/terms`, `/privacy-policy` · chrome: **unknown**

| # | category | section | |
|---:|---|---|---|
| 1 | FOOTER | `footer.bar` | shared ×2 |

## Section reference

### SHELL

_Fixed UI layered over the scroll container on every stop: header, progress dots, scroll hint, modal._

**`shell.header`** — Fixed white header bar with the Avec logo, a TestFlight 'Get early access' link and a 'Get notified' button that opens the modal.

· Fixed over every scroll stop on the home route. · appears on 1 routes · implemented by `Header.jsx`

**`shell.progress-dots`** — Right-edge column of 13 invert-blend dots, one per scroll stop, with hover frame-preview tooltips and click-to-jump.

· Home route, md and wider only. · appears on 1 routes · implemented by `ProgressDots.jsx`

**`shell.scroll-hint`** — Floating 'Scroll or use arrow keys to page through this site' pill that appears after 5 seconds without scrolling on selected stops.

· Home route, md and wider only. · appears on 1 routes · implemented by `ScrollHint.jsx`

**`shell.notify-modal`** — Portal modal with email capture for 'Get notified' on other platforms (iOS-only app today); blurred scale-in animation.

· Opened from the 'Get notified' buttons in the header and footer on the home route. · appears on 1 routes · implemented by `NotifyModal.jsx`

### HERO

_First scroll stop: headline, subcopy, CTA, and the autoplaying hero video._

**`hero.copy`** — H1 'Handle your inbox in one minute a day', subcopy, early-access CTA and the 400+ reviews rating row.

· Home route, stop 'hero'. · appears on 1 routes · implemented by `Hero.jsx`

**`hero.video`** — Square rounded media frame: triage video that crossfades to a looping waves video, with a 'Scroll to learn more' pill and a pause/play/replay control.

· Home route, stop 'hero'. · appears on 1 routes · implemented by `HeroVideo.jsx`

### DECK

_Sticky 4-viewport section that explains email triage: word-reveal copy, swipeable card stack, and the Stack Challenge game._

**`deck.word-reveal-copy`** — Left-column paragraph whose characters and words reveal from 15% to full black as the user scrolls.

· Home route, stops 'deck_intro' to 'triage_game'. · appears on 1 routes · implemented by `WordReveal.jsx`

**`deck.email-stack`** — Stack of 320x474 email cards on a panel whose background shifts surface, green, sky; the top cards swipe 'Done' then 'Later' as scroll progresses.

· Home route, stops 'deck_intro', 'deck_swipe_done', 'deck_swipe_later'. · appears on 1 routes · implemented by `EmailStack.jsx`

**`deck.triage-game`** — 'Avec Stack Challenge': intro card, 3-2-1 countdown, 20-second sorting game, and a score and leaderboard finish screen.

· Home route, stop 'triage_game'. · appears on 1 routes · implemented by `TriageGame.jsx`

### EXPAND

_Sticky 7-viewport section driven by one integer scroll state (0-6): voice compose, low-importance triage, search and notifications demos._

**`expand.compose-demo`** — Clip-path stage that turns surface, red, brand, amber while a scrubbed phone video plays voice compose, with word-reveal captions per state.

· Home route, stops 'compose_intro', 'compose_record', 'compose_drafted', 'low_importance'. · appears on 1 routes · implemented by `Expand.jsx`

**`expand.be-here-now`** — Blue 'Be here now' button positioned over the phone's Done button that expands to full bleed with a waves video.

· Home route, stops 'deck_empty' to 'notifications'. · appears on 1 routes · implemented by `Expand.jsx`

**`expand.search-demo`** — 'Find anything in seconds' headline, a typing search pill and glass answer and sources cards.

· Home route, stop 'search'. · appears on 1 routes · implemented by `Expand.jsx`

**`expand.notifications-demo`** — 'Stay informed' headline, an airline notification banner and an expanded email card.

· Home route, stop 'notifications'. · appears on 1 routes · implemented by `Expand.jsx`

### PROOF

_App Store review social proof._

**`proof.reviews-carousel`** — Auto-advancing, draggable, edge-masked carousel of six App Store reviews with star rows.

· Home route, stop 'footer'. · appears on 1 routes · implemented by `ReviewsCarousel.jsx`

### FOOTER

_Closing stop: download headline, CTAs and legal/social bar._

**`footer.launch`** — Logo plus 'Avec is available for free on the App Store.' headline and the Get early access / Get notified button pair.

· Home route, stop 'footer'. · appears on 1 routes · implemented by `Footer.jsx`

**`footer.bar`** — Copyright line with X, YouTube, Instagram, LinkedIn, email, Terms and Privacy links.

· Home route, stop 'footer'. Presumed on the legal routes; not verified. · appears on 3 routes · implemented by `Footer.jsx`
