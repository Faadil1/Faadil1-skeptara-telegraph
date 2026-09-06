# Skeptara Evidence Index

Evidence is gate-scoped. A gate is not PASS because code exists; it is PASS only when its required evidence is persisted and referenced from canonical state.

Planned evidence directories:

- `evidence/t0-real-telegraph/` — live Telegraph capability discovery, paid challenge call, normalized EvidenceItem, negative path.
- `evidence/t1-policy-core/` — deterministic risk/gate tests.
- `evidence/t2-independent-auditor/` — live multi-path challenge evidence and coverage/spend behavior.
- `evidence/t3-merge-gate/` — stale head, expired, blocked, allow-list and protected execution tests.
- `evidence/t4-two-case-demo/` — clean PASS case and challenged BLOCK/ESCALATE case, including actual bounded action outcome.
- `evidence/trace/` — design/judge-path review when triggered.
- `evidence/project-finisher/` — terminal assurance and submission-readiness evidence.

## Evidence integrity rules

- Do not store secrets.
- Do not present fixtures as live evidence.
- Preserve raw source references where safe and practical.
- Record timestamps and commit SHAs for reproducibility.
- Record only Telegraph/x402 fields actually exposed; do not fabricate settlement hashes or miner metadata.
- Negative-path evidence is mandatory for fail-closed gates.
