# POIS Influence-Strategies Questionnaire (שאלון אסטרטגיות השפעה)

Mobile web questionnaire for an NGG workshop with deputy regional managers (סגני מנהלי מרחבים).
Digital version of the POIS paper questionnaire (Kipnis & Schmidt): 26 statements, 1–5 frequency scale,
six influence tactics, percentile norms → a private influence profile.

**Status:** design approved as a working prototype (card-deck flow, NGG brand). Scoring key and norms
are transcribed from the original sheets and covered by tests. Next step: repo + GitHub Pages deploy,
then real-device QA. See "Tasks" below.

## Run locally
No build step, no dependencies.
```
python3 -m http.server 8000      # then open http://localhost:8000
node tests/scoring.test.js       # scoring tests
```
Review states for screenshots: `?review=1#deck`, `?review=1#done`, `?review=1#results` (never written to storage).

## Deployment
`.github/workflows/pages.yml`: tests on every push/PR; on `main` it publishes only `index.html`, `css/`, `js/`,
`assets/` to GitHub Pages (Settings → Pages → Source: GitHub Actions). `index.html` carries a CSP
(`default-src 'none'`, own files only, `connect-src 'none'`) and `noindex`: no inline `<script>`/`style=""`
attributes (set styles via `element.style`), no external URLs, or the page breaks.

## Structure
```
index.html            markup: intro → deck → results (three <section class="screen">)
css/styles.css        all styling; colour tokens on :root, dark-mode overrides
js/scoring.js         SCORING_KEY, NORMS, score/pct/level  (window.POIS + module.exports)
js/app.js             items text, tactic descriptions, deck flow, results rendering
assets/               Assistant font (4 weights, local), NGG compact logo
tests/scoring.test.js locks key + band cut-offs to the original sheets
.github/workflows/    pages.yml: test, then deploy to GitHub Pages from main
docs/reference/       photos of the original scoring / norms / styles sheets (git-ignored, local only)
docs/screenshots/     approved look at 390×844 and 375×667, light + dark
PRODUCT.md            product context
```

## Locked decisions (do not change without the NGG project owner)
- **Brand:** NGG house brand. Light metallic-grey ground, white cards with silver hairline, Assistant,
  graphite ink. Magenta (`--accent #ec2a8c`) only on: the selected answer, primary CTA, the card's top
  tick, and the top tactic on the results. No blue. No client marks.
- **Flow:** card deck. Statement card on a visible stack; choosing an answer slides the card off and the
  next rises from the stack; "לכרטיס הקודם" brings it back with the previous answer marked. No progress
  bar; the counter `07 / 26` and the thinning stack show progress.
- **Content:** item wording and order exactly as in the original (norms were built on that order).
  Masculine phrasing as in the source. Hebrew RTL throughout.
- **Privacy:** results are seen by the participant only. Answers live in `localStorage`
  (`ngg-pois-v1`) so a locked phone can resume; nothing is sent anywhere. No backend, no analytics,
  no external requests.
- **Context:** filled on the participant's own phone during the session; one-thumb use, 44px+ targets.

## Scoring (source: docs/reference/scoring-sheet.jpg, norms-sheet.jpg)
| Tactic | id | Items | Range | Low | Mid | High |
|---|---|---|---|---|---|---|
| פנייה מעלה | up | 7, 10, 12, 22 | 4–20 | ≤5 | 6–7 | ≥8 |
| קואליציות | coal | 1, 21 | 2–10 | ≤3 | 4–5 | ≥6 |
| הפעלת לחץ (תקיפות) | press | 4, 8, 14, 18, 24 | 5–25 | ≤9 | 10–13 | ≥14 |
| מיקוח | barg | 5, 9, 16, 23, 25 | 5–25 | ≤8 | 9–11 | ≥12 |
| פנייה לרגש | emo | 2, 6, 11, 13, 17, 19 | 6–30 | ≤14 | 15–18 | ≥19 |
| פנייה לשכל (היגיון) | reason | 3, 15, 20, 26 | 4–20 | ≤12 | 13–15 | ≥16 |

- Bands follow the thick lines on the norms sheet: below the 30th percentile = נמוך, 30th–70th =
  בינוני, 70th and above = גבוה.
- `NORMS` stores each tactic as percentile bins `[from, to, slots]`, slots ascending, as printed.
  The level is exact; the marker position *inside* a bin is an interpolation by rank in that bin.
- Results show level + raw score ("14 מתוך 25"). The tactic(s) with the highest percentile are
  highlighted in magenta (ties all highlighted).
- Any change to `js/scoring.js` must keep `node tests/scoring.test.js` passing.

## Tasks
1. **Repo + deploy.** Repo `NGG-Global/NGGimpactstrategies` (public; publication approved by the
   project owner). Pages workflow added. Remaining: merge to `main`, set Pages source to GitHub Actions.
   Keep `docs/reference/` out of the repo (in `.gitignore`). This repo is public: keep client names,
   staff names and commercial or licensing matters out of every committed file.
2. ~~Remove the review hooks~~ Done: gated behind `?review=1`; review mode never writes to `localStorage`.
3. **Real-device QA** (iPhone Safari + Android Chrome): safe areas and notch, one-hand reach of the
   five answer buttons, resume after locking the phone mid-deck, back button on card 1 and on the
   final card, dark mode, very small screens (375×667), `prefers-reduced-motion`.
4. **Hand-check one profile** against the paper form (fill both, compare the six sums and bands).

## Open items (waiting on NGG — don't resolve on your own)
- Coalitions description: source says "הסמכה"; the app shows "הסכמה" (likely typo). Needs confirmation.
- Minor copy fixes already applied: "התומכות" → "התומכים", "סימפאטיה" → "סימפטיה", "כלפי" → "כלפיי";
  example phrases of items 2, 5, 19 shown on a second line under the statement.
- Gender-neutral wording or a gender choice at the start: not decided; keep masculine for now.

## Don't
- Don't reorder, merge or reword items; don't add a progress bar, confetti, or score "grades".
- Don't add network calls, trackers, CDNs or fonts from Google; everything stays local.
- Don't spread magenta beyond the four uses listed above.
