# Skeptara T2 Independent Auditor Contract

Status: **IMPLEMENTED v0.3 seeded-CVE mode — local validation + live clean PR #2 audit pending**  
Date: 2026-09-06

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

## Evidence quality discoveries

### Live run 001

Runtime v0.1 reported PASS, but the `CVE_LOOKUP` miner said the request was invalid because an explicit CVE identifier was required. Evidence review corrected the outcome to ESCALATE. v0.2 therefore stopped treating a successful paid response as automatic completed coverage.

Evidence: `evidence/t2/live-clean-run-001/REVIEW.md`.

### Live retry 002

Runtime v0.2 again reported PASS, but review found both claimed paths inadequate:

- `FACT_CHECK`: `verdict: unverified`, `confidence: 0.2`, `evidence: null`; absence of a matching Wikipedia article is not completed counter-evidence coverage.
- requested `WEB_SEARCH` returned actual `NEWS_SEARCH`, whose articles were unrelated to Lodash/package security. Request/query text mentioning Lodash does not make unrelated returned evidence relevant.

Corrected interpretation: `0/2` meaningful coverage at the full `20000` atomic spend ceiling => ESCALATE.

Evidence: `evidence/t2/live-clean-retry-002/REVIEW.md`.

## Clean-fixture correction

PR #1 (`lodash 4.17.20 -> 4.17.21`) is retained as a challenged candidate rather than rewritten. Current advisory validation showed `4.17.21` is not a defensible 2026 clean target.

A new clean candidate is PR #2 (`lodash 4.17.20 -> 4.18.1`) on `demo/clean-lodash-4.18.1`, exact head `d2aa0ea25daf1f84b6cfdd98861d3f05df584b7a`.

This changes the demo fixture, not Skeptara's product mechanism or hero vertical.

## v0.3 seeded exact-CVE mode

`src/seeded-cve-auditor.mjs` adds a controlled reliability mode for the bounded demo. Instead of broad reassurance/search prompts, a deterministic external advisory baseline supplies exact CVE identifiers. The reviewed coding agent does not choose these identifiers.

For clean PR #2 the action file supplies:

- `CVE-2026-4800`
- `CVE-2026-2950`

The auditor requires live `CVE_LOOKUP`, spends at most 10000 atomic USDC per path, and asks Telegraph to return the concrete record for exactly the seeded CVE. A path counts as coverage only when:

1. actual returned intent is `CVE_LOOKUP`;
2. returned `cve_id` exactly matches the seed;
3. the CVE record is actually found;
4. the affected version boundary is machine-checkable against the target dependency version.

A mismatched route, missing record, substituted CVE, or unparseable range remains incomplete/critical and cannot count toward PASS.

For a returned known CVE:

- target inside affected range => `BLOCKING`;
- target outside affected range => `ADVISORY` (meaningful non-blocking counter-evidence coverage).

MEDIUM still requires two paid evidence paths and remains capped at 20000 atomic USDC. Cross-intent diversity is preferred by T1 but not mandatory for MEDIUM; seeded-CVE mode deliberately favors concrete machine-checkable evidence over broad but irrelevant routing.

## Runtime boundary

- `src/telegraph-client.mjs`: capability discovery + bounded x402 adapter;
- `src/auditor.mjs`: generic auditor v0.2 and evidence-quality lessons;
- `src/seeded-cve-auditor.mjs`: v0.3 controlled exact-CVE path;
- `scripts/t2-live-audit.mjs`: chooses seeded mode when `evidence_seeds.cve_ids` exists in the action file;
- `scripts/t2-from-clipboard.ps1`: clipboard-only secret injection;
- `tests/auditor.test.mjs` + `tests/seeded-cve-auditor.test.mjs`: deterministic fail-closed tests.

The private key is never an auditor domain input and must not enter persisted challenge output.

## T2 pass criteria

Before `SKEPTARA_T2_INDEPENDENT_AUDITOR_PASS` can close:

1. full repository tests pass after v0.3 seeded-CVE addition;
2. PR #2 remains open at exact head `d2aa0ea25daf1f84b6cfdd98861d3f05df584b7a`;
3. live capability discovery includes `CVE_LOOKUP`;
4. a bounded PR #2 MEDIUM audit obtains two meaningful exact-CVE records within 20000 atomic USDC;
5. actual returned records are reviewed and durably persisted;
6. only then may a real PASS be accepted.

T2 never authorizes GitHub merge. T3 remains the protected execution gate.
