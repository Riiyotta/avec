#!/usr/bin/env node
// Optional: measures every template node's rendered height at 1440x900 and records it in
// extraction/measured-values.json -> sectionHeights (read by extraction/wrapper_gate.py).
// verify_all.py never runs this (no browser is needed to verify); re-run it after the page changes.
//
// Usage (from design-repo/):
//   PLAYWRIGHT_MODULE=<path-or-specifier of playwright's index.mjs> \
//   BASE_URL=http://localhost:5496/  node extraction/measure_sections.mjs [--write]
//
// BASE_URL is a locally served build of the source page (`vite build --outDir <tmp>` then
// `vite preview --outDir <tmp> --port 5496`). Without --write it only prints. No absolute path is
// stored in this repo: PLAYWRIGHT_MODULE and BASE_URL come from the environment.
//
// Each sectionHeights.sections entry says how its node is found on the page:
//   selector/nth            the element
//   endSelector/endNth/endEdge   optional: height runs from the element's top to the end element's
//                           top|bottom (a node that owns several scroll-stop runways)
//   accountedIn             the node whose block already contains this one (no extra page height)
//   click                   optional selector clicked first (the notify modal only exists once opened)
// inFlow is false for position fixed/absolute and for accountedIn nodes.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const LEDGER = fileURLToPath(new URL('./measured-values.json', import.meta.url));
const modRef = process.env.PLAYWRIGHT_MODULE;
if (!modRef) { console.error('set PLAYWRIGHT_MODULE to the playwright module to import'); process.exit(2); }
const baseUrl = process.env.BASE_URL || 'http://localhost:5496/';
const write = process.argv.includes('--write');

const { chromium } = await import(/^(\/|[A-Za-z]:\\)/.test(modRef) ? pathToFileURL(modRef).href : modRef);
const ledger = JSON.parse(readFileSync(LEDGER, 'utf8'));
const sh = ledger.sectionHeights;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: sh.viewport });
await page.goto(baseUrl, { waitUntil: 'load' });
await page.waitForTimeout(3000); // let the intro motion settle

const out = {};
for (const [key, d] of Object.entries(sh.sections)) {
  if (d.click) { await page.click(d.click); await page.waitForTimeout(600); }
  out[key] = await page.evaluate((d) => {
    const el = document.querySelectorAll(d.selector)[d.nth || 0];
    if (!el) return null;
    const r = el.getBoundingClientRect();
    let h = r.height;
    if (d.endSelector) {
      const e = document.querySelectorAll(d.endSelector)[d.endNth || 0];
      if (!e) return null;
      const er = e.getBoundingClientRect();
      h = (d.endEdge === 'top' ? er.top : er.bottom) - r.top;
    }
    return { heightPx: Math.round(h * 100) / 100, position: getComputedStyle(el).position };
  }, d);
  if (d.click) { await page.keyboard.press('Escape'); await page.waitForTimeout(600); }
}
const pageHeight = await page.evaluate((s) => document.querySelector(s).scrollHeight, sh.pageSelector);
const version = browser.version();
await browser.close();

let missing = 0;
for (const [key, d] of Object.entries(sh.sections)) {
  const m = out[key];
  if (!m) { missing++; console.log('MISSING  ' + key + '  (' + d.selector + ')'); continue; }
  const inFlow = !d.accountedIn && !['fixed', 'absolute'].includes(m.position);
  console.log((inFlow ? 'in-flow ' : 'no-flow ') + String(m.heightPx).padStart(9) + 'px  ' + key);
  if (write) { d.heightPx = m.heightPx; d.position = m.position; d.inFlow = inFlow; }
}
console.log('pageHeight ' + pageHeight);
if (missing) { console.error(missing + ' selector(s) matched nothing; not writing'); process.exit(1); }
if (write) {
  sh.pageHeight = pageHeight;
  sh.measuredOn = new Date().toISOString().slice(0, 10);
  sh.tool = 'playwright chromium ' + version + ' via measure_sections.mjs';
  writeFileSync(LEDGER, JSON.stringify(ledger, null, 2) + '\n');
  console.log('wrote sectionHeights');
}
