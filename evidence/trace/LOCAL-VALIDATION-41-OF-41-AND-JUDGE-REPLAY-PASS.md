# Skeptara — Local validation before TRACE visual review

Status: **PASS — visual review still pending**  
Date: 2026-09-07 UTC

## Human-machine validation

The human project owner ran the current repository locally after pulling the hidden-spot remediation block.

### `npm test`

Observed result:

- tests: **41**
- pass: **41**
- fail: **0**
- cancelled: **0**
- skipped: **0**
- todo: **0**

This includes the independent auditor, deterministic risk policy, seeded CVE normalization and protected merge-gate tests.

### `npm run demo`

Observed result: **PASS**.

The command reproduced the captured-live two-case judge narrative with no Telegraph payment and no GitHub write:

- challenged case: PR #1 / `lodash@4.17.21` / MEDIUM / `CVE-2026-2950` / SecWire miner 7336 / **BLOCK** / merge denied / merge-adapter calls 0;
- clean case: PR #2 / `lodash@4.18.1` / MEDIUM / coverage 2/2 / miners 20260828 + 7336 / **PASS** / historical real merge after exact-head revalidation + explicit bounded authorization;
- merge commit: `c76c76e0c02dab28275d8e53d70da3f6f132e648`;
- LOW and HIGH remained explicitly labeled deterministic policy/test-proven, while MEDIUM is live-proven in T4;
- controlled exact-CVE seed disclosure remained visible;
- historical PASS explicitly remained non-fresh and non-authorizing.

The replay printed:

`PASS: captured-live two-case narrative reproduced with no payment and no external write.`

## `npm run demo:web`

Observed startup result:

- local judge surface started at `http://127.0.0.1:4173`;
- runtime message states static captured-live evidence only;
- no wallet or GitHub write credential required.

This evidence proves startup only. It does **not** yet prove visual quality, responsive layout, 5-second judge comprehension, or network behavior in the browser. Those remain for TRACE visual review.

## Gate conclusion

`SKEPTARA_HIDDEN_SPOT_REMEDIATION_LOCAL_VALIDATION = PASS`

Next gate:

`SKEPTARA_TRACE_JUDGE_PATH_VISUAL_REVIEW`

No fresh Telegraph request should be generated for that visual review.
