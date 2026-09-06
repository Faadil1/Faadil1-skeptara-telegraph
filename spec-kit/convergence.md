# Skeptara Convergence Contract

Status: DERIVED READY — reconciled to approved PRD v0.1

Spec Kit convergence is not terminal product completion. It means the derived execution artifacts agree with the current approved living PRD and canonical state.

## Convergence targets

A convergence claim requires:

- `product/PRD.md` status is approved/ready for the current revision;
- `state/CURRENT.yaml` points to that PRD revision;
- constitution/spec/plan/tasks agree on the same hero vertical and mechanism;
- implementation behavior does not silently contradict fail-closed semantics;
- evidence references exist for all passed technical gates;
- unresolved material product discoveries are either approved into the PRD or explicitly blocking;
- frontend contract does not expose protected secrets or redefine gate semantics;
- demo claims match observed evidence;
- TRACE/Project Finisher states are represented accurately when triggered.

## Non-converged conditions

Any of the following blocks convergence:

- code behavior becomes product source without PRD reconciliation;
- required challenge coverage can silently PASS when incomplete;
- the reviewed agent can set its own risk/gate result;
- live Telegraph dependency is replaced by a mock on the submission path;
- evidence claims include fabricated/unverified fields;
- merge executor accepts stale/mismatched/non-allow-listed action;
- material T0 discovery changes hero vertical without PRD revision;
- README/demo/UX claims exceed observed evidence;
- canonical state or handover points to a stale gate.

## Evidence classes

### Product evidence
- approved PRD revision;
- decision/change history.

### Technical evidence
- tests/CI;
- T0 live Telegraph transcript/normalized record;
- negative-path gate evidence;
- protected merge denial/allow evidence.

### Design/judge evidence
- deployed frontend;
- judge-path screenshots/replay;
- TRACE findings when triggered.

### Terminal evidence
- Project Finisher checklist/report;
- final rules compliance;
- public deployment smoke;
- submission artifacts.

## Current convergence status

`PRODUCT_CONTRACT_CONVERGED — PRD_V0_1_HUMAN_LOCK_PASS — IMPLEMENTATION_T0_OPEN`

This is **not** a build-complete or terminal convergence claim. It only certifies that the approved product source and derived execution artifacts agree sufficiently to open T0.

Next convergence checkpoint: after `SKEPTARA_T0_REAL_TELEGRAPH_CHALLENGE` closes and its discoveries are classified.
