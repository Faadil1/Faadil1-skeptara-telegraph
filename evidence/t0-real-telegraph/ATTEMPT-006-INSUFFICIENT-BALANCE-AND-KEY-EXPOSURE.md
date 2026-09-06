# T0 Attempt 006 — settlement diagnosis and credential rotation

Date: 2026-09-06

## Result

- Live Telegraph discovery: PASS.
- Unsigned x402 quote: 10000 atomic USDC on `eip155:84532` (Base Sepolia).
- Paid x402 transport: reached.
- Final outcome: fail-closed ESCALATE.
- Decoded settlement reason: `invalid_exact_evm_insufficient_balance`.
- Negative `SOURCE_UNAVAILABLE` path: PASS -> ESCALATE.
- Product intent change: none; classification is execution detail.

## Security incident

During the local retry, the private key text was entered into the visible PowerShell prompt instead of remaining clipboard-only, and the resulting terminal transcript was shared in chat. No private-key value is recorded in this repository. The affected burner credential must therefore be treated as compromised and must not be funded or reused.

## Required remediation

1. Create a fresh dedicated burner EVM account/wallet with a new private key.
2. Do not reuse or fund the exposed credential.
3. Fund only the fresh burner's public address with Base Sepolia test USDC sufficient for the Telegraph quote.
4. Use the hardened `scripts/t0-from-clipboard.ps1`, which no longer asks for terminal input and automatically detects a valid clipboard key.
5. Retry T0 only after the fresh burner is minimally funded.

## Canonical interpretation

The T0 blocker is proven to be insufficient Base Sepolia USDC balance, not route failure, key-format failure, or product incompatibility. T0 remains OPEN until one genuine x402-paid Telegraph inference succeeds and a real EvidenceItem is normalized.
