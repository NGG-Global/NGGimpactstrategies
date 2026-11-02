# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Mockup first as a single self-contained HTML page (published artifact for approval), then development via Claude Code with deployment on GitHub Pages — same path as NGG's DISC questionnaire. Inferred from that precedent; stated to the user, not contradicted.

## Users
Deputy regional managers ("סגני מנהלי מרחבים") in an NGG management workshop. They fill the questionnaire on their own phone, during the session, in Hebrew (RTL).

## Product Purpose
Digital version of the POIS (Profile of Organizational Influence Strategies, Kipnis & Schmidt) paper questionnaire: 26 behaviour statements rated 1 (never) to 5 (almost always); sums per six influence tactics (upward appeal, coalitions, assertiveness, bargaining, appeal to emotion, appeal to reason), mapped to percentile norms (low / mid / high), shown as a profile with style descriptions. Success: every participant finishes in the session time and leaves understanding their own influence profile.

## Operating Context
Live workshop. Facilitator gives a time slot; participants answer on phones at once, then discuss. Results are seen by the participant only — no facilitator view, no stored personal results. The participant can save their own copy (PNG profile card or A4 PDF), generated on the device and never uploaded.

## Capabilities and Constraints
- 26 items, fixed original order (norms established on it); 5-point frequency scale.
- Item-to-tactic scoring key and percentile norm cut-offs: transcribed from the original POIS sheets (kept internally) and locked by `tests/scoring.test.js`.
- Source text is masculine-only; gender-neutral or gender choice undecided.

## Brand Commitments
NGG house brand: magenta accent on the light metallic grey of the logo; no blue. Light ground. No client marks.

## Evidence on Hand
Source: NGG's Word version of the questionnaire (Oct 2026): instructions, 26 items, six style descriptions. Scoring key and norms: the original paper scoring and norms sheets, kept internally.

## Product Principles
- Finish inside the workshop slot without friction.
- Honest answers over desirable ones: the UI must not hint at a "right" answer.
- Results are a mirror, not a grade: six styles, none better.
- Private by default.

## Accessibility & Inclusion
Hebrew RTL, one-handed phone use, large tap targets, readable in bright rooms.
