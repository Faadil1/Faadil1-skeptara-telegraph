# Skeptara T0 — Attempt 008 durable evidence

Date: 2026-09-06
Gate: `SKEPTARA_T0_REAL_TELEGRAPH_CHALLENGE`
Outcome: **CLOSED_PASS**

## Runtime proof

Attempt 008 produced a genuine paid Telegraph inference on the user-controlled Windows runtime using the hardened clipboard-only burner flow.

Observed facts:
- free Telegraph discovery: PASS
- x402 network: `eip155:84532` (Base Sepolia)
- x402 amount: `10000` atomic USDC (`0.01 USDC`)
- final HTTP status: `200`
- settlement: `success: true`
- miner ID: `20260828`
- miner name: `PREFLIGHT Infrastructure Signals`
- endpoint: `/cve`
- intent: `CVE_LOOKUP`
- cost: `0.01 USD`
- signal hash: `0x060d6688d94acfa0728417eefe947c15de495103024a9df83f8433f0e78a5917`
- negative-path source-unavailable test: PASS => `ESCALATE`

The private key is not persisted here. The payer address is intentionally omitted from this durable evidence summary.

## Returned security evidence

The real Telegraph miner returned `CVE-2020-28500` for the query concerning `lodash@4.17.20` and reported:
- `found: true`
- affected versions: Lodash versions prior to `4.17.21`
- vulnerability class: Regular Expression Denial of Service (ReDoS)
- severity: `MEDIUM`
- CVSS 3.1: `5.3`
- miner-reported source: `CVE.org and NVD`
- confidence: `1`

Independent primary-source verification performed during evidence review confirmed that NVD records CVE-2020-28500 as affecting Lodash versions prior to 4.17.21. Therefore `lodash@4.17.20` is inside the affected range.

Primary verification reference:
- https://nvd.nist.gov/vuln/detail/CVE-2020-28500

## Skeptara relevance classification

Hero vertical relevance: **DIRECT**.

The T0 query asked for material security evidence that should block a dependency change to `lodash@4.17.20`. Telegraph routed the request to the security-specific `CVE_LOOKUP` intent and returned an affected-version match for that exact dependency version.

Normalized materiality for the challenged-case demo: **BLOCKING**.

Reason code: `KNOWN_VULNERABILITY_AFFECTS_TARGET_DEPENDENCY_VERSION`.

This classification is appropriate for the hackathon MVP challenge gate because the proposed dependency target is explicitly inside the affected range of a known CVE. It does not claim that every MEDIUM-severity CVE must always block in a future production policy; it establishes the deterministic challenged-case fixture for Skeptara v0.1.

## T0 closure decision

T0 acceptance criteria are satisfied:
- live current Telegraph route proven;
- current relevant intent/miner discovered;
- genuine x402 paid challenge succeeded;
- real miner, intent, cost, settlement, endpoint and signal hash captured;
- normalized EvidenceItem persisted;
- hero-vertical relevance established;
- negative source/payment/runtime semantics shown to fail closed;
- no mock intelligence used on the submission path.

`SKEPTARA_T0_REAL_TELEGRAPH_CHALLENGE = CLOSED_PASS`

Next gate: `SKEPTARA_T1_DETERMINISTIC_POLICY_PASS`.
