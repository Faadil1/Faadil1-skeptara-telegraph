# Skeptara T0 — Attempt 001

Date: 2026-09-06
Gate: `SKEPTARA_T0_REAL_TELEGRAPH_CHALLENGE`
Outcome: **FAIL-CLOSED / REMEDIATION REQUIRED**
Discovery class: `execution_detail`
Product intent change: **NO**

## Local runtime observation

The project was cloned on the human operator's personal Windows machine, dependencies installed successfully with 0 npm vulnerabilities, and the burner private key was injected only through the local PowerShell process.

Observed terminal result:

```text
[Skeptara T0] free discovery: FAILED
[Skeptara T0] evidence: evidence\t0-real-telegraph\runtime\2026-09-06T20-32-19-478Z\01-free-discovery.json
T0 cannot proceed to paid inference until the Engine discovery route is reachable.
[Skeptara T0] negative path SOURCE_UNAVAILABLE => ESCALATE: PASS
```

No paid inference was attempted after free discovery failed. No submission-path mock was substituted. The negative-path fail-closed behavior passed.

## Root cause classification

The initial harness used an older route baseline inherited from the Telegraph MCP README:

- Engine: `http://13.237.89.59:8080`
- discovery: `GET /v1/subnets`

Current official Telegraph documentation now identifies the live testnet node as:

- base node: `https://devnode.telegraphprotocol.com`
- free discovery: `GET /api/miners`
- Engine base: `https://devnode.telegraphprotocol.com/engine`
- auto-routed inference: `POST /engine/v1/ask`

Therefore Attempt 001 is classified as a stale endpoint/route assumption in the T0 harness, not evidence that Telegraph is globally unavailable.

## Remediation

- update T0 harness to use the current official devnode route;
- update `.env.example` accordingly;
- preserve the old README route only as historical context, not as the current default;
- rerun T0 locally before any T1/T2 promotion;
- keep the gate fail-closed until a genuine paid Telegraph call succeeds.

## Secret boundary

No private key, wallet secret, or payment credential is recorded in this evidence file.
