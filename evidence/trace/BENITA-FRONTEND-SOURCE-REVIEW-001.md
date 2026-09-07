# Skeptara — Benita Frontend Source Review 001

Status: **HOLD — BOUNDED CLAIM/DATA FIXES BEFORE TRACE VISUAL PASS**  
Date: 2026-09-07 UTC

## Scope

Review of the deployed frontend source on `feat/frontend-benita` and its judge walkthrough after the human shared `https://skeptara.vercel.app/`.

The live Vercel page could not be rendered by the available fetch path, so this is **not** a pixel-level visual PASS. It is a source/claim/data review of the exact collaborator branch that contains the Vite/React frontend and deployment assets.

## Strong parts

- Clear judge path: landing -> two real cases -> case replay -> verdict/merge consequence.
- Real proof identifiers are surfaced instead of invented telemetry.
- Replay is explicitly framed as closed historical evidence rather than a fresh authorization.
- PASS/BLOCK/ESCALATE semantics are represented.
- Exact head SHA and real merge commit are surfaced.
- Frontend code is isolated under `web/`; no backend risk/auditor/merge-gate code was modified by the collaborator branch at review time.
- Responsive/accessibility intent is present in source (semantic labels, responsive CSS, color + text verdicts).

## P0 correctness fixes

### P0-1 — PR #1 chronology / early-stop narrative is currently wrong

Captured live run 004 executed **two paid calls** and spent the full MEDIUM cap `20000/20000` atomic USDC:

1. `CVE-2026-4800` -> `AMBIGUOUS` / not coverage;
2. `CVE-2026-2950` -> `BLOCKING` -> final `BLOCK`.

Therefore the frontend must **not** say that blocking evidence was found on the first paid/completed path and that Skeptara stopped before spending the remaining budget.

`completed_coverage: 1/2` means only one path counted as meaningful coverage, not that only one paid call happened.

Affected source:
- `web/src/routes/Landing.tsx` FAQ and case summary;
- `web/src/components/EvidenceLog.tsx` BLOCK coverage note;
- `demo/JUDGE_WALKTHROUGH.md` PR #1 narrative;
- `web/src/data/cases.ts` evidence item order.

Required correction: show actual chronology — ambiguous first path, blocking second path, full `$0.02` spent, final coverage `1/2`, outcome `BLOCK` because material counter-evidence was found.

### P0-2 — settlement data is reduced/incomplete in frontend fixtures

All four final T4 evidence items were separate paid Telegraph calls and all four raw live records contain distinct successful x402 settlement transactions.

Canonical matrix:
`evidence/trace/FRONTEND-SETTLEMENT-MATRIX-CLARIFICATION.md`

Required correction in `web/src/data/cases.ts`:
- restore PR1 CVE-2026-4800 miner `7336`, signal hash, settlement success and tx;
- keep PR1 CVE-2026-2950 tx;
- restore both PR2 settlement transaction hashes;
- order PR1 evidence items in actual execution order.

Generic schema may keep `settlement_transaction` nullable for future payloads; the four final T4 items are verified and displayable.

### P0-3 — ESCALATE copy overclaims history

Current copy says no real Skeptara run has hit `ESCALATE` yet. That is false: earlier real development/live runs did resolve or were corrected to `ESCALATE`; they are simply not part of the final two-case T4 demo.

Required wording:
> Neither of the two final T4 cases resolved to ESCALATE. Earlier development runs exercised fail-closed ESCALATE behavior, but they are not presented as a third final demo case.

Do not fabricate an ESCALATE card.

### P0-4 — independence wording must respect claim boundary

Current copy uses phrases such as `independently paid counter-evidence`, `more independent evidence`, and `independent challenge` without always defining the scope.

Protected claim boundary:
- independence = constructor/auditor/topology separation;
- **not** proven statistical/model/miner independence.

Preferred public phrasing:
- `Telegraph-routed external counter-evidence`;
- `separately paid evidence paths`;
- `independent challenge layer` only when immediately grounded as component/topology separation.

The hero can remain strong, but avoid implying that the two miners are statistically independent reviewers.

## P1 judge-clarity refinements

### P1-1 — label the `$0.04 / 4 calls` stat scope

The landing stats are correct for the **two final T4 cases**. The broader conservative final-proof activity ledger includes 3 paid challenge runs, 5 paid evidence calls and `$0.05` observed testnet spend.

Add a scope label such as `final T4 two-case proof` so judges do not confuse the landing stat with lifetime/project totals.

### P1-2 — hero terminal should not imply the blocking call was the only/first PR1 call

The current hero compresses PR1 directly to the CVE-2026-2950 blocking path. That is acceptable as a summary only if labeled `triggering evidence` or similar. Otherwise show the real chronology:

`path 1: CVE-2026-4800 -> AMBIGUOUS`  
`path 2: CVE-2026-2950 -> BLOCKING`  
`verdict: BLOCK`

### P1-3 — risk-scaling proof boundary should stay visible

MEDIUM is live-proven in final T4. LOW and HIGH are deterministic policy/test-proven. The current diagram is useful; keep a concise boundary near it so the hero thesis does not imply all three tiers were live-demonstrated.

### P1-4 — historical replay should remain unmistakable on every case route

Case pages already say the source is a real closed run. Keep a persistent `CAPTURED LIVE / HISTORICAL REPLAY` label above the replayed animation so no pacing/skeleton state can be mistaken for a fresh network request.

## Reconciliation rule

`feat/frontend-benita` now contains unique collaborator work and has diverged from `main`.

- never force-move the branch;
- apply the bounded fixes on Benita's branch or reconcile through a normal merge/cherry-pick after review;
- preserve backend product/gate semantics from current `main`;
- include the updated frontend settlement contract during reconciliation.

## Gate result

`BENITA_FRONTEND_SOURCE_REVIEW_001 = HOLD_BOUNDED_FIXES`

This is not a product pivot and does not reopen T0-T4. Once P0 fixes are applied and the branch is reconciled normally, run the final TRACE visual review on desktop + narrow/mobile screenshots and then deploy/smoke.
