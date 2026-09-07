# Skeptara — frontend

Vite + React + TypeScript. Renders the judge path (risk → challenge → verdict) for
Skeptara's two real closed T4 runs. See `../docs/DESIGN.md` for the design system and
`../docs/FRONTEND_DATA_CONTRACT.md` for the field contract this app is bound to.

## Run

```
npm install
npm run dev
```

## Structure

- `src/data/cases.ts` — the two real closed-run fixtures, transcribed from
  `../evidence/t4/*/reviewed-challenge.sanitized.json`. Not sample data.
- `src/data/types.ts` — types mirroring the frontend data contract.
- `src/routes/` — `Landing` and `CasePage`.
- `src/components/` — `Panel`, `VerdictBadge`, `EvidenceLog`, `Skeleton`, `Layout`, `Stat`.
- `src/hooks/useCaseReplay.ts` — paces the reveal of a closed run through real loading
  states (`ASSESSING_RISK` → `CHALLENGING` → verdict); always labeled as a replay, never
  presented as a live call.
- `src/tokens.css` — design tokens (color, type, spacing, radii).

## Build

```
npm run build
```
