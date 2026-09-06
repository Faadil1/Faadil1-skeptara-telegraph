# T2 local user validation + controlled clean PR binding

Date: 2026-09-06

## User-machine repository validation

The user pulled the current `main` branch and ran:

```text
npm test
```

Observed result:

- tests: 19
- pass: 19
- fail: 0
- auditor tests: 9/9 PASS
- policy tests: 10/10 PASS

This closes the required user-machine full-repository test step for T2.

## Truthful controlled clean GitHub PR

A real public GitHub PR was created for the clean MEDIUM dependency-change audit:

- repository: `Faadil1/Faadil1-skeptara-telegraph`
- PR: `#1`
- branch: `demo/clean-lodash-upgrade`
- head SHA: `73cf5bdd69163924228e3e21d67fa9f405d99904`
- base branch: `main`
- changed file: `demo/controlled-clean/package.json`
- dependency change: `lodash 4.17.20 -> 4.17.21`
- scope: isolated demo fixture only; not the root application runtime
- merge status: OPEN / NOT AUTHORIZED BY THIS STEP

Canonical action input is persisted at `demo/actions/clean-pr.json` and binds the live T2 audit to the actual PR number and exact head SHA.

## Safety / truth boundary

This PR is a controlled demo action, but it is a real GitHub PR with a real head SHA. No synthetic snapshot is being represented as live GitHub state. Creating the PR does not authorize merge; T3 remains responsible for protected merge enforcement.

## Next gate

`SKEPTARA_T2_LIVE_CLEAN_MEDIUM_AUDIT_REVIEW`

The next runtime may spend at most `20000` atomic Base Sepolia USDC under the MEDIUM contract. The result must be accepted as returned: PASS only on complete clean coverage, BLOCK on material counter-evidence, ESCALATE on incomplete/ambiguous/runtime failure.
