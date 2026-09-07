import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { challengedCase, cleanCase, demoCases, atomicToUsd } from "../data/cases";
import { riskTierPolicy } from "../data/riskPolicy";
import { VerdictBadge } from "../components/VerdictBadge";
import "./Landing.css";

const HERO_LINES = [
  { cmd: true, text: "skeptara check --pr 1 --repo Faadil1/Faadil1-skeptara-telegraph" },
  { cmd: false, text: "risk_tier: MEDIUM  required_evidence_paths: 2" },
  { cmd: false, text: "call_01: CVE-2026-4800 · AMBIGUOUS · $0.01 · settled" },
  { cmd: false, text: "call_02: CVE-2026-2950 · BLOCKING · $0.01 · settled" },
  { cmd: false, text: "verdict: BLOCK · merge denied · 0 write calls", verdict: "block" as const },
];

const totalSpendUsd = demoCases.reduce(
  (sum, c) => sum + (c.challengeResult.spend_observed_atomic != null ? atomicToUsd(c.challengeResult.spend_observed_atomic) : 0),
  0,
);
const totalEvidenceCalls = demoCases.reduce((sum, c) => sum + c.evidenceItems.length, 0);
const blockCount = demoCases.filter((c) => c.challengeResult.outcome === "BLOCK").length;
const passCount = demoCases.filter((c) => c.challengeResult.outcome === "PASS").length;
const maxRequiredPaths = Math.max(...riskTierPolicy.map((p) => p.requiredPaths));

const marqueeItems = Array.from(
  new Set([
    ...demoCases.flatMap((c) => c.evidenceItems.map((e) => e.miner_name).filter(Boolean)),
    ...demoCases.flatMap((c) => c.evidenceItems.map((e) => e.intent)),
    challengedCase.riskAssessment.policy_version,
    "skeptara-auditor-v0.4-seeded-cve",
    "eip155:84532",
    "PR #1 · BLOCK",
    "PR #2 · PASS",
  ]),
) as string[];

function StatColumn({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="stat-col">
      <span className="stat-col__label mono">
        <span className="stat-col__dot" aria-hidden="true" />
        {label}
      </span>
      <span className="stat-col__value mono">{value}</span>
      {hint && <span className="stat-col__hint mono">{hint}</span>}
    </div>
  );
}

function CaseCard({
  to,
  eyebrow,
  title,
  target,
  outcome,
  summary,
}: {
  to: string;
  eyebrow: string;
  title: string;
  target: string;
  outcome: "PASS" | "BLOCK";
  summary: string;
}) {
  return (
    <Link to={to} className="case-card">
      <div className="case-card__top">
        <span className="case-card__eyebrow mono">{eyebrow}</span>
        <VerdictBadge outcome={outcome} />
      </div>
      <h3 className="case-card__title">{title}</h3>
      <p className="case-card__target mono">{target}</p>
      <p className="case-card__summary">{summary}</p>
    </Link>
  );
}

const HOW_IT_WORKS_STEPS = [
  {
    n: 1,
    title: "PR proposed",
    body: "A coding agent opens a pull request that changes a dependency. Skeptara records the repo, head SHA, base branch, changed files, and dependency diff.",
  },
  {
    n: 2,
    title: "Risk classified",
    body: "A deterministic rubric outside the reviewed agent assigns LOW, MEDIUM, or HIGH. The reviewed agent cannot set its own tier.",
  },
  {
    n: 3,
    title: "Counter-evidence bought",
    body: "A separate auditor pays Telegraph-routed miners for external evidence. The required number of evidence paths and the spend cap come from the risk tier.",
  },
  {
    n: 4,
    title: "Gate decides",
    body: "The result is PASS, BLOCK, or ESCALATE. A merge can proceed only from a fresh PASS bound to the exact reviewed head.",
  },
];

function TierDiagram() {
  return (
    <div className="tier-diagram">
      {riskTierPolicy.map((p) => (
        <div key={p.tier} className="tier-diagram__col">
          <div className="tier-diagram__tier mono">{p.tier}</div>
          <div className="tier-diagram__dots" aria-hidden="true">
            {Array.from({ length: maxRequiredPaths }).map((_, i) => (
              <span
                key={i}
                className={`tier-diagram__dot ${i < p.requiredPaths ? "tier-diagram__dot--filled" : ""}`}
              />
            ))}
          </div>
          <div className="tier-diagram__meta mono">
            {p.requiredPaths} path{p.requiredPaths > 1 ? "s" : ""} · ${p.spendCapUsd.toFixed(2)} cap
          </div>
          <div className="tier-diagram__meta mono">
            {p.tier === "MEDIUM" ? "live proven" : "policy + tests"}
          </div>
        </div>
      ))}
    </div>
  );
}

const FAQ_ITEMS = [
  {
    q: "Are the Telegraph calls real?",
    a: "Yes. The two final T4 cases used paid Telegraph calls on Base Sepolia. The page you are viewing replays captured results, so loading or replaying the page does not make a new payment or network request.",
  },
  {
    q: "Why is PR #1 coverage only 1 of 2 after two paid calls?",
    a: "Coverage counts qualifying evidence paths, not payments. Call 01 returned a substantive but machine-ambiguous record, so it did not count. Call 02 returned material blocking evidence. Both calls were paid and settled. The final outcome is BLOCK.",
  },
  {
    q: "What does ESCALATE mean?",
    a: "ESCALATE is the fail-closed outcome for incomplete coverage, unavailable sources, budget exhaustion, or critical ambiguity. Earlier development runs exercised ESCALATE. Neither of the two final T4 cases ended there.",
  },
  {
    q: "Does Skeptara discover unknown vulnerabilities automatically?",
    a: "No. This hackathon proof uses controlled exact CVE seeds so the auditor can normalize concrete advisory records and version ranges. The proof is about challenge enforcement and evidence handling, not automatic discovery of unknown vulnerabilities.",
  },
  {
    q: "What kind of independence is proven here?",
    a: "The proposing agent, risk policy, auditor, and merge gate are separate components. Telegraph provides externally routed evidence. We do not claim statistical or model-level independence between miners.",
  },
];

export function Landing() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }, [location.hash]);

  return (
    <div className="landing">
      <div className="landing__hero">
        <div className="landing__glow" aria-hidden="true" />
        <h1 className="landing__wordmark">Skeptara</h1>
        <p className="landing__tagline">Challenge the action before it can merge.</p>
        <p className="landing__thesis">
          A coding agent can propose a dependency change. Skeptara decides how much Telegraph-routed counter-evidence that exact change must survive before execution is allowed.
        </p>

        <div className="terminal">
          <div className="terminal__bar">
            <span className="terminal__dot" />
            <span className="terminal__dot" />
            <span className="terminal__dot" />
            <span className="terminal__bar-title mono">captured T4 run · historical replay</span>
          </div>
          <div className="terminal__body mono">
            {HERO_LINES.map((line, i) => (
              <div
                key={i}
                className={`terminal__line ${line.cmd ? "terminal__line--cmd" : ""} ${
                  line.verdict ? `terminal__line--${line.verdict}` : ""
                }`}
              >
                {line.cmd ? <span className="terminal__prompt">$ </span> : null}
                {line.text}
              </div>
            ))}
          </div>
        </div>

        <div className="landing__proof-split" aria-label="Two final T4 outcomes">
          <Link to="/case/pr1" className="proof-split proof-split--block">
            <span className="proof-split__label mono">PR #1 · lodash 4.17.21</span>
            <strong>BLOCK</strong>
            <span>2 paid calls · 1 qualifying path · 0 merge calls</span>
          </Link>
          <Link to="/case/pr2" className="proof-split proof-split--pass">
            <span className="proof-split__label mono">PR #2 · lodash 4.18.1</span>
            <strong>PASS</strong>
            <span>2 of 2 qualifying paths · exact-head merge executed</span>
          </Link>
        </div>

        <div className="stat-row-3 stat-row-4">
          <div className="stat-col stat-col--policy">
            <span className="stat-col__label mono">
              <span className="stat-col__dot" aria-hidden="true" />
              risk policy
            </span>
            <div className="stat-col__policy-rows mono">
              {riskTierPolicy.map((p) => (
                <div key={p.tier} className="stat-col__policy-row">
                  <span>{p.tier}</span>
                  <span>{p.requiredPaths} path{p.requiredPaths > 1 ? "s" : ""}</span>
                  <span>${p.spendCapUsd.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
          <StatColumn label="final T4 spend" value={`$${totalSpendUsd.toFixed(2)}`} hint="4 paid calls · Base Sepolia" />
          <StatColumn label="final T4 calls" value={String(totalEvidenceCalls)} hint="CVE_LOOKUP" />
          <StatColumn label="final T4 outcomes" value={`${blockCount} block · ${passCount} pass`} hint="2 closed cases" />
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="marquee__item">
              {item}
            </span>
          ))}
        </div>
      </div>

      <section id="how-it-works" className="landing__how">
        <h2 className="landing__section-title">How it works</h2>
        <div className="how-steps">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div key={step.n} className="how-step">
              <div className="how-step__n mono">{step.n}</div>
              <div>
                <h3 className="how-step__title">{step.title}</h3>
                <p className="how-step__body">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="landing__section-note how-tier-note">
          The risk rubric sets the required evidence depth and spend cap. MEDIUM is proven live in the two final T4 cases. LOW and HIGH are policy and test proven.
        </p>
        <TierDiagram />
      </section>

      <section id="why-skeptara" className="landing__why">
        <h2 className="landing__section-title">Why Skeptara</h2>
        <p className="landing__section-note">
          The failure mode is simple: an agent should not be able to propose a change, grade its own risk, and unlock its own execution path.
        </p>
        <ul className="why-list">
          <li>
            <strong>The proposer and auditor are separate components.</strong> The proposing agent does not run the challenge against itself.
          </li>
          <li>
            <strong>The auditor receives canonical action facts.</strong> It gets the repo, SHA, dependency diff, and other bounded facts rather than the proposing agent&apos;s persuasive reasoning.
          </li>
          <li>
            <strong>Risk is assigned outside the reviewed agent.</strong> The deterministic rubric cannot be edited by the proposer at runtime.
          </li>
          <li>
            <strong>The gate is deterministic.</strong> Material evidence blocks. Incomplete required coverage escalates. Only a fresh exact PASS can reach merge authorization.
          </li>
        </ul>
      </section>

      <section className="landing__cases">
        <h2 className="landing__section-title">Two captured final T4 cases</h2>
        <p className="landing__section-note">
          Both cases used real Telegraph-routed evidence on Base Sepolia. The challenged case blocked. The clean case passed and was merged after exact-head revalidation and explicit bounded authorization.
        </p>
        <div className="landing__case-grid">
          <CaseCard
            to="/case/pr1"
            eyebrow="PR #1 · challenged"
            title="lodash upgrade still inside the affected range"
            target="4.17.20 → 4.17.21"
            outcome={challengedCase.challengeResult.outcome as "BLOCK"}
            summary="Call 01 was ambiguous and did not count toward coverage. Call 02 returned blocking CVE evidence. The merge gate stayed denied."
          />
          <CaseCard
            to="/case/pr2"
            eyebrow="PR #2 · clean"
            title="lodash upgrade beyond the affected range"
            target="4.17.20 → 4.18.1"
            outcome={cleanCase.challengeResult.outcome as "PASS"}
            summary="Both required evidence paths qualified with no blocking finding. The exact reviewed head was revalidated, authorized, and merged."
          />
        </div>
      </section>

      <section className="landing__escalate">
        <div className="landing__escalate-top">
          <VerdictBadge outcome="ESCALATE" />
          <h2 className="landing__section-title landing__escalate-title">ESCALATE is the fail-closed third outcome</h2>
        </div>
        <p className="landing__section-note">
          <span className="mono">ESCALATE</span> applies when required coverage cannot be completed, a source is unavailable, the spend cap is exhausted before enough qualifying evidence is collected, or critical ambiguity remains. Earlier development runs exercised this path. Neither final T4 case ended in ESCALATE.
        </p>
      </section>

      <section id="faq" className="landing__faq">
        <h2 className="landing__section-title">FAQ</h2>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="faq-item">
              <h3 className="faq-item__q">{item.q}</h3>
              <p className="faq-item__a">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
