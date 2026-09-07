# Skeptara — Frontend settlement matrix clarification

Status: **VERIFIED FROM CAPTURED LIVE T4 RUNTIME EVIDENCE**  
Date: 2026-09-07 UTC

## Why this clarification exists

Frontend review noticed that only one of the four final T4 evidence items appeared to expose a `settlement_transaction` in the reduced judge fixtures. This could incorrectly suggest that one paid Telegraph call produced multiple evidence findings.

That is **not** what happened in the final T4 proof.

## Correct T4 semantics

For the two final MEDIUM cases, Skeptara executed **two required evidence paths per challenge**. Each path was a separate paid Telegraph `CVE_LOOKUP` request. Each successful paid request produced its own x402 settlement record.

Therefore:

- 2 final cases;
- 2 paid evidence paths per case;
- 4 paid evidence calls total across T4;
- 4 distinct settlement transactions in the captured raw runtime evidence.

## Verified transaction matrix

### PR #1 — challenged case — `lodash@4.17.21`

1. `CVE-2026-4800`
   - materiality: `AMBIGUOUS`
   - miner: `7336` — SecWire CVE Lookup
   - cost: `$0.01`
   - settlement success: `true`
   - transaction: `0x07ef1d9a4d44409832c99a02c89b26f665fab7fe07040e7573ab2b81a1fa8b57`
   - network: `eip155:84532`

2. `CVE-2026-2950`
   - materiality: `BLOCKING`
   - miner: `7336` — SecWire CVE Lookup
   - cost: `$0.01`
   - settlement success: `true`
   - transaction: `0x171e2fc64a0d33b9726a31e3a45654aa47b2ce94b89f83d74d30fe3b327f5020`
   - network: `eip155:84532`

### PR #2 — clean case — `lodash@4.18.1`

1. `CVE-2026-4800`
   - materiality: `ADVISORY`
   - miner: `20260828` — PREFLIGHT Infrastructure Signals
   - cost: `$0.01`
   - settlement success: `true`
   - transaction: `0x66bd41892d411b9be502759fc4259d2bec8821fd818385cc5eabb950589ab2a2`
   - network: `eip155:84532`

2. `CVE-2026-2950`
   - materiality: `ADVISORY`
   - miner: `7336` — SecWire CVE Lookup
   - cost: `$0.01`
   - settlement success: `true`
   - transaction: `0x95e44b463cb6cafd4b1c56a9889930c1180d084a5e709ccf410296ca465d1e1b`
   - network: `eip155:84532`

## Why the reduced fixtures looked asymmetric

This is a **data-shaping / sanitization omission**, not protocol behavior:

- the PR #1 reviewed fixture kept the full settlement transaction only on the accepted blocking evidence item and reduced the first paid path to a smaller observation object;
- the PR #2 reviewed fixture kept `settlement_success` and `settlement_network` for both evidence items but omitted the transaction hashes.

No payment or settlement was missing in the underlying final live runs.

## Frontend contract rule

For the judge UI:

- treat one `EvidenceItem` as one evidence path / one paid Telegraph call in these final T4 cases;
- display the evidence item's own settlement transaction when that field is available in the captured source;
- do not attach one transaction to multiple evidence items;
- do not infer a transaction if it is absent from a future payload;
- `settlement.transaction` remains nullable/optional at the generic schema boundary, but all four final T4 captured evidence items have verified transaction hashes and may be displayed as such.

## Claim boundary

This clarification applies to the **captured final T4 proof**. It does not claim that every possible Telegraph response shape or future application flow must always expose the transaction hash in the same normalized field.
