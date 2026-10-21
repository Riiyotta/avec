Source: https://www.avec.ai/

# Avec (avec.ai) clone spec

Single route (`/`). Next.js 16/Turbopack + Tailwind CSS v4 + React, with PostHog analytics. There are also `/terms` and `/privacy-policy` (linked, not recon'd here). Everything below was measured live with Playwright (Chromium) on 2026-10-21 or read from the saved JS/CSS in `_reference/`. All computed colors come back as `lab()`/`oklab()`. Hex equivalents below come from the `#hex` fallbacks the original CSS ships alongside them.

## 0. How to use this spec / key facts

* **The original CSS is Tailwind v4 compiled output** at `/Users/riyaghosh/V3/avec/_reference/saved_files/02pbodqrw6tpf.css` (92 KB). Scaffold is Tailwind v3, so utilities that don't exist in v3 are used heavily: `h-dvh`, `size-*`, `bg-linear-to-t`, `aspect-27/40`, `[scale:..]`, `pointer-fine:`, `short-phone:`, `snug:`, `capped:`, `max-md:`, `@container`/`cqw` units, `text-[18px]/[28px]`, `*:-mr-0.75`, and so on. Simplest faithful path is to port that CSS (replace `../media/...woff2` with `/fonts/...`) or switch the project to Tailwind v4.
* **Deobfuscated JS** is in `/Users/riyaghosh/V3/avec/_reference/beautified/` (esbuild-formatted copies of every chunk). Component logic:
  * `0rp2cat0iqwyz.js` is the page. It holds HeroVideo (~line 400), ScrollHint, ScrollProgressDots (~450), ScrollRevealSection (~490), ScrollStorySection (~540, **not rendered on the live page, ignore**), WordReveal, scroll hooks `useScrollFloat`/`useScrollApproach`/`useScrollProgress`, `getScrollStops`, ExpandSection (~170-320), FooterHeadline, ReviewsCarousel (~35-110).
  * `2632ue434kip8.js` has EmailStack (~3043-3150), the Avec Stack Challenge game (~3150-3280, `10989` module), the Get notified modal (~2960-3012), TestFlight/Platform CTAs (~2987).
  * `16udjgexe4ds2.js` is the **full copy/content object** (`content`, `fakeEmails`) and the dot-tooltip frame imports.
  * `1ffdccxg0rq0z.js` holds `TESTFLIGHT_URL = https://testflight.apple.com/join/3JR2HxjZ`.
* **The page is a scroll-jacked app, not a normal document.** `<main data-scroll-root class="relative h-dvh snap-y snap-mandatory pointer-fine:snap-proximity overflow-y-auto bg-background">` is the scroller (`body` is `overflow: visible`, `document.scrollHeight` = viewport height). Total scroll height is 13 screens at desktop (11700 px at 1440x900). `header` and the dots/hint are `position: fixed`.
* Screenshots: `/Users/riyaghosh/V3/avec/_reference/shots/desktop-1440-NN-<stop>.png` (13 stops) and `mobile-390-NN-<stop>.png` (13 stops). `_misnamed_ignore/` holds a first batch with off-by-one names. Ignore it, it can be deleted.
* Not reachable or not reproduced: the "Get notified" POST endpoint and its response, the Stack Challenge leaderboard/percentile API (`/stackchallenge`, `/stackchallenge/s/<id>`), PostHog (`i.net.inc`) payloads. Their behaviour is described only from client code.

## 1. Fonts

Body class: `gtstandard_437f0735-module__1EkxVq__variable inter_ba8a5147-module__-_A5DG__variable font-sans antialiased`. `<html lang="en">`.

* `--font-gt-standard: "gtStandard", "gtStandard Fallback"` is the default font (`font-sans`, `--default-font-family`). Variable font, **weights used: 400, 500, 550 (rare), 600, 700 with fractional `font-weight: 550` in game card buttons**. Optical size axis is driven by `font-variation-settings: "opsz" N` in the `.type-*` classes, and `font-optical-sizing: none` on body.
* `--font-inter-face: "Inter", "Inter Fallback"` (`.font-inter`) is used inside fake email cards, search/notification cards, "Be here now", the Search pill, the avatar initials.

Local files (downloaded) are in `/Users/riyaghosh/V3/avec/public/fonts/`:

```css
@font-face{font-family:gtStandard;src:url(/fonts/GT_Standard_VF-s.p.1bb_t6o__k212.woff2) format("woff2");font-display:swap;font-style:normal}
@font-face{font-family:"gtStandard Fallback";src:local(Arial);ascent-override:81.96%;descent-override:16.05%;line-gap-override:0.0%;size-adjust:118.36%}
/* Inter variable, 100 900, normal, swap. One face per unicode-range subset: */
@font-face{font-family:Inter;font-style:normal;font-weight:100 900;font-display:swap;src:url(/fonts/2c55a0e60120577a-s.03ez25a9g3i0n.woff2) format("woff2");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F} /* cyrillic-ext */
@font-face{...src:url(/fonts/9c72aa0f40e4eef8-s.3i9rha7jpxn0q.woff2);unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116} /* cyrillic */
@font-face{...src:url(/fonts/ad66f9afd8947f86-s.2o7ko1d-5m1xu.woff2);unicode-range:U+1F??} /* greek-ext */
@font-face{...src:url(/fonts/5476f68d60460930-s.1ee5w62fj497l.woff2);unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF} /* greek */
@font-face{...src:url(/fonts/2bbe8d2671613f1f-s.1way2z9fj6cig.woff2);unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB} /* vietnamese */
@font-face{...src:url(/fonts/1bffadaabf893a1e-s.0szrwpqb9mkwe.woff2);unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF} /* latin-ext */
@font-face{...src:url(/fonts/83afe278b6a6bb3c-s.p.45535valc9rzk.woff2);unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD} /* latin */
@font-face{font-family:"Inter Fallback";src:local(Arial);ascent-override:90.44%;descent-override:22.52%;line-gap-override:0.0%;size-adjust:107.12%}
```

Font fallback stack in practice: `gtStandard, "gtStandard Fallback"`, then Tailwind sans (`ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", ...`). Note that in my dump the review score "5.0" / "400+ reviews" resolve to `ui-sans-serif` at 18.5px bold (they are intentionally the system font, mimicking the App Store UI).

## 2. Design tokens (original CSS custom properties, verbatim)

```css
:root,:host{--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
--color-red-700:#bf000f;--color-green-700:#008138;--color-blue-100:#dbeafe;--color-neutral-500:#737373;--color-neutral-700:#404040;--color-neutral-900:#171717;--color-black:#000;--color-white:#fff;
--spacing:.25rem;--container-sm:24rem;--container-md:28rem;--container-5xl:64rem;
--text-sm:.875rem;--text-sm--line-height:calc(1.25 / .875);--text-lg:1.125rem;--text-lg--line-height:calc(1.75 / 1.125);--text-xl:1.25rem;--text-xl--line-height:calc(1.75 / 1.25);--text-2xl:1.5rem;--text-2xl--line-height:calc(2 / 1.5);
--font-weight-medium:500;--font-weight-semibold:600;--font-weight-bold:700;
--tracking-tighter:-.05em;--tracking-tight:-.025em;--leading-snug:1.375;
--radius-sm:.25rem;--radius-md:.375rem;--radius-lg:.5rem;--radius-xl:.75rem;--radius-2xl:1rem;--radius-4xl:2rem;
--ease-in:cubic-bezier(.4, 0, 1, 1);--ease-out:cubic-bezier(0, 0, .2, 1);
--animate-spin:spin 1s linear infinite;--animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;
--blur-sm:8px;--blur-md:12px;--blur-lg:16px;--blur-2xl:40px;
--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);
--default-font-family:var(--font-gt-standard);--default-mono-font-family:var(--font-mono);
--color-background:#f7f6f4;--color-foreground:#171717;--color-brand:#0050ff;--color-accent-green:#03ce4c;--color-accent-red:#f73c1d;--color-accent-sky:#36b7ff;--color-surface:#e5e2dc;
--section-max-w:1124px}
/* additional tokens found as utilities (not in :root dump): */
--color-accent-amber:#ffac1f; --color-surface-alt:#edecea; --color-brand-alt:#226ef4;  --color-soft (placeholder color, see css)
/* responsive custom props */
:root{--expand-btn-radius:40px;--search-anchor:26%;--headline-offset:155px}
@media (min-width:1380px){:root{--section-max-w:1280px}}
@media (min-width:2000px){:root{--section-max-w:1440px}}
@media (min-height:960px){:root{--search-anchor:30%;--headline-offset:180px}}
/* global */
html{scrollbar-width:thin;scrollbar-color:gray transparent}
body{background:var(--color-background);color:var(--color-foreground);font-optical-sizing:none;letter-spacing:-.01em;font-variation-settings:"opsz" 16;font-size:1rem;line-height:1.5} /* >=768: font-size 1.25rem is applied on .type-body only; body stays 16px (measured) */
@media (prefers-reduced-motion:reduce){*,:before,:after{scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important;animation-iteration-count:1!important}}
```

Color table (token -> hex):

| Token | Hex | Use |
|---|---|---|
| background | #f7f6f4 | page, sticky section bg, theme-color, manifest bg |
| foreground | #171717 | default text (rendered via lab), dims `/50`, `/15`, `/10` |
| black / white | #000 / #fff | h1, hero p, header bg `#fff` |
| brand | #0050ff | hero video bg (before load), compose bg step 2, notify submit btn |
| brand-alt | #226ef4 | hover of brand button |
| accent-green | #03ce4c | deck bg step 1, "Done", +1 chip bg `/30`, SE avatar, android icon |
| accent-red | #f73c1d | compose_record bg, -1 chip `/30` |
| accent-sky | #36b7ff | deck bg step 2, "Later", Acorns avatar |
| accent-amber | #ffac1f | compose_drafted bg |
| surface | #e5e2dc | deck frame bg, game frame, bg after compose |
| surface-alt | #edecea | button hover bg |
| green-700 / red-700 | #008138 / #bf000f | +1 / -1 text |
| Email card text | #403e3c, meta #878580 | |
| Reply btn | #0682fe (white text, sub text `blue-100/70` = #dbeafe @ 70%) | |
| Done overlay (swipe right) | #07AA04 | `Later` overlay #858482 |
| Be here now btn | oklch(0.6474 0.2088 252.22) ~ #008cff (class `bg-[#008cff]`) | |
| Search sources text | #737373 / #222 / #6e6d6a / #000 | |
| Fake laptop | bezel neutral-900 #171717, base neutral-700 #404040, screen #e5e4e1 | dormant ScrollStory, ignore |

Shadows (verbatim computed):
* Header bar: `0px 1px 21px 0px rgba(0,0,0,.05), 0px 11px 9px 0px rgba(0,0,0,.03), 0px 2px 4px 0px rgba(0,0,0,.02)` (plus Tailwind no-op layers).
* Hero video frame: `shadow-lg` = `0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1)`.
* Email cards: `0 0 0 0.33px rgba(0,0,0,.07), 0 2px 8px 0 rgba(0,0,0,.06)`.
* Game intro card: `0 0 0 1px rgba(0,0,0,.1) (ring-1 black/10), 0 20px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1)` (shadow-xl).
* Search/notification glass cards: `inset 0 -2px 4px -2px rgba(0,0,0,.08), 0 2px 2px -2px rgba(0,0,0,.08), 0 4px 4px -2px rgba(0,0,0,.08), inset 0 8px 8px -8px #fff, inset 0 4px 2px -4px #fff`, bg `rgba(255,255,255,.8)` + `backdrop-blur-md` (12px). The notification email card is `bg-white/55`, radius 28px, shadow `0 12px 32px -18px rgba(0,0,0,.5)`.
* "Be here now" button: `inset 0 4px 14px 0 #FFFFFF60, 0 0 24px 0 #008CFF90`.
* Search pill uses the same glass recipe, see `y` in `61541` module: `0 -2px 4px -2px rgba(0,0,0,.08) inset, 0 2px 2px -2px rgba(0,0,0,.08), 0 4px 4px -2px rgba(0,0,0,.08), 0 8px 8px -8px #FFF inset, 0 4px 2px -4px #FFF inset`.

Radii: header bar `0 0 20px 20px`; hero/deck/game frames 32px (`rounded-4xl`); email cards 20px; email Reply btn 12px; header buttons 12px, hero/footer buttons 16px; icon in btn 6px; "Be here now" 40px (`--expand-btn-radius`); glass cards 16px/20px/24px/28px; pills `rounded-full`; chip `rounded` 4px; `rounded-sm` 4px for kbd keys.

## 3. Typography classes (from the CSS) and where they resolve

| Class | Rule |
|---|---|
| `.type-display` | ls -.025em, opsz 30, `font-size: clamp(2.5rem,5vw,4rem)`, lh 1 |
| `.type-display-footer` | ls -.025em, opsz 30, `clamp(2.5rem,5vw,4rem)`, lh 1; `@media not all and (min-width:48rem)` -> `font-size:max(1.5rem,10.3vw - 5px)` |
| `.type-hero` | ls -.025em, opsz 30, `clamp(1.75rem,6vw,3.5rem)`, lh 1.08; >=768: `clamp(2.25rem,3.4vw,3.5rem)` |
| `.type-title` | ls -.03em, opsz 26, 1.5rem lh 1.2; >=768: 2rem |
| `.type-body-lg` | ls -.02em, opsz 20, `clamp(1.25rem,2.2vw,1.75rem)`, lh 1.2 |
| `.type-body` | ls -.01em, opsz 16, 1rem lh 1.5; >=768: 1.25rem |
| `.type-body-sm` | ls -.02em, opsz 14, .875rem lh 1.35; >=768: 1.125rem |
| `.type-button` | ls 0, opsz 15, .9375rem, lh .9 |
| `.type-caption` | ls -.02em, opsz 10, .75rem, lh 1.35 |
| `.word-reveal-span` | `transition: color .12s` |
| `.section-content` | `width:100%; max-width:var(--section-max-w); margin-inline:auto` |
| `.section-frame` | `scroll-snap-align:start; padding-inline:1rem; display:flex; flex-direction:column; padding-top:96px` (>=768: 70px) |

Measured computed values at 1440 (font | size | weight | line-height | letter-spacing | color):

| Element | Values |
|---|---|
| Hero h1 | gtStandard 64px / 500 / 64px / -1.6px / #000, `text-balance`, left, box 640x128 at (80,300) |
| Hero p | 20px / 400 / 30px / -0.6px (`tracking-[-0.03em]`) / #000, max-w 500px, box 500x60 at (80,452) |
| Hero CTA label | 20px / 500 / 30px / -0.5px / #000 (`type-body tracking-[-0.025em]`) |
| Header CTA labels | `type-button`: 15px / 500 / 13.5px / -0.3px (`tracking-[-0.02em]`) / #000 |
| "400+ reviews" | ui-sans-serif 18.5px / 700 / 28.78px, color foreground at 50% opacity (container `opacity-50`) |
| "5.0" | same |
| Scroll hint (fixed, top 78px) | 14px / 500 / 20px / -0.35px / foreground 50%; key chips 12px/20px, border 1px foreground/50, radius 4px, px 4 py 1px, mx 2px |
| Scroll-to-learn-more pill | 14px / 500 / 20px / -0.35px / #fff on `bg-black/55` + `backdrop-blur-sm` (8px), px16 py8, gap 6px; arrow chip 12px/16px border white/60 |
| Deck intro text | 28px / 400 / 33.6px / -0.56px (type-body-lg), color black at alpha .15 (dim) -> 1 (revealed), max-w 480px |
| Email subject | Inter 18px / 500 / 28px / -0.45px / #403e3c |
| Email sender | Inter 14px / 500 / 20px / -0.14px / #403e3c; time 12px/16px/-0.12px #878580; "To:" 12px #403e3c; recipients #878580 |
| Email body | Inter 14px / **440** / 20px / -0.14px / #403e3c, `whitespace-pre-line` |
| Reply | Inter 14px/500/20px; "Hold to voice compose" 12px/500/16px, color #dbeafe @ .7 |
| Later/Done swipe overlay label | gtStandard 20px / 500 / 28px / -0.7px / #fff |
| Game chip "Experience it yourself" | 12px / 500 / 16.2px / -0.42px / foreground, bg surface @ .75, px8 py4 |
| Game title | 28px / 500 / 33.6px / -0.56px (type-body-lg font-medium) |
| Game sub | 16px / 500 / 24px / -0.16px |
| Game hint | 14px / 500 / 20px / -0.28px |
| Game card button labels | 14px / 550 / 14px / -0.35px / #fff |
| Correct/Incorrect chips | 14px / 500 / 20px / -0.28px; `+1`/`-1` 600 |
| "Click or press Enter to begin" | 16px / 500 / 24px / -0.48px; Enter key chip: border foreground/15, radius 4, padding 0 4px 2px |
| Expand captions (compose_record etc.) | type-body-lg, 28px at 1440, centered, max-w 700/760/720/680, WordReveal |
| Search / notif headline | `type-title` white: 32px / 400 / 38.4px / -0.96px, with blurred black halo span (opacity .5 md, `blur-2xl` 40px) |
| Search pill text | Inter 32px / 400 / 48px / -0.8px / #000 |
| Search answer | Inter `type-body` 20px / 400 / 30px / -0.6px |
| Sources label | Inter 18px / 500 / 24.3px / -0.36px / #737373; name 18/500 #000; subject 18/500 #222; preview 18/400 #737373 truncate |
| Avatar initial | Inter 20px / 500 / 30px, white @ .9, circle 43x43 (class `size-[34px]` scaled; measured 43) |
| Notification email subject | Inter 20px / 500 / 24px / -0.6px; sender 20px/500/30px/-0.4px; time 18px #6e6d6a; body 20px / 400 / 27px / -0.2px #6e6d6a (`leading-[1.35]`) |
| Notification banner | Inter title 20px/500/30px/-0.4px; body 20px/400/27px/-0.2px #171717 |
| Footer h2 | 64px / 500 / 64px / -1.6px #000, max-w 735px, centered, pt 16px |
| Footer CTA labels | 20px/500 like hero CTA |
| Review title (h3) | gtStandard 18px / 500 / 28px / -0.9px (`tracking-tighter` -.05em) / black @ .5 |
| Review author/body | 16px / 400 / 24px / -0.8px / black @ .5 (`text-body tracking-tighter text-pretty`; note `.text-body` is body-size) |
| Footer caption/links | `type-caption`: 12px / 400 / 16.2px / -0.24px / #000 |

## 4. Breakpoints and layout

Tailwind v4 default breakpoints (sm 40rem, md 48rem/768, lg 64rem, xl 80rem, 2xl 96rem) plus custom:
* `min-[381px]`, `min-[414px]` (game subtitle "s"/"sec"/"seconds"), `max-[452px]` / `max-[435px]` footer grid.
* `short-phone:` = `(max-width:767.98px) and (max-height:639.98px)` (`not (min-width:768px) and not (min-height:640px)`).
* `snug:` = `(min-width:768px) and (max-width:1155.98px)` (adds `pl-4`/`pr-8` to text columns); `capped:` = `(min-width:1156px)` (removes them).
* Height queries: `(max-height:700px)` compacts type (type-body/hero, tighter gaps), `(min-height:701/740/768/960px)` enlarge scale/translate/anchors.
* `pointer-fine:` = `(pointer:fine)` (keyboard hints, snap-proximity); `hover:hover` guards hover styles. Width 1220px: dots `right-6` (else `right-2`). 125rem (2000px) container 1440.

Container `--section-max-w`: 1124px (<1380), 1280px (>=1380), 1440px (>=2000). Observed: 1440 viewport -> container x 80..1360 (1280); 1280 viewport -> x 78..1202 (1124); 768 -> content 16px gutters; 390 -> 16px gutters.

### Measured per viewport (hero)

| | 1440x900 | 1280x800 | 768x1024 | 390x844 |
|---|---|---|---|---|
| Header bar | fixed, outer `px-4 (md) pt-0`, inner `section-content` 1280x70 at x80 | 1124x70 at x78 | 736x70 at x16 | 390x70 (full bleed; md:px-3 only >=768), radius 0 0 20 20, py 12, px 16 |
| Header content | logo svg 130x32 (class `h-6 md:h-8`) at x92 y19; two buttons (iOS "Get early access" 182x46, "Get notified" 148x46, gap 7px) right aligned | same | both buttons | logo 98x24; only "Get early access" shown (Get notified `display:none`) |
| Hero layout | row (md:flex-row, items-stretch), text col `flex-1`, media col `flex-1` | row | row | `flex-col-reverse`, gap 32px; video above text |
| h1 | 64px, box 640x128 | 64px, 562x128 | 40px / 40px / -1px, 344x80 | 40px/40px/-1px, 326x80 centered |
| Hero p | 20/30 | 20/30 | 20/30 | 16/24, ls -0.48px, centered |
| Hero CTA | 242x64 (px24 py16 gap16, radius 16, border 1px black/50) | same | same | **hidden** (`hidden md:flex`) |
| Review row | App Store wordmark 104x20 (`hidden lg:block`), "400+ reviews", "5.0" + 5 stars 22px, gap 16 (md:gap-4) | | | no app store wordmark, gap 12, centered, only reviews + stars |
| Video square | 640x640 at (720,157), radius 32 | 562x562 at (640,146) | 344x344 at (408,367) | 358x358 at (16,160) |
| Hero frame | `section-frame h-dvh pb-4`, content top 70 | | | |
| Scroll height | 11700 | 10400 | 13312 | 11178 |
| Stops (data-section-name tops) | 0, 900, 1800, 2700, 3600, 4500, 5400, 6300, 7200, 8100, 9000, 9900, 10800 (13 stops, 1x viewport height each, except deck_intro/expand sections 4x/7x tall) | 800*n | 1024*n | 844*n, footer 1050 tall |
| Progress dots | right 24px (>=1220) | 24px | flex, right 8px | hidden (`hidden md:flex`) |
| Scroll hint | md+ only | | | hidden |
| Footer h2 | 64px two-line, logo glyph inline (0.85em) | | 40px, `block` (md) | `type-display-footer` mobile variant: logo above, 2 lines, font-size `max(1.5rem, 10.3vw - 5px)` = 35.2px |

Footer buttons: row on md+ (`md:w-auto md:flex-row md:gap-3`), stacked full width (gap 8) on mobile. Footer bottom bar: `mx-6 md:mx-10`, 1px `bg-black/10` rule, row with copyright left and links right (`md:flex-row md:justify-between`, py 22px at md); `max-[452px]` switches to a 2-col grid (copyright spanning, social links col 1, Terms/Privacy col 2).

## 5. Sections, copy, structure

Structure of `<main>` children (order): ScrollHint (fixed), ScrollProgressDots (fixed), `<header>` (fixed), then scrollable: Hero `<section>`, Deck `<section.snap-start>` (3600 tall), Expand `<section>` (6300 tall), `<footer>`.

### 5.0 Meta
`<title>` "Avec - Handle your inbox in one minute a day". Description: "Made for people who hate email. Works with your existing Gmail account. Download for free on the App Store." Keywords: email,Gmail,inbox zero,AI email,triage,iOS,email app,AI,productivity. theme-color #f7f6f4. og:title same, og:url https://avec.ai, og:site_name Avec, og:locale en_US, og:image `/opengraph-image.png` 1200x630 (local: `public/assets/opengraph-image.png`), twitter summary_large_image. Icons: `favicon.ico` (1024x1024 declared), `apple-icon.png` 180x180. Manifest `/manifest.webmanifest`: name Avec, "The free AI email app for Gmail", display browser, bg/theme #f7f6f4.

### 5.1 Header (fixed, z-50)
`header.fixed.top-0.inset-x-0.z-50.flex.justify-center.md:px-4`. Inner `div.section-content.flex.items-center.justify-between.rounded-b-[20px].bg-white.px-4.md:px-3.py-3.shadow-[...]`.
* Left: `<a href="/" aria-label="Avec home">` + `avec-logo.svg` (viewBox 0 0 650 160, fill currentColor, h-6 md:h-8 w-auto).
* Right (`gap-[7px]`): `<a href=TESTFLIGHT target=_blank rel="noopener noreferrer" aria-label="Get early access">` with TestFlight icon img (20x20, radius 6px, `/_next/image` of `images/testflight.png`) + label "Get early access"; then `<button>` "Get notified" with Outlook+Android icons (two svgs 14px, overlapping; see `outlook-icon.svg`, `android-icon.svg`) that opens the notify modal.
* Button classes: `flex w-fit cursor-pointer items-center border transition-transform duration-120 active:scale-[0.97] border-black/50 hover:bg-surface-alt gap-3 rounded-xl px-4 py-3`, label `whitespace-nowrap font-medium select-none type-button tracking-[-0.02em] text-black`. Hover bg #edecea, active scale .97, transition-transform 120ms. Header buttons are 46px tall, hero/footer variant 64px (`gap-4 rounded-2xl px-6 py-4`, icon 24px).

### 5.2 Hero (stop `hero`, group hero)
`section.section-frame.h-dvh.pb-4.short-phone:h-auto.short-phone:min-h-dvh` > `div.section-content.relative.flex.flex-1.flex-col-reverse.justify-center.items-center.md:flex-row.md:items-stretch.gap-8`.
* Text column: `flex shrink-0 flex-col gap-4 px-4 pb-6 md:flex-1 md:justify-center md:gap-6 md:pb-0`.
  * h1 "Handle your inbox in one minute a day"
  * p "Made for people who hate email. Works with your existing Gmail account."
  * CTA row (`hidden md:flex md:flex-wrap md:items-center md:gap-3`): "Get early access" (TestFlight link, 24px icon). No second button here.
  * Rating row: `flex items-center gap-3 md:gap-4 opacity-50 justify-center md:justify-start md:pl-0.5` containing App Store wordmark svg (104x20, `hidden lg:block`), "400+ reviews" (`text-lg text-[18.5px] font-bold`, system font, gap 3px with "5.0" and 5 star svgs 22px, `*:-mr-0.75`, stars use full-width clipPath).
* Media column: `flex w-full flex-col items-center md:flex-1` with spacer divs, and `div.relative.aspect-square.w-full.md:max-w-[calc(100dvh-122px)].overflow-hidden.rounded-4xl.bg-brand.shadow-lg`.
  * Video A `/hero-triage.mp4` poster `/hero-triage-poster.webp`, muted, playsInline, `preload=auto`, `object-cover absolute inset-0` (NOT looping).
  * Video B `/hero-waves.mp4` poster `/hero-waves-poster.webp`, loop, muted, `preload=metadata`, crossfades in over A with `transition-opacity duration-1000` (opacity 0 -> 1).
  * Centered overlay (opacity 0 -> 1 over 1000ms, same trigger) with pill button "Scroll to learn more [↓ chip]" (disabled until shown); click scrolls main to `clientHeight` smoothly.
  * Top-right circular icon button 40x40, top-4 right-4, `bg-black/40 backdrop-blur-sm` text white: pause icon while playing, play icon when paused, replay (circular arrow) after end. aria-label "Pause video"/"Play video"/"Replay video".
  * Behaviour (see `85945` module): triage video starts when ready; fallback `play()` after 2s timeout (shows play icon if blocked); an rAF loop watches `currentTime`: at `duration - 6s` starts waves video playing silently, at `duration - 1.4s` sets `ended` state (waves fade in, pill appears), and freezes triage at `duration - 2/60 s`. Waves is paused/reset 1s after if not shown. Replay button resets both.
  * Hero poster at 1440: `/_next/image?...frame-01...` is NOT the hero. Hero uses only the 2 videos.

### 5.3 Deck section: stops `deck_intro`, `deck_swipe_done`, `deck_swipe_later`, `triage_game` (group scroll_reveal)
`section.snap-start` (height 4x viewport; `useScrollFloat(ref, 3, {snap:true})` -> float 0..3 across the 3 transitions). Inside: `div.sticky.top-0.flex.h-dvh.flex-col.bg-background.px-4.pt-24.pb-4.md:pt-[70px]` > `div.section-content.relative.flex.flex-1.flex-col-reverse.items-stretch.md:flex-row`, then 3 sibling `div.h-dvh.snap-start` scroll-stops with `data-section-name` `deck_swipe_done`, `deck_swipe_later`, `triage_game` (and the `<section>` itself is `deck_intro`).

* Left text (`type-body-lg`, `flex-1 md:pr-8 snug:pl-4`, `max-w-[480px]`): paragraph 1 = three WordReveal chunks, "Avec prioritizes your inbox and shows your important emails one by one." + "Swipe to mark them done" + "or save for later." Paragraph 2 (`mt-4 md:mt-6`): "(Yes, it's like Tinder for email)". Words dim to black @ 15% and reveal to black. First chunk driven by `useScrollApproach` (hero->deck scroll progress, per character), following chunks by `v(i)` = clamp(float - i); chunk dim opacity .3 while in progress. WordReveal per-char color switch with `transition: color .12s`; in discrete mode words reveal one at a time every 25 ms (offset 25ms * wordOffset).
* Right panel (`w-full flex-1 md:grow-[999] overflow-hidden rounded-4xl max-h-[640px]`, bg interpolated with scroll): background via `scrollRevealGraphicBackground(float)`: surface (#e5e2dc) -> accent-green (#03ce4c) -> accent-sky (#36b7ff) -> surface using `color-mix(in srgb, A (1-r)%, B r%)` with `r = clamp((frac-0.25)/0.5)`. Panel at 1440 is 624x640 at (736, 157).
* Card stack inside (EmailStack, container `aspect-27/40 w-full max-w-[320px]`; scale `--stack-scale` on mobile, 1 on md). Cards 320x474 at (888,...). Each card (`rounded-[20px] bg-white font-inter`): subject (p-4 top), sender row with 36px round avatar, From, "2 days ago", "To: ...", body (clipped, bottom fade `h-10 bg-linear-to-t from-white to-transparent`), Reply button (`mx-3 mb-3 rounded-xl bg-[#0682fe] px-4 py-3`, reply arrow icon + "Reply" + "Hold to voice compose"). An overlay (`absolute inset-0 rounded-[20px] p-5 text-white`) with "Later" (#858482, icon + label aligned right) or "Done" (#07AA04, check, left) fades in as the card is swiped.
* Stack motion by float: card 0 swipes right (green, "Done") over float 0..1; card 1 swipes left (sky, "Later") over 1..2; third card stays then game (stop 4). Swipe transform = `translateX(200% * e) rotate(12deg * e)` (sign by dir) with `e = ease(t)` where `u(t)` = `((t+r)*.5)^3` style easing (see `u`/`L` in 2632 ~3040-3100), overlay opacity ramps 0.05->0.1 progress. Non-top cards: `translateY(-8px*k) scale(1 - .1*k)`, origin-top. Reduced card opacity beyond depth 2.
* Auto-snap: `useScrollFloat` with `snap` re-scrolls (smooth) to nearest integer step on `scrollend` (or 150ms timeout) with 0.15 threshold, 800ms lock. The root also disables snapping while pointer is fine and the game card is in view (ScrollStory only, not live).
* Stop 4 `triage_game` ("Avec Stack Challenge"): over the frame a full-panel button `div.group.absolute.inset-0.z-20.flex.items-center.justify-center.p-6.cursor-pointer` (role button, "Click or press Enter to begin") containing a white card `rounded-[28px] p-8 gap-8 ring-1 ring-black/10 shadow-xl` (w 408 at 1440, hover `scale-102` on pointer-fine, `transition-[backdrop...]` overlay `bg-oklab(0 0 0/0)` -> dim on hover):
  1. chip "Experience it yourself"
  2. h2 "Play Avec Stack Challenge"
  3. "Sort as many emails as you can in 20 sec|onds" (`s`/`sec`/`seconds` responsive via min-[381]/min-[414])
  4. "Use the arrow keys to match each card's label" (pointer-fine) / "Tap/swipe to match each card's label" (touch)
  5. mini illustration: two skeleton cards (bg #f7f6f4, border foreground/10, radius 12px, shadow `0 1px 4px rgba(0,0,0,.06)`, 4 bars `h-1 rounded-full bg-foreground/10` widths 95/85/95/60%, labelled button: "Later" sky / "Done" green, `mx-2 mb-2 rounded-lg py-2`) with left/right arrow icons (12-15px)
  6. chips `+1 Correct` (bg green@30%) and `-1 Incorrect` (bg red@30%), each `rounded px-1.5 pb-1 pt-0.5 gap-1.5`
  7. "Click or press [Enter] to begin" / "Tap to begin"
  Game states (`10989` module): `countdown` (3-2-1 with `countdown-pop` .9s), `playing` (20s timer, ArrowLeft = later, ArrowRight = done, or drag/swipe; cards labelled "Later"/"Done" random; score +1/-1 clamped -99..99; panel bg flashes accent-green/sky/red via `bg-pulse` .5s), `finished` ("Your score", leaderboard percentile histogram with bars `bg-foreground/20`, active `bg-accent-sky`, hover tooltip "N pts (count)", "Play again", share button that spawns `float-up-fade` emoji/text "Can you beat my score on @Avec Stack Challenge?" and uses `/stackchallenge/s/<id>`). Card labels "← Later" and "Done →". Card enter animation `card-enter .8s cubic-bezier(.16,1,.3,1)`. Sound/haptics: `useIosHaptics` (light/error) only. Read lines 3150-3290 of `2632ue434kip8.js` before implementing.

### 5.4 Expand section: stops `compose_intro`, `compose_record`, `compose_drafted`, `low_importance`, `deck_empty`, `search`, `notifications` (group expand)
`section` (7x viewport = 6300) with `div.section-frame.sticky.top-0.h-dvh.overflow-hidden.bg-background.pb-4` (`data-section-name=compose_intro`) and 6 sibling `div.h-dvh.snap-start` stops. State `B = useScrollProgress(ref, 7)` = integer 0..6 (round(progress*6) once section top <= 0, else -1). All animation is state-triggered CSS transitions, not scrubbed.

Inner `div.relative.flex-1` holds: (a) a full-bleed "stage" `absolute left-1/2 top-1/2 -translate-x-1/2 flex justify-center items-center px-2 h-[calc(100%+86px)] (mobile +112px) w-[calc(100%+32px)]` and translated `calc(-50% - 27px)` (mobile -40px), whose bg is `surface` (B<=0 or >=4), accent-red (B=1), brand (B=2), accent-amber (B=3), plus `clip-path: inset(var(--card-clip-t) var(--card-clip-r) var(--card-clip-b) var(--card-clip-l) round 20px)` animating to `inset(0 round 0)` when B===1, transition `clip-path 500ms cubic-bezier(.4,0,.2,1), background-color 500ms same`. CSS vars `--card-clip-*` are computed by JS (`a2()` ~line 293). At B=0 the stage is the clipped card shape showing the phone (the frame sits in the panel). (b) phone video inside `relative aspect-2/3 w-full md:w-auto md:min-h-full md:max-w-full` > wrapper `absolute inset-0 will-change-transform transition-[transform] ease-[cubic-bezier(.645,.045,.355,1)]` with transforms: B<=0 `translateY(18.5%) scale(.8)` (mobile `translateY(calc(5dvh+21%+25px)) scale(1)`), 500ms; B=1 `translateY(-24%)` (mobile `translateY(calc(-35%+25px))`), 500ms; B>=2 `translateY(22.5%) scale(.88)` (mobile `calc(5dvh+29%+25px)` scale 1.2), 500ms mobile / 600ms md. Video `/phone-demo.mov` (HEVC with alpha, for Safari) then `/phone-demo.webm` (VP9 alpha, 480x720 at 1440), poster `/phone-demo-poster.webp`, muted, playsInline, preload auto, object-cover. Video is time-scrubbed by state: constants m=3.6333s, p=4.3667s, h=5.4167s, A=6.1667s. B=0 paused at 0; B=1 plays, loops between 0.65s and m (record phase); B=2 plays from m to p then pauses 500ms then plays to h; B=3 plays h->A then pauses; B=4 plays A->end; going backwards seeks to the segment end and pauses. See lines ~126-230 of `0rp2cat0iqwyz.js`.
(c) captions layer (`absolute z-1`, inset = same clip vars, 500ms transitions) with 4 `div.absolute.left-1/2.-translate-x-1/2.w-full.px-3.md:px-6.text-center.transition-opacity.duration-150`, shown only for matching B:
  * B=1 `reply` (index0, top 10%, maxW 700, dark text, delay 0): "Use voice to send emails in seconds. Say a few key points and let Avec draft a perfect email for you."
  * B=2 `dictation` (bottom `var(--dictation-caption-bottom,20%)`, maxW 760, light text, delay 900): "“Okay yeah I can do Thursday afternoon, we can change my flight to the evening, and" + word-reveal "yes I can lead it — maybe we can do a quick prep Wednesday?”" (second part revealed after an extra `p2+5` word offset; the live site renders text in white at 1440).
  * B=3 `learn` (top 10%, maxW 720, light, delay 733): "Avec writes emails that sound distinctively like you. Review it, tweak it, and send it."
  * B=4 `triage` (top 10%, maxW 680, light, delay 700): "Not every email deserves the same attention. Handle less important emails with just one swipe."
  Caption wrapper `type-body-lg` (28px), `md:[@media(max-height:700px)]:type-body`; WordReveal `variant dark|light`, hide delay 150ms; show delay per item.
* "Be here now" expanding button (`role=button`, aria-label "Expand section", tabIndex 0 when B>=4): shows at B>=4 (`opacity-100`, duration 500 with delay 500 first time); positioned over the phone's on-screen "Done" button using `--btn-center-x/y --btn-width --btn-height` (CSS vars computed from phone geometry: width = .3893 * phone width * k, height = .063 * phone height * k, k=.88 md / 1.2 mobile); `rounded-[40px]`, bg oklch(.6474 .2088 252.22), glow shadow; text "Be here now" Inter 500, `font-size: calc(var(--btn-height)*.271)` (13.52px at 1440), ls -4.5%. Click -> smooth `scrollBy` to `5/6*(sectionHeight - vh)` (stop 5 = search) and `ios haptic light`. At B>=5 it expands to `width calc(100% + 36px); height calc(100% + 90px)` (mobile +112px), radius 0, bg stays blue and the **waves video** (`/wave_desktop.webm` + `/wave_desktop_hevc.mp4` desktop; `/wave_mobile*` mobile; posters `wave_desktop-poster.webp`/`wave_mobile-poster.webp`; loop muted autoplay) fades in over 500ms (`opacity 0->1`) inside it. Video created lazily when section within 200px (IntersectionObserver).
* Clip-reveal layer (`pointer-events-none absolute -inset-x-4 -bottom-4 z-20`, `top: calc(-1 * var(--sf-pad-top))`): `clip-path` from `inset(50% round 40px)` -> (B>=4) button rect with radius `--expand-btn-radius` (500ms ease) -> (B>=5) `inset(0 round 0)`. It holds the two white headlines and cards:
  * Search headline (visible B===5, `Z = Q && !K`): `type-title` white, w-[500px], top `max(36px, calc(var(--search-anchor) - var(--headline-offset)))` (26% - 155px; at height >=960: 30% - 180px): "Find anything in seconds. Instead of sifting through threads, just ask." with blurred black halo `span.absolute.-inset-3.bg-black.opacity-50.blur-2xl.rounded-2xl`. Transition `all .4s`, delay .1s, hidden state `opacity-0 scale-90 -translate-y-8`.
  * Search pill (glass, rounded-full, 640x120 at md, `top-[max(calc(44%+2rem),20rem)]`... see layout dump; Search icon 36px + Inter 32px text): shows "Search" initially, then types "Find my 1099s from last year" one char per 35ms starting 400ms after B>=5, then at 400+35*n+400 ms shows answer cards.
  * Answer card (`rounded-2xl bg-white/80 backdrop-blur-md p-6`, 480 wide): "You received a 2025 1099-NEC from Smith Engineers LLC on January 11, 2026 and a 1099 Consolidated from Acorns."
  * Sources card (same glass, 480x266): label "Sources", rows: [SE green avatar] "Smith Engineers LLC" / "Your 1099 Tax Documents are available" / "Hi Maura, your 1099 is now available to dow..."; [A sky avatar] "Acorns" / "2025 Tax information from Acorns" / "We wanted to give you a heads up that 2025 Acorns tax forms will be available in the coming weeks." (truncate).
  * Notifications (B===6, `K`): headline replaces search headline (w-[649px]): "Stay informed, without opening your inbox. Avec sends smart notifications that tell you what’s happening and what to do next." Delays: state `$` at +80ms, `ee` at +260ms (cards fade/scale in). Then (a) a banner `div.w-full.rounded-[20px].bg-white/80.backdrop-blur-md` 600x100: 56px icon `/images/avatars/pacific-airlines.png`(radius 25%), "Pacific Airlines" (20px/500) + "New departure Thursday 7:45pm. Seat assignment 2A. Download boarding pass." (20px/27px); (b) an expanded email card (576x514, `rounded-[24px] bg-white/55`, shadow `0 12px 32px -18px rgba(0,0,0,.5)`, hidden `aria-hidden`) with subject "Updated departure time and seat assignment for your flight", avatar 36px, "Pacific Airlines", "9:41 AM", body: "Hi Diego,\n\nYour Pacific Airlines flight has a new departure time: Thursday at 7:45 PM.\nSeat assignment: 2A\n\nYour boarding pass is now available. Please download it before arriving at the airport, and be sure to check your flight status again before heading to the terminal.\n\nThank you for flying with Pacific Airlines.\n\nSafe travels,\nPacific Airlines Customer Care" (max-h 22rem, gradient fade `pb-16`). Final geometry/timing: see `desktop-1440-10-search.png`, `-11-notifications.png`.
  * Stage mapping (desktop 1440 stops): compose_intro (B0: phone peeks in bottom of surface-colored card, "Be here now" hidden), compose_record (B1: red full-bleed, phone raised, caption 1... note screenshot 06 shows the dictation caption because the B=1/2 transitions overlap while scrolling instantly), compose_drafted (B2/3), low_importance (B3/4), deck_empty (B4, "Be here now" visible), search (B5), notifications (B6).
  Verify state-to-stop mapping with the screenshots; `useScrollProgress(ref,7)` yields 0..6 with 6 steps of `(height - vh)/6` = 900 px at 1440x900.

### 5.5 Footer (stop `footer`)
`footer.section-frame.min-h-dvh.snap-start` (+ bottom bar `div.mx-6.mb-0.snap-end.md:mx-10`).
* Content: `flex flex-1 flex-col items-center justify-center gap-8 px-6 md:px-10` (max-md min-h calc(100dvh - 96px)).
  * h2 (md+): logo glyph (`FooterHeadline`; `inline-flex translate-y-[0.1em]` wrapper, `mr-3 inline-block h-[0.85em]` svg, 69x54 at 1440) + "Avec is available for\nfree on the App Store." (`whitespace-pre-line`, text-center, max-w 735, pt 16). Mobile version: logo `type-display-footer h-[1.2em]` above 2 `block whitespace-nowrap` lines. `desktopLaunchHeadline` ("Avec is available to\ndownload for free.") exists but is not shown here (desktopLaunch false).
  * Buttons row (`md:-mt-4` when height>700): "Get early access" (TestFlight link, 242x64) + "Get notified" (button 198x64, Outlook+Android icons ~17px).
  * Reviews carousel (`-mx-10 md:mx-0 pt-4 md:pt-10 self-stretch`; viewport 1328x204 at (56,500)): `div.relative.cursor-grab.touch-pan-y.select-none.overflow-hidden.active:cursor-grabbing` with CSS `mask-image: linear-gradient(to right, transparent 136px, black 416px, black 912px, transparent 1192px)` (computed by JS: transparent..black ramps of 280px around the center card), `ul.flex.w-max.gap-8.md:gap-12` (48px) of `li.w-[320px].md:w-[400px].shrink-0` cards (`article.relative.flex.w-full.flex-col.gap-1.text-black/50`): h3 title; row `flex flex-wrap items-center gap-x-3 gap-y-1` with 5 stars (20px, `text-black opacity-50`, `-mr-0.75` overlap) + author; body paragraph. List repeats the 6 reviews `u` times (min 3, computed from width) and sr-only `<ul>` mirrors for a11y.
  Behaviour: translate3d to center card index; auto-advance every `pauseMs=5000` after each move; move duration = `max(220ms, distance / 800px/s)` with `cubic-bezier(.4,0,.2,1)`; paused while hovering; infinite wrap by silently re-basing index after transition; pointer drag (6px threshold, horizontal vs vertical intent) with snap to nearest, release allows up to 5 cards jump. `ResizeObserver` recomputes. Initial translate centers card index `d` (=6).
  Reviews (title / author / body / stars 5):
  1. "Way better than Gmail!" / soda_cowboy / "I can’t believe how smooth this app runs. Really terrific ai integration too. Excited to see how it develops."
  2. "Fast, thoughtful, and delightful" / JamesL55 / "I’ve been using Avec throughout the beta, and it quickly became my default email app. The experience is fast, focused, and thoughtfully designed in a way that makes other email apps feel slow by comparison. This is one of the few email apps that actually makes email feel lighter."
  3. "The only way to handle email" / evntylr / "Email has always been awful. I monitor 8 email accounts, and it sucks. I have tried every single product in the category, and Avec is the very first that has actually made a difference; I don’t think I can go back to regular email. I can’t wait to see what is next from the Avec team!"
  4. "The best email app" / BUGGSSSSSS!!!!! / "Avec makes managing your inbox insanely easy. Some of my favorite features are notifications that include a really accurate summary so a new message is glanceable and the ability to speak when drafting or searching."
  5. "Smoothest emailing experience" / Rudraksh Awasthi / "With all the emailing apps stuck in 2015, avec makes that experience smoother and more modern. Love the miscellaneous emails at the end of the stack and the most convenient unsubscribe feature."
  6. "Hate managing email? Me too!" / Vahwdsss / "Avec has saved me so much time managing email. It’s easily the best email app out there and I’ve tried them all. I’m sure Superhuman wishes they were Avec."
* Bottom bar: 1px rule `bg-black/10`, then `type-caption` row (py 22px at md): "Copyright © 2025-2026 Nearly Extraterrestrial Technology, Inc." left; right: links X (https://x.com/avec), YouTube (https://www.youtube.com/@avecmail), Instagram (https://www.instagram.com/avecmail/), LinkedIn (https://www.linkedin.com/company/avec-ai), hi@avec.ai (mailto:hi@avec.ai), a "·" separator, Terms of Service (/terms), Privacy Policy (/privacy-policy); link gap 24px (`md:gap-6`). Measured at 1440: copyright x56, links end at x1384 (container padding 56 = footer `px` 24+...). Links: `hover:underline`? (utility `.hover\:underline` exists, `.hover\:text-black`) Treat links as hover:underline.

### 5.6 Get notified modal
Opens on "Get notified" buttons. Portal `fixed inset-0 z-50 flex items-center justify-center px-4` overlay `bg-black/50 backdrop-blur-sm` (200ms), card `max-w-sm rounded-[28px] bg-background p-6 pt-8 md:p-8 ring-1 ring-black/10 gap-6` entering `scale-75 opacity-0 blur-2xl` -> `scale-100 opacity-100 blur-0` (200ms ease-out/in). Icon 48px, title "Get notified" (text-lg 500 tight), sub "We’ll email you when Avec is available for more platforms", email input (`rounded-xl bg-white px-3 py-3`, placeholder "you@example.com", shadow `0 0 0 1px rgba(0,0,0,.06)`), submit (`rounded-xl bg-brand px-4 py-3 text-white font-medium`, hover brand-alt, loading spinner, error state, success "You're on the list!"). Esc closes. Android variant text: "Get notified for Avec on Android" / "We’ll email you when Avec launches on Android". Also a "Scan with your iPhone" / "Send link to your phone" QR flow exists for Mac visitors (not shown on this desktop session).

### 5.7 Fixed UI: ScrollProgressDots and ScrollHint
* Dots: `fixed top-1/2 -translate-y-1/2 translate-x-1/2 right-2 (>=1220px: right-6) z-50 p-2 flex-col`, hidden < md. 13 buttons (`py-0.5`), each a `size-1.5` (6px) `rounded-[3px]` span with `backdrop-invert saturate-0 brightness-1000` (inverts what is behind, so it reads on any bg), opacity 1 for passed dots, 0.1 + 0.9*fraction for the next, 0.1 for later ones (`opacity-10`). On hover of the group every dot grows to `w-4 h-2.5`; hovered dot goes `opacity-50`. Positions measured at 1440: x1413, y385 + 10px pitch. Click `scrollTo(stop.top, instant)`. Arrow Up/Down keys step to prev/next stop with smooth scroll.
* Tooltip on hover: 200px wide rounded-xl image preview (`frame-NN` images, 1440x900 PNGs, `ring-1 ring-black/5 shadow-lg bg-background`), `absolute right-full mr-2`, scale .75 / blur-lg / opacity 0 -> 1 / scale 1 / blur 0 in 120ms (ease-out in, ease-in out). `default` list uses the first set of 13 frames; `desktopLaunch` the second.
* Scroll hint: fixed `top-[78px]` centered, `hidden md:flex`, text "Scroll or use [↑][↓] to page through this site", opacity 0 -> 1 (500ms) after 5s of no scrolling when not on stops hero/triage_game/compose_record/search/notifications/footer; hides (150ms) on any scroll; `animate-float` (2s ease-in-out infinite, translateY 2px <-> -2px).

## 6. Keyframes (verbatim)

```css
@keyframes expand{0%{background-color:var(--color-brand);height:calc(50% - 4px)}to{background-color:var(--color-accent-green);height:100%}}
@keyframes bg-pulse{0%{opacity:0}33%{opacity:1}to{opacity:0}}
@keyframes fade-in{0%{opacity:0}to{opacity:1}}
@keyframes float{0%,to{transform:translateY(2px)}50%{transform:translateY(-2px)}}
@keyframes card-enter{0%{opacity:0;filter:blur(32px);transform:scale(.75)}to{opacity:1;filter:blur();transform:scale(1)}}
@keyframes countdown-pop{0%{opacity:0;transform:scale(.5)}30%{opacity:1;transform:scale(1)}90%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}
@keyframes float-up-fade{0%{opacity:1;transform:translateY(0)translate(0)rotate(0)scale(.1)}10%{transform:translateY(-4px) translateX(calc(var(--float-dx,0px) * .1)) rotate(calc(var(--float-rot,0deg) * .1)) scale(1)}50%{opacity:1}to{opacity:0;transform:translateY(-40px) translateX(var(--float-dx,0px)) rotate(var(--float-rot,0deg)) scale(1)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes pulse{50%{opacity:.5}}
.animate-bg-pulse{animation:.5s ease-out forwards bg-pulse}
.animate-card-enter{animation:.8s cubic-bezier(.16,1,.3,1) both card-enter}
.animate-countdown{animation:.9s ease-out forwards countdown-pop}
.animate-float{animation:2s ease-in-out infinite float}
.animate-float-up-fade{animation:1s cubic-bezier(0,0,0,1) forwards float-up-fade}
```

Transition inventory: buttons `transition-transform .12s` + `active:scale-[.97]`; `hover:bg-surface-alt` (no explicit duration on bg, default .15s); word reveal `color .12s`; hero waves `opacity 1s`; expand-section clip/bg `500ms cubic-bezier(.4,0,.2,1)`; phone `500/600ms cubic-bezier(.645,.045,.355,1)`; captions `opacity 150ms`; search headlines `all .4s` (+.1s delay); "Be here now" `all .5s` (+.5s delay first reveal); emailstack cards `transform, opacity` 300ms (150ms when rapid), easing `cubic-bezier(.1,.3,1,0)` for exit / default `c` for others, delay `round(.06*duration)ms`; dots tooltip 120ms.

## 7. Assets inventory (local paths)

All under `/Users/riyaghosh/V3/avec/public/` (serve from `/assets/...` and `/fonts/...`).

Fonts (`public/fonts/`): `GT_Standard_VF-s.p.1bb_t6o__k212.woff2` (520 KB), `83afe278b6a6bb3c-s.p.45535valc9rzk.woff2` (48 KB latin), `1bffadaabf893a1e-s.0szrwpqb9mkwe.woff2` (85 KB latin-ext), `2c55a0e60120577a-s.03ez25a9g3i0n.woff2` (cyrillic-ext), `9c72aa0f40e4eef8-s.3i9rha7jpxn0q.woff2` (cyrillic), `ad66f9afd8947f86-s.2o7ko1d-5m1xu.woff2` (greek-ext), `5476f68d60460930-s.1ee5w62fj497l.woff2` (greek), `2bbe8d2671613f1f-s.1way2z9fj6cig.woff2` (vietnamese).

Video (`public/assets/`): `hero-triage.mp4` (2.5 MB, 1:1), `hero-waves.mp4` (2.8 MB), `phone-demo.webm` (4.3 MB, VP9 alpha), `phone-demo.mov` (5.0 MB, HEVC alpha), `wave_desktop.webm`, `wave_desktop_hevc.mp4`, `wave_mobile.webm`, `wave_mobile_hevc.mp4`. Posters (webp): `hero-triage-poster.webp`, `hero-waves-poster.webp`, `phone-demo-poster.webp`, `wave_desktop-poster.webp`, `wave_mobile-poster.webp`.

Images: `avatars/` coach-marcus, nina-park, dana-chen, dropbox, tomas-reyes, pacific-airlines, riverside-elementary, pilates-pass, jordan, the-gist, pacific-gas-electric, sara-chen-ramirez (all 108x108 png, rendered at 36px round; Next serves at w=48/96). `testflight.png` (512x512, rendered 20/24px, radius 6px). `square-logo-195.png` (195x195; used by the FooterHeadline/Mac flow; `/_next/image w=256`). `frames/frame-01..13.*.png` (1440x900 section previews for the dots tooltip; two sets, first hash = default set, second = desktopLaunch). `frame-01.png` (copy of `frame-01.057mo71r_kzoc.png`).
Icons/SVG: `avec-logo.svg` (650x160, currentColor), `outlook-icon.svg` (272x258 gradients), `android-icon.svg` (24x24, fill #03ce4c), `app-store-wordmark.svg` (88x17 apple glyph + "App Store", currentColor), star svg is inline in `0rp2cat0iqwyz.js` (24x24 path; partial star via clipPath `rect x=3.32 width=17.35*score`). Other inline icons (reply arrow, check, later clock, search, pause/play/replay) are in the beautified JS (`36354` module `AvecLogo`, `SearchIcon`; pause/play/replay paths at ~line 360 of `0rp2cat0iqwyz.js`).
Meta: `favicon.ico` (45 KB), `apple-icon.png` (180x180), `opengraph-image.png` (1200x630), `manifest.webmanifest`.
Network at load: 3 posters, 3 videos (hero-triage, hero-waves, phone-demo `206` range requests), 6 avatar images, frame-01 `_next/image`. Third-party: PostHog (`i.net.inc/array/phc_V2f5BmpZvhtc1HHqWcJhVVkoC6eBfA9hSz4eucrAyIE/config.js`, `/flags`, `/e`, dead-clicks-autocapture, surveys, web-vitals) - skip in the clone.

## 8. Hover / active / focus / pointer states

* Buttons (header/hero/footer CTAs, game): `hover:bg-surface-alt` (#edecea) via `@media (hover:hover)`; `active:scale-[0.97]`, `transition-transform duration-120`.
* Notify submit: `hover:bg-brand-alt` (#226ef4), `disabled:hover:bg-brand`.
* Dots: group hover widens all dots (w 6 -> 16px, h 6 -> 10px, `transition-[height,width]`), hovered dot opacity .5, tooltip appears.
* Game intro card: `pointer-fine:group-hover:scale-102`; overlay `transition-[backdrop...]` dims on hover.
* Carousel: cursor grab / grabbing; hover pauses auto-advance.
* Footer links: `hover:underline`, `hover:text-black` utilities present in CSS.
* "Be here now": cursor pointer, keyboard Enter/Space activates.
* Focus: input `focus-visible:shadow-[0_0_0_1px_rgba(0,0,0,.12)]`.

## 9. Scroll mechanics summary (what Build must replicate)

1. `main` is the scroll container (`h-dvh overflow-y-auto`, CSS scroll-snap `y mandatory` on touch, `proximity` for `pointer: fine`). Stops are `[data-section-name]` elements; `--stop-anchor` custom prop can offset a stop. `getScrollStops(root)` = offsetTop (relative to root) minus anchor, clamped to `[0, scrollHeight - clientHeight]`.
2. Hero -> deck -> expand -> footer are stacked; deck/expand use `sticky top-0 h-dvh` frames with invisible `h-dvh snap-start` stop spacers beneath.
3. Hooks (copy logic from `53217` module, line ~690 of `0rp2cat0iqwyz.js`): `useScrollApproach(ref, {startAt .5})` -> 0..1 as section top moves from `0.5*vh` to 0; `useScrollFloat(ref, steps, {snap})` -> `-1` before section pins, else `clamp(-top/(height - vh)) * steps`; `useScrollProgress(ref, n)` -> integer `round(frac*(n-1))`. All rAF-throttled scroll listeners on the root (`passive`).
4. Keyboard: ArrowUp/ArrowDown step stops (smooth, queueing against `scrollend`); game uses ArrowLeft/ArrowRight.
5. Reduced-motion: global rule forces ~0 durations.
6. Mobile (<768px): snapping stays mandatory; hero stacks video above text; dots/hint hidden; header shows one button; `--stack-scale` computed so stack = `min(1, .7 * panelHeight / 474)`; many classes switch via `max-md:` and `(max-height: 700px)` queries.

## 10. Known gaps / caveats

* Computed color values are exact for tokens above; sub-pixel positions of the card stack in my 1440 dump were captured mid-animation (cards scaled), so use the CSS/transform formulas in section 5.3 rather than those rects. Static card rect at rest: 320x474 at x888.
* I did not measure the 1280/768/390 layouts of the Expand section, the search/notification cards or the game card beyond the screenshots; their class lists (responsive `md:` variants) are in the saved HTML/CSS and the beautified JS.
* `/terms` and `/privacy-policy` routes were not captured.
* Playwright MCP wrote some working screenshots to `/Users/riyaghosh/V3/heyparker-ai/.playwright-mcp/` (its allowed root); the final copies are in `_reference/shots/`.
