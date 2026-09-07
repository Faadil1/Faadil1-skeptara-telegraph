# Skeptara Evidence Index

Evidence is gate-scoped. A gate is not PASS because code exists; it is PASS only when its required evidence is persisted and referenced from canonical state.

## Current evidence

- `evidence/prd-v0.1-human-lock/` — human approval of PRD v0.1.
- `evidence/t0-real-telegraph/` — live Telegraph/x402 capability and paid challenge proof.
- `evidence/t2/` — independent-auditor implementation validation, real runs, semantic replay and closure evidence.
- `evidence/t3/` — protected merge-gate validation, including full/focused user-machine suites.
- `evidence/t4/` — final real two-case proof:
  - PR #1 real `BLOCK` + deterministic merge denial + zero merge-adapter calls;
  - PR #2 real `PASS` + exact-head revalidation + bounded human authorization + real merge.
- `evidence/winning-intelligence/` — judge-positioning preflight and blind-spot audit.
- `evidence/activity/ACTIVITY-LEDGER-V0.1.md` — conservative final-proof usage/activity subset.
- `evidence/admin/TELEGRAPH-REGISTRATION-VERIFIED.md` — registration confirmation without persisting unnecessary account information.

## Judge-facing proof paths

### Challenged case

- `evidence/t4/pr1-block-run-004/REVIEW.md`
- `evidence/t4/pr1-block-run-004/reviewed-challenge.sanitized.json`
- `evidence/t4/pr1-block-run-004/MERGE-DENIAL-REPLAY.md`

### Clean case

- `evidence/t4/pr2-clean-run-005/REVIEW.md`
- `evidence/t4/pr2-clean-run-005/reviewed-challenge.sanitized.json`
- `evidence/t4/pr2-clean-run-005/REAL-MERGE-EXECUTION.md`

### Strategic / claim controls

- `evidence/winning-intelligence/WI-TRACE-PREFLIGHT-001.md`
- `evidence/winning-intelligence/WI-BLIND-SPOT-AUDIT-002.md`
- `docs/JUDGE-CLAIM-BOUNDARIES.md`
- `docs/SUBMISSION-COMPLIANCE.md`

## Replay labels

Historical captured-live evidence must be explicitly labeled. A replay does not create a fresh PASS, perform a Telegraph payment, or authorize an external write.

Secret-free judge replay:

```bash
npm run demo
```

Local judge surface:

```bash
npm run demo:web
```

## Still to be produced

- `evidence/trace/` — TRACE judge-path review and human visual acceptance.
- deployment-smoke evidence for the public judge surface.
- human-verifiable Discord/X/final-submission evidence.
- `evidence/project-finisher/` — terminal assurance and submission-readiness evidence.

## Evidence integrity rules

- Do not store secrets.
- Do not present fixtures or historical replays as fresh live intelligence.
- Preserve raw source references where safe and practical.
- Record timestamps and commit SHAs for reproducibility.
- Record only Telegraph/x402 fields actually exposed; do not fabricate settlement hashes or miner metadata.
- Negative-path evidence is mandatory for fail-closed gates.
- Do not claim automatic unknown-vulnerability discovery from controlled CVE-seeded proof.
- Do not claim statistical independence of miners unless separately proven.
- Do not fabricate users, adoption, engagement, request counts, or other judging metrics.
