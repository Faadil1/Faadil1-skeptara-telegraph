# T0 Attempt 007 — Fresh burner funded on wrong test network

Date: 2026-09-06

## Outcome

`FAIL_CLOSED` — no product change.

## What was proven

- A fresh burner was created and its credential was used through the hardened clipboard-only launcher without printing the private key.
- Circle faucet funding succeeded for 20 test USDC, but the explorer evidence is for **Arc Testnet**, not Base Sepolia.
- Telegraph's live x402 quote remained `10000` atomic USDC (`0.01 USDC`) on `eip155:84532` (**Base Sepolia**).
- The paid call again failed with `invalid_exact_evm_insufficient_balance`.
- Therefore the fresh burner has test USDC on the wrong chain. Arc Testnet USDC cannot satisfy a Base Sepolia x402 balance check.
- The deterministic negative path remained `SOURCE_UNAVAILABLE => ESCALATE`.

## Security

- The fresh burner private key was not printed by the hardened launcher and was not intentionally recorded in Git or evidence.
- The previous exposed burner remains compromised and must not be reused or funded.
- The fresh burner does **not** need another rotation based on this attempt; only correct-network funding is required.

## Classification

`execution_detail`

Product intent changed: **false**.

## Remediation

Use Circle's public testnet faucet with:

- asset: `USDC`
- network: `Base Sepolia`
- destination: the fresh burner's **public** EVM address

Circle's faucet UI supports both `Arc Testnet` and `Base Sepolia`; the network selector must explicitly be changed from Arc Testnet to Base Sepolia before sending.

After Base Sepolia funding is confirmed, rerun `scripts/t0-from-clipboard.ps1` with the same fresh burner private key via clipboard-only detection.

## Exact next gate

`SKEPTARA_T0_FUND_FRESH_BURNER_BASE_SEPOLIA_AND_RETRY_008`
