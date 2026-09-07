# Skeptara — Telegraph Track 3

**Independent counter-evidence before autonomous execution.**

Skeptara is a Telegraph Protocol Track 3 application that prevents an autonomous GitHub merge from executing until an independent challenge has completed. Verification effort scales with externally assigned downside: higher-risk changes require a larger paid counter-evidence budget and broader Telegraph evidence coverage.

## Core mechanism

`PR proposed → deterministic risk tier → independent Telegraph challenge → PASS/BLOCK → real GitHub merge gate`

The coding agent does **not** score its own risk and does **not** audit itself. Material counter-evidence, incomplete required coverage, or exhausted verification budget causes a fail-closed `BLOCK/ESCALATE` outcome.

## Product and execution sources

- Living product source: `product/PRD.md`
- Canonical project state: `state/CURRENT.yaml`
- Conversation/runtime handover: `state/HANDOVER.yaml`
- Derived Spec Kit artifacts: `spec-kit/`
- Architecture and decision records: `docs/`
- Evidence: `evidence/`

## Current gate

See `state/CURRENT.yaml` for the exact authoritative gate. The first technical proof is `SKEPTARA_T0_REAL_TELEGRAPH_CHALLENGE`.

No UI polish or protected GitHub merge execution is considered build-ready until T0 proves a real Telegraph miner call and paid challenge path without mocked intelligence.

## Safety / protected actions

- No private keys or payment secrets in browser code, commits, issues, logs, or chat.
- Telegraph/x402 wallet material stays local or server-side only.
- GitHub writes are restricted to explicitly allow-listed test repositories/PRs during the demo.
- No external merge is executed unless the independent challenge gate passes and the action is within the approved demo scope.

## Operating model

Skeptara follows the existing living-PRD → Spec Kit-derived execution → evidence → design assurance → terminal assurance path. The PRD remains the canonical product-intent source and evolves when material product learning is approved; code must not silently become the product source.

## Frontend

`web/` — a Vite + React + TypeScript app rendering the judge path (risk → challenge → verdict) for the two real closed runs below. See `docs/DESIGN.md` for the visual system and `demo/JUDGE_WALKTHROUGH.md` for the judge-facing walkthrough with screenshots.

```
cd web && npm install && npm run dev
```

## Real vs. mock

Every field the frontend renders comes from `docs/FRONTEND_DATA_CONTRACT.md` and is sourced from two **real, closed** T4 challenge runs — not a live stream, not simulated:

- **PR [#1](https://github.com/Faadil1/Faadil1-skeptara-telegraph/pull/1) (challenged, `BLOCK`)** — `evidence/t4/pr1-block-run-004/reviewed-challenge.sanitized.json`. Real Telegraph `CVE_LOOKUP` call, real miner (`SecWire CVE Lookup`), real signal hash, real $0.01 x402 settlement on Base Sepolia, real `CVE-2026-2950` finding. Merge denied, 0 merge-adapter calls made.
- **PR [#2](https://github.com/Faadil1/Faadil1-skeptara-telegraph/pull/2) (clean, `PASS`)** — `evidence/t4/pr2-clean-run-005/reviewed-challenge.sanitized.json`. Two real Telegraph calls, real settlements, real advisory (non-blocking) findings. Real merge executed under explicit human-bounded authorization, commit [`c76c76e`](https://github.com/Faadil1/Faadil1-skeptara-telegraph/commit/c76c76e0c02dab28275d8e53d70da3f6f132e648).

The frontend replays these two closed runs with paced loading states for legibility (each case page moves through `assessing risk → challenging → verdict` on load) — this is a **replay of recorded evidence**, labeled as such in the UI with a `replay` control, never presented as a live call in progress.

Per the PRD (`product/PRD.md` §"No placeholders"), no submission intelligence is mocked: no fabricated hash, cost, miner, or finding appears anywhere in the UI. When a contract field is null or missing, the UI shows an explicit fallback (e.g. "not exposed", "none flagged") rather than inventing a value. The only synthetic case ever created — a null/edge-field stress fixture used during frontend quality testing — was local-only and removed before this build; the repository history and this README are the record of that.

No real Skeptara run has produced an `ESCALATE` verdict yet. The landing page states this directly instead of fabricating a third case to look complete.
