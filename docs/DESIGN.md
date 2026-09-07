# Skeptara — Frontend Design

## Surface modes
- **Landing** (`/`): Persuade — one thesis, two real proof cases, one honest gap (ESCALATE).
- **Case page** (`/case/:id`): Operate — a judge scanning risk → evidence → verdict, state-driven.

## Visual thesis
Matched to BitSentry's terminal-green identity by explicit direction: italic display
wordmark with a soft radial glow, dot-grid ground, terminal-card chrome with colored
traffic-light dots, a 3-up real-data stat row, and a diagonal marquee band — the same
structural grammar as BitSentry (bitsentry.vercel.app) and, for type confidence, the
Telegraph Protocol hackathon page. Content, copy, product name and every number stay
entirely Skeptara's own — nothing here claims to be BitSentry or reuses its assets.

## Typography
- **Display** (`Playfair Display`, italic 900 for the wordmark, upright 600/700 for
  section/page titles): the one deliberately decorative role, reserved for the hero mark
  and headings.
- **Headline sans** (`Space Grotesk`, 700): the bold tagline under the wordmark and the
  nav wordmark/CTA — mirrors BitSentry's heavy sans pairing against the italic script.
- **Mono** (system stack): all data — SHAs, hashes, stats, nav links, panel eyebrows,
  terminal body. This is the factual/terminal register; never decorative.
- **Sans** (system stack): body paragraphs.

## Color
Near-black green-tinted ground (`--bg #070b09`), one accent green (`--accent #35d07a`)
matched to BitSentry's brand green and reused as the semantic PASS color (mirrors
BitSentry's own approved/green-everywhere treatment). BLOCK stays red, ESCALATE stays
amber — the only colors that must read as distinct from the brand accent. Radial glow
(`--accent-glow`) is reserved for the hero wordmark only, not used elsewhere as decoration.

## Components
- `Panel` — numbered section container (`1 · proposed action`, etc.) — real sequence.
- `VerdictBadge` — PASS/BLOCK/ESCALATE/PENDING, color + dot, never color alone.
- `EvidenceLog` — explicit "stopped early" vs "incomplete" framing for partial coverage.
- Terminal card — traffic-light dots (red/amber/green), title-bar label, command + output.
- 3-up stat row — BitSentry's ticker grammar, but every value is computed live from the
  real closed-case fixtures (total spend, evidence calls, block/pass count) — never
  fabricated market-style filler.
- Diagonal marquee band — BitSentry's scrolling-strip grammar, populated only with real
  identifiers actually present in the closed runs (miner names, Telegraph intents, policy/
  auditor versions, case outcomes). No invented agent/module names.

## States
Each case page runs a real phase sequence: `reading action → assessing risk → challenging
(evidence appears one at a time) → verdict`. This is a paced replay of a closed run, labeled
as such, with a `replay` control — never presented as a live call in progress.

## Responsive
Wordmark and tagline use `clamp()` to stay legible at 375px; 3-up stat row and marquee
collapse/adjust on mobile; nothing scrolls horizontally.

## References
- BitSentry (bitsentry.vercel.app) — primary visual reference by explicit direction:
  green identity, glow, dot-grid, terminal card, stat ticker, diagonal marquee.
- Telegraph Protocol hackathon page — display type confidence, stat/prize-box treatment.
- `docs/FRONTEND_DATA_CONTRACT.md` — the only source for what a screen may render.
