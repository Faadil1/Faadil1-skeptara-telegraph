# T2 auditor v0.2 — user-machine validation

Date: 2026-09-06

The repository was pulled on the user's Windows clone and the full test suite was executed with `npm test` against auditor v0.2.

Observed result:

- tests: 21
- pass: 21
- fail: 0
- cancelled: 0
- skipped: 0
- todo: 0
- duration: 418.3692 ms

The suite included the two v0.2 regression cases that close the live-run-001 false-PASS defect:

1. invalid evidence-path input is critical, incomplete, and cannot count as clean evidence;
2. a paid but invalid required path does not count as coverage and escalates.

The revised dependency plan also selects two generic package-compatible evidence paths deterministically instead of generic direct `CVE_LOOKUP` without an explicit CVE identifier.

Immediately after this validation, PR #1 was re-checked on GitHub and remained open, unmerged, mergeable, and bound to exact head SHA `73cf5bdd69163924228e3e21d67fa9f405d99904`.

This evidence closes the local v0.2 validation prerequisite only. It does not close T2. The next gate is bounded live clean MEDIUM retry 002, followed by evidence review. No merge is authorized by this validation.
