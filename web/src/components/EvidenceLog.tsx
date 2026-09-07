import type { ChallengeResult, EvidenceItem } from "../data/types";
import { SkeletonLines } from "./Skeleton";
import { explorerTxUrl } from "../utils/explorer";
import "./EvidenceLog.css";

const MATERIALITY_LABEL: Record<EvidenceItem["materiality"], string> = {
  BLOCKING: "blocking",
  ADVISORY: "advisory",
  AMBIGUOUS: "ambiguous, not counted",
};

function CoverageNote({ items, result }: { items: EvidenceItem[]; result: ChallengeResult }) {
  if (result.completed_coverage >= result.required_coverage) {
    return (
      <p className="coverage-note coverage-note--complete">
        {result.completed_coverage} of {result.required_coverage} required evidence paths qualified from {items.length} paid calls.
      </p>
    );
  }

  if (result.outcome === "BLOCK") {
    return (
      <p className="coverage-note coverage-note--halted">
        {items.length} paid calls completed. {result.completed_coverage} of {result.required_coverage} paths qualified for coverage.
        The second call returned material blocking evidence, so the final outcome is BLOCK even though qualifying coverage is 1 of 2.
      </p>
    );
  }

  return (
    <p className="coverage-note coverage-note--incomplete">
      {result.completed_coverage} of {result.required_coverage} required evidence paths qualified. Incomplete required coverage cannot produce PASS.
    </p>
  );
}

export function EvidenceLog({
  items,
  result,
  network,
  revealedCount,
  awaitingNext = false,
}: {
  items: EvidenceItem[];
  result: ChallengeResult;
  network?: string;
  revealedCount?: number;
  awaitingNext?: boolean;
}) {
  const shown = revealedCount == null ? items : items.slice(0, revealedCount);
  const showCoverageNote = revealedCount == null || revealedCount >= items.length;

  return (
    <div className="evidence-log">
      {showCoverageNote ? (
        <CoverageNote items={items} result={result} />
      ) : (
        <p className="coverage-note coverage-note--pending" role="status">
          Replaying captured evidence calls from this closed run&hellip;
        </p>
      )}
      <ol className="evidence-log__list">
        {shown.map((item, i) => (
          <li key={i} className={`evidence-row evidence-row--${item.materiality.toLowerCase()}`}>
            <div className="evidence-row__top">
              <span className="evidence-row__intent mono">call {String(i + 1).padStart(2, "0")} · {item.intent}</span>
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
              <span>·</span>
              <span>{item.coverage_complete ? "counts toward coverage" : "does not count toward coverage"}</span>
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
            {(() => {
              const url = explorerTxUrl(network, item.settlement_transaction);
              return url ? (
                <a
                  className="evidence-row__verify mono"
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                >
                  verify this settlement ↗
                </a>
              ) : null;
            })()}
          </li>
        ))}
        {awaitingNext && shown.length < items.length && (
          <li className="evidence-row evidence-row--pending" role="status" aria-label="Loading next evidence path">
            <div className="evidence-row__pending-label mono">next captured evidence call&hellip;</div>
            <SkeletonLines count={2} />
          </li>
        )}
      </ol>
    </div>
  );
}
