# Skeptara Frontend Data Contract

Status: **FROZEN v0.1 after T0 real Telegraph evidence review**
Date: 2026-09-06

This contract is derived from the approved living PRD and the real T0 Telegraph response. It is the UI boundary for the hackathon MVP. It does not authorize changes to product semantics.

## Judge-path objects

### ActionSnapshot
```json
{
  "repository": "owner/repo",
  "pr_number": 12,
  "head_sha": "...",
  "base_branch": "main",
  "changed_files": ["package.json"],
  "dependency_changes": [{"name":"lodash","from":"4.17.21","to":"4.17.20"}],
  "security_sensitive_surfaces": [],
  "action_fingerprint": "sha256:..."
}
```

### RiskAssessment
```json
{
  "risk_tier": "MEDIUM",
  "reason_codes": ["DEPENDENCY_CHANGE"],
  "required_evidence_paths": 2,
  "cross_intent_policy": "PREFERRED",
  "spend_cap_atomic": 20000,
  "spend_asset": "USDC",
  "spend_network": "eip155:84532",
  "policy_version": "skeptara-risk-v0.1"
}
```

Observed T0 price unit: `10000` atomic USDC = `$0.01` on Base Sepolia. MVP caps therefore begin at LOW `$0.01`, MEDIUM `$0.02`, HIGH `$0.03` while preserving fail-closed coverage rules.

### EvidenceItem
```json
{
  "challenge_id": "...",
  "intent": "CVE_LOOKUP",
  "miner_id": "20260828",
  "miner_name": "PREFLIGHT Infrastructure Signals",
  "endpoint": "/cve",
  "signal_hash": "0x...",
  "cost_usd": 0.01,
  "duration_ms": 954,
  "normalized_finding_type": "KNOWN_DEPENDENCY_VULNERABILITY",
  "materiality": "BLOCKING",
  "reason_code": "KNOWN_VULNERABILITY_AFFECTS_TARGET_DEPENDENCY_VERSION",
  "finding": {
    "cve_id": "CVE-2020-28500",
    "severity": "MEDIUM",
    "cvss_score": 5.3,
    "affected_range": "<4.17.21"
  },
  "settlement": {
    "success": true,
    "network": "eip155:84532"
  }
}
```

Only fields actually exposed by Telegraph or deterministically derived by Skeptara may be displayed as such. `source_provenance` may be null even when the miner result contains a source label; the UI must distinguish protocol-exposed provenance from miner-reported source text.

### ChallengeResult
```json
{
  "challenge_id": "...",
  "action_fingerprint": "sha256:...",
  "head_sha": "...",
  "risk_tier": "MEDIUM",
  "required_coverage": 2,
  "completed_coverage": 2,
  "spend_observed_atomic": 20000,
  "outcome": "BLOCK",
  "reason_codes": ["MATERIAL_COUNTER_EVIDENCE_FOUND"],
  "expires_at": "..."
}
```

## UI states

The primary visual states are:
- `ASSESSING_RISK`
- `CHALLENGING`
- `PASS`
- `BLOCK`
- `ESCALATE`

The judge should see, in one path:
1. proposed PR/action;
2. deterministic risk tier and why;
3. required evidence depth and spend ceiling;
4. real Telegraph calls progressing;
5. miner/intent/cost/signal evidence actually exposed;
6. material counter-evidence when present;
7. final PASS/BLOCK/ESCALATE;
8. merge unlocked only for fresh PASS.

## T0 visual proof anchor

The challenged-case proof can use the real T0 result:
- target: `lodash@4.17.20`
- Telegraph intent: `CVE_LOOKUP`
- miner: `PREFLIGHT Infrastructure Signals`
- CVE: `CVE-2020-28500`
- affected range: `<4.17.21`
- materiality: `BLOCKING`
- cost: `$0.01`
- settlement success: `true`
- signal hash present

Do not display the retired compromised burner credential. Do not expose any private key or protected GitHub write credential.

## Change control

Frontend work may change layout, hierarchy, typography, animation, explanation and presentation polish. It may not change:
- risk tier semantics;
- evidence requirements;
- BLOCK/ESCALATE rules;
- action binding;
- merge authorization semantics;
without reconciliation through the living PRD / derived spec process.
