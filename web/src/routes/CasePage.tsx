import { useParams, Link } from "react-router-dom";
import { getCase, atomicToUsd } from "../data/cases";
import { Panel } from "../components/Panel";
import { Stat, StatRow } from "../components/Stat";
import { VerdictBadge } from "../components/VerdictBadge";
import { EvidenceLog } from "../components/EvidenceLog";
import "./CasePage.css";

function shortSha(sha: string) {
  return sha.slice(0, 10);
}

export function CasePage() {
  const { caseId } = useParams();
  const demoCase = caseId ? getCase(caseId) : undefined;

  if (!demoCase) {
    return (
      <Panel title="Case not found">
        <p>No demo case matches &ldquo;{caseId}&rdquo;.</p>
        <Link to="/">Back to overview</Link>
      </Panel>
    );
  }

  const { actionSnapshot, riskAssessment, evidenceItems, challengeResult, mergeOutcome } = demoCase;
  const spendUsd = challengeResult.spend_observed_atomic != null
    ? atomicToUsd(challengeResult.spend_observed_atomic)
    : null;
  const capUsd = atomicToUsd(riskAssessment.spend_cap_atomic);

  return (
    <div className="case-page">
      <div className="case-page__header">
        <div>
          <div className="case-page__eyebrow mono">
            {actionSnapshot.repository} · PR #{actionSnapshot.pr_number}
          </div>
          <h1 className="case-page__title">{demoCase.label}</h1>
        </div>
        <VerdictBadge outcome={challengeResult.outcome} size="lg" />
      </div>

      <Panel eyebrow="1 · proposed action" title="Action snapshot">
        <StatRow>
          <Stat label="head SHA" value={<span title={actionSnapshot.head_sha}>{shortSha(actionSnapshot.head_sha)}</span>} />
          <Stat label="base branch" value={actionSnapshot.base_branch} />
          <Stat label="changed files" value={actionSnapshot.changed_files.length} />
        </StatRow>
        <div className="case-page__deps">
          {actionSnapshot.dependency_changes.map((dep, i) => (
            <div key={i} className="dep-change mono">
              {dep.name} <span className="dep-change__from">{dep.from}</span>
              <span className="dep-change__arrow"> → </span>
              <span className="dep-change__to">{dep.to}</span>
            </div>
          ))}
        </div>
        <p className="case-page__field-note">
          security-sensitive surfaces:{" "}
          {actionSnapshot.security_sensitive_surfaces.length > 0
            ? actionSnapshot.security_sensitive_surfaces.join(", ")
            : "none flagged"}
        </p>
      </Panel>

      <Panel eyebrow="2 · deterministic rubric" title="Risk assessment">
        <StatRow>
          <Stat label="risk tier" value={riskAssessment.risk_tier} />
          <Stat label="required evidence paths" value={riskAssessment.required_evidence_paths} />
          <Stat label="spend cap" value={`$${capUsd.toFixed(2)}`} hint={`${riskAssessment.spend_asset} on ${riskAssessment.spend_network}`} />
        </StatRow>
        <p className="case-page__field-note">
          reason: {riskAssessment.reason_codes.length > 0 ? riskAssessment.reason_codes.join(", ") : "not exposed"}
        </p>
      </Panel>

      <Panel eyebrow="3 · independent counter-evidence" title="Challenge">
        <EvidenceLog items={evidenceItems} result={challengeResult} />
        <div className="case-page__spend">
          real spend observed: <span className="mono">{spendUsd != null ? `$${spendUsd.toFixed(2)}` : "not exposed"}</span>
          {" "}of <span className="mono">${capUsd.toFixed(2)}</span> cap
        </div>
      </Panel>

      <Panel eyebrow="4 · outcome" title="Verdict">
        <StatRow>
          <Stat label="outcome" value={<VerdictBadge outcome={challengeResult.outcome} />} />
          <Stat
            label="expires"
            value={challengeResult.expires_at ? new Date(challengeResult.expires_at).toLocaleTimeString() : "n/a"}
          />
          <Stat label="merge" value={mergeOutcome.merge_authorized ? "authorized" : "denied"} />
        </StatRow>
        <p className="case-page__field-note">
          reason: {challengeResult.reason_codes.join(", ")}
        </p>
        {mergeOutcome.merged ? (
          <p className="case-page__merge-proof">
            Real merge executed under human-bounded authorization ({mergeOutcome.human_bounded_authorization ?? "unspecified"}).
            Commit{" "}
            <a
              href={`https://github.com/${actionSnapshot.repository}/commit/${mergeOutcome.merge_commit_sha}`}
              target="_blank"
              rel="noreferrer"
              className="mono"
            >
              {mergeOutcome.merge_commit_sha?.slice(0, 10)}
            </a>
            {mergeOutcome.merged_at && ` at ${new Date(mergeOutcome.merged_at).toLocaleString()}`}.
          </p>
        ) : (
          <p className="case-page__merge-proof case-page__merge-proof--denied">
            Merge executor was not authorized to run.
            {mergeOutcome.merge_adapter_calls != null && ` ${mergeOutcome.merge_adapter_calls} merge-adapter calls were made.`}
          </p>
        )}
      </Panel>

      <p className="case-page__source mono">
        source: {demoCase.sourceEvidencePath}
      </p>
    </div>
  );
}
