# Skeptara T2 — local v0.4 validation + run 003 replay

Status: **PASS**  
Date: 2026-09-07 UTC

## User-machine full repository test

Command:

```text
npm test
```

Observed result:

- tests: **29**
- pass: **29**
- fail: **0**
- cancelled: 0
- skipped: 0
- todo: 0

The final test count was 29 rather than the earlier estimate of 28 because the v0.4 remediation added an additional fail-closed regression assertion. The count difference is expected; the important gate is the fully green suite.

## Zero-spend deterministic replay

Command:

```text
npm run t2:replay:003
```

Observed replay:

- auditor: `skeptara-auditor-v0.4-seeded-cve`
- source live run: `2026-09-07T00-43-44-168Z`
- coverage: **2/2**
- historical spend replayed: **20000/20000 atomic USDC**
- new x402 spend during replay: **0**
- `CVE-2026-4800`: `ADVISORY`, `KNOWN_VULNERABILITY_DOES_NOT_MATCH_TARGET_VERSION_RANGE`, `complete=true`
- `CVE-2026-2950`: `ADVISORY`, `KNOWN_VULNERABILITY_DOES_NOT_MATCH_TARGET_VERSION_RANGE`, `complete=true`
- outcome: **PASS**
- reason: `REQUIRED_COVERAGE_COMPLETE_NO_BLOCKING_EVIDENCE`

## Gate interpretation

The replay consumes the exact sanitized Telegraph records captured in live run 003. It does not fabricate new evidence and it does not authorize merge execution. It verifies that v0.4 deterministically interprets the already-paid, reviewed live records according to the corrected miner-shape-independent normalization contract.

Therefore:

`SKEPTARA_T2_INDEPENDENT_AUDITOR_PASS = CLOSED_PASS`

T3 remains responsible for execution authorization. Any real merge must use a **fresh, unexpired** challenge bound to the exact repository, PR, head SHA, and action fingerprint.
