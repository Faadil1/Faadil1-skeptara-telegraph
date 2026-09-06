# Skeptara Architecture

## Objective

Enforce a bounded GitHub merge only after independent, risk-proportional Telegraph counter-evidence has been acquired and a deterministic gate returns PASS for the exact action snapshot.

## Components

### 1. Action Intake
Reads or receives allow-listed GitHub PR facts and canonicalizes them into `ActionSnapshot`.

### 2. Deterministic Risk Scorer
Pure policy component. It classifies the action LOW/MEDIUM/HIGH from changed surfaces and dependency metadata. The reviewed coding agent has no write authority over this result.

### 3. Challenge Contract Builder
Maps risk tier to:
- minimum evidence path count;
- intent-diversity requirement where applicable;
- spend ceiling;
- ambiguity handling;
- freshness window.

### 4. Independent Auditor
Consumes action facts, not constructor persuasion. It discovers/uses live Telegraph capabilities and acquires evidence with the explicit goal of finding material counter-evidence to merge.

### 5. Evidence Normalizer
Converts real Telegraph responses into stable `EvidenceItem` records while preserving raw evidence references. It never invents absent settlement/provenance fields.

### 6. Deterministic Challenge Gate
Evaluates required coverage, material findings, budget/source failures, and ambiguity. Outputs only `PASS`, `BLOCK`, or `ESCALATE`.

### 7. Protected Merge Executor
Server-side component. Accepts only:
- allow-listed target;
- fresh PASS;
- exact matching repo/PR/head SHA/action fingerprint.

Otherwise it denies execution.

## Trust boundaries

### Client/browser
May display:
- action facts safe for UI;
- risk tier and reasons;
- challenge progress;
- normalized evidence safe for public display;
- PASS/BLOCK/ESCALATE state.

Must never receive:
- Telegraph private key;
- x402 wallet secret;
- protected GitHub write token;
- server-only authorization secret.

### Server/local secure runtime
Owns:
- Telegraph/x402 secret configuration;
- protected GitHub write credential;
- challenge execution;
- gate result signing/binding if implemented;
- merge call.

## Failure model

Fail closed on:
- Telegraph payment failure;
- required miner/intent unavailable;
- insufficient challenge coverage;
- spend cap reached before required coverage;
- critical ambiguous evidence;
- stale result;
- PR head mutation;
- allow-list mismatch;
- malformed evidence;
- secret/configuration errors.

## Data flow

`GitHub PR → ActionSnapshot → RiskAssessment → ChallengeContract → Telegraph/x402 evidence → EvidenceItems → ChallengeResult → Protected Merge Executor`

## Independence claim boundaries

Skeptara may claim:
- constructor/auditor component separation;
- context separation;
- deterministic external risk policy;
- evidence-source/intent diversity when observed.

Skeptara must not claim statistical independence of miners/sources unless separately proven.

## Hackathon implementation posture

Prefer the smallest architecture that proves:
1. one real Telegraph paid challenge;
2. risk-proportional challenge depth;
3. fail-closed gate;
4. one real allow-listed merge unlocked by PASS;
5. one real challenged merge denied.

No generic platform work before this vertical closes.
