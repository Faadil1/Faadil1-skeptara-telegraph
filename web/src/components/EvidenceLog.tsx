import type { ChallengeResult, EvidenceItem } from "../data/types";
import "./EvidenceLog.css";

const MATERIALITY_LABEL: Record<EvidenceItem["materiality"], string> = {
  BLOCKING: "blocking",
  ADVISORY: "advisory",
  AMBIGUOUS: "ambiguous — not counted",
};

function CoverageNote({ result }: { result: ChallengeResult }) {
  const short = result.completed_coverage < result.required_coverage;
  if (!short) {
    return (
      <p className="coverage-note coverage-note--complete">
        {result.completed_coverage} of {result.required_coverage} required evidence paths completed.
      </p>
    );
  }
  if (result.outcome === "BLOCK") {
    return (
      <p className="coverage-note coverage-note--halted">
        {result.completed_coverage} of {result.required_coverage} required evidence paths completed
        — the challenge stopped early. It found blocking evidence before spending the rest of the
        budget on the remaining path, so it never needed to complete coverage.
      </p>
    );
  }
  return (
    <p className="coverage-note coverage-note--incomplete">
      {result.completed_coverage} of {result.required_coverage} required evidence paths completed
      before the budget or window ran out. Incomplete required coverage cannot produce PASS.
    </p>
  );
}

export function EvidenceLog({
  items,
  result,
}: {
  items: EvidenceItem[];
  result: ChallengeResult;
}) {
  return (
    <div className="evidence-log">
      <CoverageNote result={result} />
      <ol className="evidence-log__list">
        {items.map((item, i) => (
          <li key={i} className={`evidence-row evidence-row--${item.materiality.toLowerCase()}`}>
            <div className="evidence-row__top">
              <span className="evidence-row__intent mono">{item.intent}</span>
              <span className={`evidence-row__materiality mono evidence-row__materiality--${item.materiality.toLowerCase()}`}>
                {MATERIALITY_LABEL[item.materiality]}
              </span>
            </div>
            <div className="evidence-row__meta mono">
              <span>{item.miner_name ?? "miner not disclosed"}</span>
              <span>·</span>
              <span>{item.cost_usd != null ? `$${item.cost_usd.toFixed(2)}` : "cost not exposed"}</span>
              <span>·</span>
              <span>
                {item.settlement_success == null
                  ? "settlement not exposed"
                  : item.settlement_success
                    ? "settled"
                    : "settlement failed"}
              </span>
            </div>
            {item.finding?.cve_id && (
              <div className="evidence-row__finding">
                <span className="mono">{item.finding.cve_id}</span>
                {item.finding.severity && (
                  <span className="mono"> · {item.finding.severity}{item.finding.cvss_score != null ? ` (${item.finding.cvss_score})` : ""}</span>
                )}
                {item.finding.affected_text && <div className="evidence-row__affected">{item.finding.affected_text}</div>}
                {item.finding.target_version && (
                  <div className="evidence-row__target">target version: <span className="mono">{item.finding.target_version}</span></div>
                )}
              </div>
            )}
            {item.note && <p className="evidence-row__note">{item.note}</p>}
            {item.signal_hash && (
              <div className="evidence-row__hash mono" title={item.signal_hash}>
                signal {item.signal_hash.slice(0, 10)}&hellip;{item.signal_hash.slice(-6)}
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
