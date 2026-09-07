import type { DemoCase } from "./types";

// Real, closed T4 demo runs. Values are transcribed from the repository's
// captured live evidence. Keep proof-time repository names and identifiers
// intact; GitHub later renamed the repository.

export const challengedCase: DemoCase = {
  id: "pr1",
  label: "PR #1 challenged case",
  sourceEvidencePath: "evidence/t4/pr1-block-run-004/reviewed-challenge.sanitized.json",
  actionSnapshot: {
    repository: "Faadil1/Faadil1-skeptara-telegraph",
    pr_number: 1,
    head_sha: "73cf5bdd69163924228e3e21d67fa9f405d99904",
    base_branch: "main",
    changed_files: ["demo/controlled-clean/package.json"],
    dependency_changes: [
      { name: "lodash", from: "4.17.20", to: "4.17.21", type: "runtime", security_sensitive: false },
    ],
    security_sensitive_surfaces: [],
    action_fingerprint: "sha256:0260dfd07c6e070bb92c341472834052e72923528d9b53c5c72ed333d9a95867",
  },
  riskAssessment: {
    risk_tier: "MEDIUM",
    reason_codes: ["DEPENDENCY_CHANGE"],
    required_evidence_paths: 2,
    cross_intent_policy: "PREFERRED",
    spend_cap_atomic: 20000,
    spend_asset: "USDC",
    spend_network: "eip155:84532",
    policy_version: "skeptara-risk-v0.1",
  },
  evidenceItems: [
    {
      challenge_id: "113cc2c4-94ff-4c47-bf48-66fabc7c9329",
      intent: "CVE_LOOKUP",
      miner_id: "7336",
      miner_name: "SecWire CVE Lookup",
      signal_hash: "0x312ae1ef52186aaaf8c4e301b8a6667c6fb4a02ebe3524cf9d03a32007efc7d7",
      cost_usd: 0.01,
      duration_ms: 1603,
      materiality: "AMBIGUOUS",
      reason_code: "KNOWN_VULNERABILITY_RANGE_NOT_MACHINE_VERIFIABLE",
      coverage_complete: false,
      settlement_success: true,
      settlement_transaction: "0x07ef1d9a4d44409832c99a02c89b26f665fab7fe07040e7573ab2b81a1fa8b57",
      finding: {
        cve_id: "CVE-2026-4800",
        severity: "CRITICAL",
        cvss_score: 9.8,
        target_version: "4.17.21",
        source: "CIRCL cve.circl.lu and NVD services.nvd.nist.gov",
      },
      note: "The record was substantive, but the captured shape did not expose a machine-checkable affected range accepted by the auditor. Skeptara paid for the call, recorded it, and did not count it toward required coverage.",
    },
    {
      challenge_id: "113cc2c4-94ff-4c47-bf48-66fabc7c9329",
      intent: "CVE_LOOKUP",
      miner_id: "7336",
      miner_name: "SecWire CVE Lookup",
      signal_hash: "0xf06afb2b945cb17eaee44b32ba9a0228052e537c73ab38efde433c2a173e70f4",
      cost_usd: 0.01,
      duration_ms: 908,
      materiality: "BLOCKING",
      reason_code: "KNOWN_VULNERABILITY_AFFECTS_TARGET_DEPENDENCY_VERSION",
      coverage_complete: true,
      settlement_success: true,
      settlement_transaction: "0x171e2fc64a0d33b9726a31e3a45654aa47b2ce94b89f83d74d30fe3b327f5020",
      finding: {
        cve_id: "CVE-2026-2950",
        severity: "MEDIUM",
        cvss_score: 5.3,
        affected_text: "Lodash versions 4.17.23 and earlier",
        fixed_versions: ["4.18.0"],
        target_version: "4.17.21",
        source: "CIRCL cve.circl.lu and NVD services.nvd.nist.gov",
      },
    },
  ],
  challengeResult: {
    challenge_id: "113cc2c4-94ff-4c47-bf48-66fabc7c9329",
    action_fingerprint: "sha256:0260dfd07c6e070bb92c341472834052e72923528d9b53c5c72ed333d9a95867",
    head_sha: "73cf5bdd69163924228e3e21d67fa9f405d99904",
    risk_tier: "MEDIUM",
    required_coverage: 2,
    completed_coverage: 1,
    spend_cap_atomic: 20000,
    spend_observed_atomic: 20000,
    outcome: "BLOCK",
    reason_codes: ["MATERIAL_COUNTER_EVIDENCE_FOUND"],
    started_at: "2026-09-07T01:11:02.705Z",
    completed_at: "2026-09-07T01:11:18.944Z",
    expires_at: "2026-09-07T01:26:18.944Z",
  },
  mergeOutcome: {
    merge_authorized: false,
    merged: false,
    merged_at: null,
    merge_commit_sha: null,
    human_bounded_authorization: null,
    merge_adapter_calls: 0,
  },
};

export const cleanCase: DemoCase = {
  id: "pr2",
  label: "PR #2 clean case",
  sourceEvidencePath: "evidence/t4/pr2-clean-run-005/reviewed-challenge.sanitized.json",
  actionSnapshot: {
    repository: "Faadil1/Faadil1-skeptara-telegraph",
    pr_number: 2,
    head_sha: "528d730f9ebdcb433e01ba9c79dcc9a5f66ce1c7",
    base_branch: "main",
    changed_files: ["demo/controlled-clean/package.json"],
    dependency_changes: [
      { name: "lodash", from: "4.17.20", to: "4.18.1", type: "runtime", security_sensitive: false },
    ],
    security_sensitive_surfaces: [],
    action_fingerprint: "sha256:2f5852b5359d3c2d20525ec21904a737f0ee015194e9ea42d14bbca3fc92ad94",
  },
  riskAssessment: {
    risk_tier: "MEDIUM",
    reason_codes: ["DEPENDENCY_CHANGE"],
    required_evidence_paths: 2,
    cross_intent_policy: "PREFERRED",
    spend_cap_atomic: 20000,
    spend_asset: "USDC",
    spend_network: "eip155:84532",
    policy_version: "skeptara-risk-v0.1",
  },
  evidenceItems: [
    {
      challenge_id: "f4f075f3-1dbc-42ed-9843-dbec43de3430",
      intent: "CVE_LOOKUP",
      miner_id: "20260828",
      miner_name: "PREFLIGHT Infrastructure Signals",
      signal_hash: "0x6fb03bd05e93fe05b34a1494266f36111b41ce0dea02371e39432ce5bb3e9f91",
      cost_usd: 0.01,
      duration_ms: null,
      materiality: "ADVISORY",
      reason_code: "KNOWN_VULNERABILITY_DOES_NOT_MATCH_TARGET_VERSION_RANGE",
      coverage_complete: true,
      settlement_success: true,
      settlement_transaction: "0x66bd41892d411b9be502759fc4259d2bec8821fd818385cc5eabb950589ab2a2",
      finding: {
        cve_id: "CVE-2026-4800",
        affected_text: "lodash 4.0.0 through versions before 4.18.0",
        target_version: "4.18.1",
      },
    },
    {
      challenge_id: "f4f075f3-1dbc-42ed-9843-dbec43de3430",
      intent: "CVE_LOOKUP",
      miner_id: "7336",
      miner_name: "SecWire CVE Lookup",
      signal_hash: "0x5bd2f188ac778197f05b479af272cabe493b425c040d96a69c336555a83ffee6",
      cost_usd: 0.01,
      duration_ms: null,
      materiality: "ADVISORY",
      reason_code: "KNOWN_VULNERABILITY_DOES_NOT_MATCH_TARGET_VERSION_RANGE",
      coverage_complete: true,
      settlement_success: true,
      settlement_transaction: "0x95e44b463cb6cafd4b1c56a9889930c1180d084a5e709ccf410296ca465d1e1b",
      finding: {
        cve_id: "CVE-2026-2950",
        affected_text: "lodash 4.17.23 and earlier; fixed in 4.18.0",
        target_version: "4.18.1",
      },
    },
  ],
  challengeResult: {
    challenge_id: "f4f075f3-1dbc-42ed-9843-dbec43de3430",
    action_fingerprint: "sha256:2f5852b5359d3c2d20525ec21904a737f0ee015194e9ea42d14bbca3fc92ad94",
    head_sha: "528d730f9ebdcb433e01ba9c79dcc9a5f66ce1c7",
    risk_tier: "MEDIUM",
    required_coverage: 2,
    completed_coverage: 2,
    spend_cap_atomic: 20000,
    spend_observed_atomic: 20000,
    outcome: "PASS",
    reason_codes: ["REQUIRED_COVERAGE_COMPLETE_NO_BLOCKING_EVIDENCE"],
    started_at: "2026-09-07T01:35:36.716Z",
    completed_at: "2026-09-07T01:35:49.772Z",
    expires_at: "2026-09-07T01:50:49.772Z",
  },
  mergeOutcome: {
    merge_authorized: true,
    merged: true,
    merged_at: "2026-09-07T01:44:54Z",
    merge_commit_sha: "c76c76e0c02dab28275d8e53d70da3f6f132e648",
    human_bounded_authorization: "EXPLICIT_PASS",
    merge_adapter_calls: null,
  },
};

export const demoCases: DemoCase[] = [challengedCase, cleanCase];

export function getCase(id: string): DemoCase | undefined {
  return demoCases.find((c) => c.id === id);
}

export function atomicToUsd(atomic: number): number {
  return (atomic / 10000) * 0.01;
}
