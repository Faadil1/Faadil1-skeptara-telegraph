# Skeptara — Verified Activity Ledger v0.1

Status: **FINAL-PROOF SUBSET — conservative, evidence-backed only**  
Date: 2026-09-07 UTC

This ledger is intentionally conservative. It aggregates only the final proof subset that is easy to verify from persisted evidence. It does **not** claim total lifetime activity and excludes setup probes, failed funding/setup attempts, discarded evidence-quality experiments, and any unpersisted activity.

## Verified aggregate

- Real paid Telegraph challenge runs in this subset: **3**
- Real paid Telegraph evidence calls in this subset: **5**
- Observed unique routed miners in this subset: **2**
- Observed spend in this subset: **$0.05 testnet USDC**
- Protected challenged actions denied: **1**
- Real exact-head GitHub merges completed after PASS + bounded authorization: **1**
- Mocked/simulated intelligence used for these live proof claims: **0**

## Included runs

### T0 attempt 008 — real Telegraph paid proof

- Paid calls: **1**
- Intent: `CVE_LOOKUP`
- Miner: `20260828` — PREFLIGHT Infrastructure Signals
- Observed cost: **$0.01**
- Evidence: `evidence/t0-real-telegraph/attempt-008/`

### T4 PR #1 challenged case

- Paid calls: **2**
- Risk: `MEDIUM`
- Spend observed: **$0.02**
- Routed miner observed on accepted blocking path: `7336` — SecWire CVE Lookup
- Outcome: `BLOCK`
- Blocking record: `CVE-2026-2950`
- Execution consequence: merge authorization denied; merge-adapter calls `0`
- Evidence:
  - `evidence/t4/pr1-block-run-004/reviewed-challenge.sanitized.json`
  - `evidence/t4/pr1-block-run-004/MERGE-DENIAL-REPLAY.md`

### T4 PR #2 clean case

- Paid calls: **2**
- Risk: `MEDIUM`
- Spend observed: **$0.02**
- Routed miners:
  - `20260828` — PREFLIGHT Infrastructure Signals
  - `7336` — SecWire CVE Lookup
- Coverage: `2/2`
- Outcome: `PASS`
- Execution consequence: real merge after exact-head revalidation and explicit bounded human authorization
- Merge commit: `c76c76e0c02dab28275d8e53d70da3f6f132e648`
- Evidence:
  - `evidence/t4/pr2-clean-run-005/reviewed-challenge.sanitized.json`
  - `evidence/t4/pr2-clean-run-005/REAL-MERGE-EXECUTION.md`

## Interpretation

This is **real application demand**, not a user-count claim. Skeptara declared evidence needs and Telegraph routed paid requests to live miners. The clean T4 run demonstrates more than one routed miner in the same challenge.

Do not translate these counts into “users acquired.” User/adoption evidence must remain separately truthful.

## Pricing boundary

The observed calls in this subset cost `$0.01` each. This is an observed testnet result for these runs, **not** a claim that Telegraph pricing is fixed network-wide.
