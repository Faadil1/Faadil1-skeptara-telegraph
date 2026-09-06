# Skeptara T0 Attempt 004 — public address copied instead of private key

Date: 2026-09-06
Gate: `SKEPTARA_T0_REAL_TELEGRAPH_CHALLENGE`
Runtime: human personal Windows machine

## Observed

The dedicated clipboard launcher validated the clipboard content locally and stopped before any paid Telegraph call.

Sanitized diagnostic:

- result: `INVALID private-key format`
- observed trimmed length: `42`
- expected: `64` hex characters, or `66` including `0x`
- paid inference attempted: **false**
- secret value recorded: **false**

A 42-character `0x...` EVM value is the standard length of a public account address, not an account private key. The local safety gate therefore behaved correctly and prevented the address from being misused as signing material.

## Classification

- discovery class: `execution_detail`
- product intent changed: `false`
- PRD revision required: `false`
- T0 gate result: `OPEN_RETRY_REQUIRED`

## Required remediation

Export the **private key of the burner EVM account** from the wallet's account-details/private-key flow. Do not copy the account address from the main wallet screen. Do not use the wallet password or Secret Recovery Phrase.

The launcher remains the approved local secret-injection path. It must be run first; only after it pauses should the human copy the exported private key, return to PowerShell, and press Enter without pasting the secret into the terminal.
