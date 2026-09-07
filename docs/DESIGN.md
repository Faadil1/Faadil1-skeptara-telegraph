# Skeptara — Frontend Design

## Surface modes
- **Landing** (`/`): Persuade — one thesis, two real proof cases, one honest gap (ESCALATE).
- **Case page** (`/case/:id`): Operate — a judge scanning risk → evidence → verdict, state-driven.

## Visual thesis
A terminal that makes an independent challenge legible in real time. Confident, factual,
slightly editorial — closer to an incident report than a product marketing page. Influences:
BitSentry's terminal-card grammar and stat ticker, Telegraph's confident display type and
prize/stat-box treatment — reinterpreted in Skeptara's own copper/near-black identity, not a
reskin of either. No purple, no decorative gradients, no fabricated data anywhere the ticker
or evidence log could instead show a real number from a closed run.

## Typography
- **Display** (`Fraunces`, serif, variable): hero thesis, section titles, case page `h1`.
  One role only — the moment the page needs authority, not decoration.
- **Mono** (system stack): all data — SHAs, hashes, stats, nav, panel eyebrows, the wordmark.
  This is the "terminal" identity; it should never feel decorative, only factual.
- **Sans** (system stack): body copy, paragraph explanations.

## Color
Near-black ground (`--bg #0a0b0d`), copper/amber brand accent (`--accent #d98a4a`) — distinct
from BitSentry's green. Verdict colors are semantic, not brand: `--pass` (muted green),
`--block` (muted red), `--escalate` (amber), `--pending` (grey). 3 radii total (`sm` chips,
`md` cards, `full` pills).

## Components
- `Panel` — numbered section container (`1 · proposed action`, etc.) — the numbering is real
  sequence, not decoration.
- `VerdictBadge` — PASS/BLOCK/ESCALATE/PENDING, color + dot, never color alone.
- `EvidenceLog` — real per-item evidence with an explicit "stopped early" vs "incomplete"
  distinction depending on why coverage fell short.
- `Skeleton` — real loading state for every async-shaped moment (paced replay of a closed run).
- Landing ticker strip — BitSentry-style stat row, but every number is computed live from the
  real closed-case fixtures (`total spend`, `evidence calls`, `block/pass count`), never
  hardcoded market-style filler.

## States
Each case page runs a real phase sequence: `reading action → assessing risk → challenging
(evidence appears one at a time) → verdict`. This is a paced replay of a closed run, labeled
as such, with a `replay` control — never presented as a live call in progress.

## Responsive
Hero headline uses `clamp()` to stay legible at 375px; case-page header wraps to two rows on
mobile without overlap; nothing scrolls horizontally.

## Anti-patterns avoided
No purple/blue gradients, no glow, no glassmorphism, no cards-inside-cards, no ALL-CAPS
tracked eyebrows (labels stay lowercase mono, matching the terminal identity), no fabricated
evidence/metrics, no decorative marquee of invented data (BitSentry's scrolling agent-name
ticker was deliberately not copied — Skeptara has no equivalent real data to fill it with).

## References
- BitSentry (bitsentry.vercel.app) — terminal-card chrome, stat ticker structure.
- Telegraph Protocol hackathon page — display type confidence, stat/prize-box treatment,
  eyebrow-label rhythm (adapted to lowercase mono, not tracked-out caps).
- `docs/FRONTEND_DATA_CONTRACT.md` — the only source for what a screen may render.
