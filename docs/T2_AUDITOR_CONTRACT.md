# Skeptara T2 Independent Auditor Contract

Status: **CLOSED_PASS — v0.4 seeded-CVE auditor**  
Date: 2026-09-07

## Purpose

T2 turns the successful T0 Telegraph spike into a reusable independent counter-evidence auditor. It consumes canonical action facts plus the deterministic T1 risk contract and has no input for constructor persuasion or self-justification.

The governing rule is stricter than "a paid call returned 200": a paid call contributes spend immediately, but it contributes required coverage only when the returned investigation is concrete, relevant to the canonical target, and machine-checkable enough for deterministic gating.

## Core inputs

- `ActionSnapshot` from `src/policy.mjs`;
- deterministic `RiskAssessment` from T1;
- live Telegraph capability discovery;
- bounded local x402 credential available only in the secure runtime;
- optional controlled evidence seeds that are external identifiers, never proposer persuasion.

## Budget and gate

T1 caps remain authoritative:

- LOW: 1 path / 10000 atomic USDC;
- MEDIUM: 2 paths / 20000 atomic USDC;
- HIGH: 3 paths / 30000 atomic USDC.

Each paid path is quoted before settlement. A quote outside Base Sepolia or above the remaining/per-path cap is rejected fail-closed.

Material `BLOCKING` counter-evidence may stop immediately. PASS still requires all mandatory coverage. Missing capability, invalid/incomplete evidence, irrelevant evidence, payment/runtime failure, exhausted budget before coverage, or critical ambiguity cannot PASS.

## Evidence-quality discoveries

### Live run 001

Runtime v0.1 reported PASS, but the `CVE_LOOKUP` miner said the request was invalid because an explicit CVE identifier was required. Evidence review corrected the outcome to ESCALATE. v0.2 therefore stopped treating a successful paid response as automatic completed coverage.

Evidence: `evidence/t2/live-clean-run-001/REVIEW.md`.

### Live retry 002

Runtime v0.2 again reported PASS, but review found both claimed paths inadequate:

- `FACT_CHECK`: `verdict: unverified`, `confidence: 0.2`, `evidence: null`;
- requested `WEB_SEARCH` returned actual `NEWS_SEARCH` whose articles were unrelated to Lodash/package security.

Corrected interpretation: `0/2` meaningful coverage at the full `20000` atomic spend ceiling => ESCALATE.

Evidence: `evidence/t2/live-clean-retry-002/REVIEW.md`.

### Live seeded run 003

PR #2 (`lodash 4.17.20 -> 4.18.1`) was audited through two exact paid `CVE_LOOKUP` paths:

- `CVE-2026-4800` returned a concrete record with affected versions before `4.18.0` and normalized to non-blocking `ADVISORY`;
- `CVE-2026-2950` returned a concrete record from a different miner shape: exact CVE id, Lodash product, CVSS/severity, advisory description, source/reference and `fixed_versions:["4.18.0"]`, but without miner-specific `found/verdict` flags.

v0.3 therefore reported `1/2` and ESCALATE even though the second live record was substantive and machine-checkable. Review traced this to a normalizer-shape assumption, not missing evidence.

Evidence: `evidence/t2/live-pr2-seeded-run-003/REVIEW.md`.

## Clean/challenged fixtures

- PR #1 is preserved as challenged candidate: `lodash 4.17.20 -> 4.17.21`, exact head `73cf5bdd69163924228e3e21d67fa9f405d99904`.
- PR #2 is the clean candidate: `lodash 4.17.20 -> 4.18.1`, exact head `d2aa0ea25daf1f84b6cfdd98861d3f05df584b7a`.

This is demo-fixture selection, not a product-mechanism change.

## v0.4 seeded exact-CVE mode

`src/seeded-cve-auditor.mjs` now accepts miner-variable exact-CVE shapes while retaining fail-closed semantics.

A seeded path counts only when:

1. actual returned intent is `CVE_LOOKUP`;
2. returned `cve_id` exactly matches the requested seed;
3. the record contains substantive advisory data, not merely an echoed id;
4. the affected-version boundary is machine-checkable against the target.

Machine-checkable boundaries may come from:

- `affected_versions` or descriptive text such as `before X.Y.Z` / `X.Y.Z and earlier`;
- `fixed_versions`, where the lowest fixed version is treated as the exclusive upper bound of affected versions.

A mismatched route, mismatched CVE, empty/echo-only record or unparseable boundary remains incomplete/critical and cannot count toward PASS.

For returned known CVEs:

- target inside affected range => `BLOCKING`;
- target outside affected range => `ADVISORY` meaningful coverage.

MEDIUM still requires two evidence paths and remains capped at 20000 atomic USDC. Cross-intent diversity is preferred by T1 but not mandatory for MEDIUM; seeded-CVE mode deliberately prioritizes concrete machine-checkable counter-evidence.

## Runtime boundary

- `src/telegraph-client.mjs`: capability discovery + bounded x402 adapter;
- `src/auditor.mjs`: generic auditor v0.2 and evidence-quality rules;
- `src/seeded-cve-auditor.mjs`: v0.4 controlled exact-CVE path;
- `scripts/t2-live-audit.mjs`: chooses seeded mode when `evidence_seeds.cve_ids` exists;
- `scripts/t2-from-clipboard.ps1`: clipboard-only secret injection;
- `scripts/replay-t2-run003.mjs`: zero-spend deterministic replay of sanitized captured live records;
- `tests/auditor.test.mjs` + `tests/seeded-cve-auditor.test.mjs`: deterministic fail-closed tests.

The private key is never an auditor domain input and must not enter persisted challenge output.

## T2 closure evidence

User-machine validation after v0.4 remediation:

- full repository suite: **29/29 PASS, 0 fail**;
- zero-spend replay of captured live run 003: **2/2 coverage**;
- replay materialities: `[ADVISORY, ADVISORY]`;
- replay outcome: **PASS**;
- replay reason: `REQUIRED_COVERAGE_COMPLETE_NO_BLOCKING_EVIDENCE`.

Evidence: `evidence/t2/LOCAL-USER-VALIDATION-V0.4-29-OF-29-AND-RUN003-REPLAY-PASS.md`.

Therefore:

`SKEPTARA_T2_INDEPENDENT_AUDITOR_PASS = CLOSED_PASS`

## Important boundary into T3

T2 closure proves the auditor/gate can truthfully interpret reviewed real Telegraph evidence. It does **not** authorize a GitHub merge.

T3 must require a **fresh and unexpired** PASS bound to the exact repository, PR, head SHA and action fingerprint before a real merge can execute. The run 003 replay is historical evidence and cannot serve as merge authorization.
