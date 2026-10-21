# Avec IA

`ia.json` is the only hand-edited file. `IA.md` and `matrix.csv` are generated; re-run `node validate.mjs && node build.mjs` after editing.

Findings:
- The site is effectively one route (`/`). Its 13 scroll stops come from 16 sections inside a single template. The build effort is almost entirely the home page.
- Only `footer.bar` is shared across templates, and only if the legal routes use it. That is unverified.
- `/terms` and `/privacy-policy` are linked from the footer but were never captured, so `template.legal` is a placeholder.
- The three Expand demos (search, notifications, be-here-now) all live in `Expand.jsx` and share one scroll-state integer.
