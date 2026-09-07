# Skeptara — Winning Intelligence Hidden-Spot Remediation 003

Status: **IMPLEMENTED — LOCAL/TRACE VALIDATION REQUIRED**  
Date: 2026-09-07 UTC

## Scope

Apply the nine remaining high-value hidden-spot remediations as one bounded block without changing the locked product mechanism.

## Applied

### HS-01 — Judge-facing product surface

Added `public/index.html` as a minimum challenge-dossier surface. It leads with the split real outcome rather than architecture or a generic dashboard.

### HS-02 — Merge runtime boundary

Added/centralized public claim boundaries in `docs/JUDGE-CLAIM-BOUNDARIES.md`. The repo now states precisely:

- T3 proves protected execution semantics and `expected_head_sha` forwarding in code/tests;
- T4 proves a real exact-head bounded merge under the same constraints;
- no claim of a fully deployed production GitHub adapter runtime is made.

### HS-03 — Controlled CVE seeds

The UI, README, demo replay and claim-boundary document explicitly state that the hackathon proof uses controlled exact CVE seeds and does not prove automatic discovery of unknown vulnerabilities.

### HS-04 — Risk-proportional thesis evidence boundary

The judge surface and README now display:

- LOW: 1 path / 10000 atomic — deterministic policy/test-proven;
- MEDIUM: 2 paths / 20000 atomic — final live T4 proof;
- HIGH: 3 paths / 30000 atomic — deterministic policy/test-proven.

No LOW/HIGH live proof is implied.

### HS-05 — Administrative compliance

Registration remains VERIFIED.

Added `docs/SUBMISSION-COMPLIANCE.md` with:

- official rules URL;
- official Telegraph Discord invite discovered from Telegraph-owned Developer Console / Guide: `https://discord.gg/telegraphprotocol`;
- late-entry X strategy that does not fabricate historical regular posting;
- final submission checklist.

Human-only gates remain HUMAN_VERIFY until evidence is supplied.

### HS-06 — Telegraph quality flywheel / routing story

README and judge surface now make Telegraph routing causality explicit: Skeptara declares evidence needs, the Telegraph engine routes paid application demand, and the final clean challenge observed two different miners.

No statistical miner-independence claim is made.

### HS-07 — Truthful activity ledger

Added `evidence/activity/ACTIVITY-LEDGER-V0.1.md`.

Conservative final-proof subset:

- 3 real paid challenge runs;
- 5 paid Telegraph evidence calls;
- 2 observed miners;
- $0.05 observed testnet USDC spend;
- 1 protected denial;
- 1 real exact-head merge.

Setup probes and discarded experiments are excluded to avoid misleading totals.

### HS-08 — README / evidence index staleness

README is now T4/current-judge aligned. `evidence/README.md` now indexes the completed proof paths and current replay/claim rules.

### HS-09 — Freshness, human authorization and reproducibility

Added:

- `npm run demo` → secret-free captured-live two-case historical replay;
- `npm run demo:web` → local static challenge dossier;
- explicit `CAPTURED LIVE EVIDENCE — HISTORICAL JUDGE REPLAY` labeling;
- explicit statement that historical PASS does not authorize execution;
- human authorization explained as an additional bounded real-write safety layer that cannot turn BLOCK/ESCALATE into PASS.

## Files added

- `public/index.html`
- `scripts/demo-replay.mjs`
- `scripts/serve-demo.mjs`
- `docs/JUDGE-CLAIM-BOUNDARIES.md`
- `docs/SUBMISSION-COMPLIANCE.md`
- `evidence/activity/ACTIVITY-LEDGER-V0.1.md`
- this remediation record

## Files updated

- `package.json`
- `README.md`
- `evidence/README.md`
- `spec-kit/tasks.md`
- canonical state/handover (after this record)

## Human-only items not falsely closed

- join official Discord and verify activity;
- publish X build/proof update(s) with `@Telegraphprotoc`;
- public deployment and smoke;
- final submission form verification and submission;
- TRACE human visual acceptance.

## Next gate

`SKEPTARA_HIDDEN_SPOT_REMEDIATION_LOCAL_VALIDATION_AND_TRACE_VISUAL_REVIEW`

Required user-machine commands:

```bash
npm test
npm run demo
```

Then:

```bash
npm run demo:web
```

Human opens `http://127.0.0.1:4173` and performs TRACE judge-path review.

`WINNING_INTELLIGENCE_HIDDEN_SPOT_REMEDIATION_003 = IMPLEMENTED_PENDING_VALIDATION`
