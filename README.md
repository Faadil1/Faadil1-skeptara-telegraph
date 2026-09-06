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
