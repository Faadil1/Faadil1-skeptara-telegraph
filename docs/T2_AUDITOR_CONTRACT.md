# Skeptara T2 Independent Auditor Contract

Status: **IMPLEMENTED — local live verification pending**
Date: 2026-09-06

## Purpose

T2 turns the successful T0 Telegraph spike into a reusable independent counter-evidence auditor. It consumes canonical action facts plus the deterministic T1 risk contract and has no input for constructor persuasion or self-justification.

## Inputs

- `ActionSnapshot` from `src/policy.mjs`;
- deterministic `RiskAssessment` from T1;
- live Telegraph capability discovery;
- bounded local x402 credential available only in the secure runtime.

## Planning

The auditor discovers live intents and selects only supported evidence paths. Dependency-change preference order is:

1. `CVE_LOOKUP`
2. `FACT_CHECK`
3. `WEB_SEARCH`
4. `NEWS_SEARCH`
5. `URL_SCAN`

The plan contains a stable `plan_fingerprint`, required path count, per-path budget and counter-evidence query derived from canonical action facts only.

A desired intent is a planning target, not a truth claim. The final EvidenceItem records the actual intent returned by Telegraph. Cross-intent claims are based only on observed returned intents.

## Budget and coverage

T1 caps remain authoritative:

- LOW: 1 path / 10000 atomic USDC;
- MEDIUM: 2 paths / 20000 atomic USDC;
- HIGH: 3 paths / 30000 atomic USDC.

Each live path performs an unsigned x402 quote check before payment. A quote outside Base Sepolia or above the remaining/per-path cap is rejected fail-closed.

## Stopping rule

Material `BLOCKING` counter-evidence stops the challenge immediately and returns BLOCK. This is asymmetric: proof against execution does not require spending the remaining budget.

A clean PASS candidate must complete all mandatory coverage. Missing capability, payment/runtime failure, budget exhaustion before required coverage, or critical ambiguity cannot PASS.

## Evidence normalization

For dependency CVE evidence, Skeptara may classify `BLOCKING` when the returned target version can be machine-checked as inside an explicitly reported affected range. A known CVE with an unparseable/ambiguous range is not silently treated as clean; it remains AMBIGUOUS and critical for MEDIUM/HIGH.

Protocol-exposed provenance remains distinct from miner-reported source labels.

## Runtime boundary

- `src/telegraph-client.mjs`: capability discovery + bounded x402 adapter;
- `src/auditor.mjs`: pure planning, normalization, spend/coverage accounting, ChallengeResult;
- `scripts/t2-live-audit.mjs`: local live runner;
- `scripts/t2-from-clipboard.ps1`: clipboard-only secret injection;
- `tests/auditor.test.mjs`: deterministic offline tests.

The private key is never accepted as an auditor domain input and must not enter persisted challenge output.

## T2 pass criteria

Before `SKEPTARA_T2_INDEPENDENT_AUDITOR_PASS` can close:

1. all deterministic T1 + T2 tests pass locally;
2. T0 challenged-case evidence replays to BLOCK under the T2 normalization/gate semantics;
3. live capability discovery yields enough supported paths for the selected clean MEDIUM case;
4. one live clean MEDIUM audit completes its required coverage within 20000 atomic USDC and produces a non-ESCALATE result consistent with the actual evidence;
5. sanitized challenge record is reviewed and persisted durably.

T2 does not authorize GitHub merge. T3 remains the protected execution gate.
