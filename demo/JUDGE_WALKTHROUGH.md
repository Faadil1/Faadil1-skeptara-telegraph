# Skeptara — Judge Walkthrough

Two real, closed Telegraph challenge runs. The web surface replays captured evidence from those runs; it does not generate fresh Telegraph activity.

## The one-sentence claim

Higher-risk autonomous code changes must survive deeper Telegraph-routed counter-evidence before a protected merge can execute.

## Start here

Live: **https://skeptara.vercel.app**. For the current integration candidate, run locally from `web/` with:

```bash
npm ci
npm run dev
```

Landing page:

![Landing](screenshots/01-landing.png)

The hero resolves a captured challenged case to its real verdict. The `$0.04`, `4 paid calls`, and `1 block · 1 pass` figures are computed in the browser from the two final T4 captured fixtures. They are scoped to those two final cases, not to the broader activity ledger.

## Case 1: challenged PR, real BLOCK

**[Faadil1/Faadil1-skeptara-telegraph#1](https://github.com/Faadil1/Faadil1-skeptara-telegraph/pull/1)** proposed `lodash 4.17.20 → 4.17.21`.

1. **Action snapshot.** Skeptara bound the review to the exact PR, head SHA, base branch, changed file, and dependency change.
2. **Risk assessment.** The deterministic rubric assigned `MEDIUM`, requiring 2 evidence paths under a `$0.02` cap.
3. **Challenge.** A separate auditor made two paid Telegraph `CVE_LOOKUP` calls. The first (`CVE-2026-4800`, SecWire CVE Lookup) returned a substantive record, but the returned shape did not expose a machine-checkable affected range accepted by the auditor, so it did not count toward coverage. The second (`CVE-2026-2950`, SecWire CVE Lookup) showed the target `4.17.21` inside the affected range and normalized to **BLOCKING**.
4. **Verdict.** `BLOCK`, reason `MATERIAL_COUNTER_EVIDENCE_FOUND`. Merge authorization was denied and the merge adapter was called `0` times.

`completed_coverage: 1/2` means one qualifying evidence path from two paid calls. Both paid calls ran and the full `$0.02` cap was spent.

![PR #1 — BLOCK](screenshots/02-case-pr1-block.png)

Source:
- `evidence/t4/pr1-block-run-004/REVIEW.md`
- `evidence/t4/pr1-block-run-004/reviewed-challenge.sanitized.json`
- `evidence/trace/FRONTEND-SETTLEMENT-MATRIX-CLARIFICATION.md`

## Case 2: clean PR, real PASS and real merge

**[Faadil1/Faadil1-skeptara-telegraph#2](https://github.com/Faadil1/Faadil1-skeptara-telegraph/pull/2)** proposed `lodash 4.17.20 → 4.18.1`.

1. The same deterministic rubric assigned `MEDIUM`, with the same 2 required paths and `$0.02` cap.
2. Two paid Telegraph lookups returned concrete records from the routed miners observed in the run. Neither affected range covered `4.18.1`, so both normalized to `ADVISORY` and coverage completed `2/2`.
3. **Verdict:** `PASS`, reason `REQUIRED_COVERAGE_COMPLETE_NO_BLOCKING_EVIDENCE`.
4. **Merge:** the exact reviewed head was revalidated and a real merge was executed under explicit bounded human authorization. Commit [`c76c76e`](https://github.com/Faadil1/skeptara-telegraph/commit/c76c76e0c02dab28275d8e53d70da3f6f132e648) is inspectable on GitHub.

![PR #2 — PASS](screenshots/03-case-pr2-pass.png)

Source:
- `evidence/t4/pr2-clean-run-005/REVIEW.md`
- `evidence/t4/pr2-clean-run-005/reviewed-challenge.sanitized.json`
- `evidence/t4/pr2-clean-run-005/REAL-MERGE-EXECUTION.md`

## ESCALATE

`ESCALATE` is the fail-closed third outcome for incomplete required coverage, unavailable evidence sources, budget exhaustion before enough qualifying evidence is collected, or critical ambiguity. Earlier development runs exercised this path. Neither of the two final T4 cases ended in `ESCALATE`, so the judge surface does not fabricate a third final case.

## What to verify as a judge

- The landing page presents the two final T4 outcomes immediately: PR #1 `BLOCK`, PR #2 `PASS`.
- PR #1 shows the actual call order: `CVE-2026-4800 → AMBIGUOUS`, then `CVE-2026-2950 → BLOCKING`.
- Four final T4 evidence rows correspond to four separate paid calls and four distinct Base Sepolia settlement transactions.
- Coverage is shown separately from payment count.
- The case pages are labeled **CAPTURED LIVE · HISTORICAL REPLAY** and Replay changes presentation state only.
- The PR #2 merge link points to the real historical merge commit.
- The web candidate contains presentation/replay code only. Risk policy, auditor, Telegraph payment runtime, and merge-gate authority remain in the root product implementation and canonical evidence chain.

## Claim boundary

"Independent challenge" refers to the separation between proposer, deterministic risk authority, auditor, and protected merge gate. Skeptara does not claim statistical or model-level independence between Telegraph miners.
