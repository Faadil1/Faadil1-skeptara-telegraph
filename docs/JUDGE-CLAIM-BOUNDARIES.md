# Skeptara — Judge-Facing Claim Boundaries

Status: **LOCKED FOR TRACE / SUBMISSION**  
Date: 2026-09-07 UTC

Use this file whenever copy, UI, README, video, X posts, or submission text is written.

## Safe primary claim

> Skeptara applies an external deterministic risk classification to an autonomous dependency-change PR, buys Telegraph-routed counter-evidence under a bounded spend contract, and only allows the exact reviewed action to become execution-eligible after a fresh PASS.

## Exact-CVE seeded proof

The final hackathon proof uses controlled exact CVE seeds so Telegraph-routed miners can return concrete advisory records and machine-checkable version ranges.

Safe language:

> For the controlled hackathon proof, Skeptara challenges the action against exact advisory candidates and asks Telegraph-routed miners for the concrete record/range.

Do **not** claim:

- automatic discovery of unknown vulnerabilities;
- autonomous generation of all relevant CVE candidates;
- open-ended supply-chain threat discovery.

## Risk scaling

Policy/test proven:

- LOW → 1 required path → demo cap 10,000 atomic USDC;
- MEDIUM → 2 required paths → demo cap 20,000 atomic USDC;
- HIGH → 3 required paths → demo cap 30,000 atomic USDC, with stronger ambiguity/cross-intent requirements where supported.

Live final T4 proof: **MEDIUM only**.

Do not imply LOW and HIGH were separately live-proven unless new evidence is added.

## Independence

Safe claim:

- independent challenge topology;
- proposer/auditor separation;
- deterministic external risk policy;
- observed miner/source diversity where actually seen.

Do not claim statistical/model independence of Telegraph miners or sources.

## Telegraph routing / flywheel

Safe claim:

> Skeptara declares an evidence need and sends paid application demand through Telegraph's engine; the final clean challenge observed routing to two different live CVE_LOOKUP miners.

Do not describe Telegraph as a fixed CVE API or hardcoded single-provider integration.

## Pricing

`$0.01` per paid path is an **observed testnet price in the captured runs**, not a network-wide invariant.

## Replay freshness

Historical evidence must be labeled one of:

- `CAPTURED LIVE EVIDENCE — HISTORICAL REPLAY`;
- `EXPIRED / HISTORICAL`;
- `EXECUTED`.

A replay never creates a fresh PASS and never authorizes a merge.

## Human authorization vs autonomy

The machine gate determines whether an exact action is **execution-eligible**. For the real hackathon write, the human project owner added an extra bounded authorization layer.

A human authorization cannot convert `BLOCK` or `ESCALATE` into `PASS` in the demonstrated gate.

Safe language:

> The real write required explicit bounded human authorization as an additional demo safety boundary after machine eligibility was proven.

## GitHub runtime boundary

T3 proves in repository code/tests that the protected executor requires an exact fresh PASS and forwards `expected_head_sha`. T4 proves a real GitHub merge occurred under the same exact-head/freshness/human constraints.

Do not claim the repository currently contains a fully deployed production GitHub App/runtime adapter unless that separate integration is added and proven.

## Activity / users

Safe counts are in `evidence/activity/ACTIVITY-LEDGER-V0.1.md`.

Do not convert application calls into user counts. Do not fabricate adoption metrics, requests, engagement, or users.
