# NGG · שאלון אסטרטגיות השפעה (POIS)

Mobile web questionnaire for NGG management workshops: 26 statements on a 1–5 frequency scale,
scored into six influence tactics and shown to the participant as a private profile against percentile norms.

- Hebrew, right-to-left, built for one-handed phone use.
- Static site: no build step, no dependencies, no backend.
- Private by design: answers stay in the participant's browser (`localStorage`) and are never sent anywhere.
  A Content-Security-Policy in `index.html` blocks any outbound request.

## Run locally

```
python3 -m http.server 8000      # then open http://localhost:8000
node tests/scoring.test.js       # scoring key and norm cut-offs
```

Design review states (never written to storage): `?review=1#deck`, `?review=1#done`, `?review=1#results`.

## Deployment (GitHub Pages)

`.github/workflows/pages.yml` runs the scoring tests on every push and pull request.
On `main`, once the tests pass, it publishes only the participant-facing files
(`index.html`, `css/`, `js/`, `assets/`) to GitHub Pages.

One-time setup by a repository admin: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The site address is shown in each deployment run; expected: `https://ngg-global.github.io/NGGimpactstrategies/`
