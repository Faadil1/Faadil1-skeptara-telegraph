import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { challengedCase, cleanCase, demoCases, atomicToUsd } from "../data/cases";
import { riskTierPolicy } from "../data/riskPolicy";
import { VerdictBadge } from "../components/VerdictBadge";
import "./Landing.css";

const HERO_LINES = [
  { cmd: true, text: "skeptara check --pr 1 --repo Faadil1/Faadil1-skeptara-telegraph" },
  { cmd: false, text: "risk_tier: MEDIUM  required_evidence_paths: 2" },
  { cmd: false, text: "telegraph: CVE_LOOKUP → SecWire CVE Lookup ($0.01, settled)" },
  { cmd: false, text: "finding: CVE-2026-2950 · lodash <4.18.0 · BLOCKING" },
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

// Real identifiers pulled from the closed runs — miners, intents, policy/auditor
// versions actually used. Not a decorative filler list.
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
    body: "A coding agent opens a pull request that changes a dependency. Skeptara canonicalizes the exact change — repo, head SHA, base branch, what actually moved.",
  },
  {
    n: 2,
    title: "Risk assessed",
    body: "A deterministic rubric, external to the reviewed agent, assigns LOW / MEDIUM / HIGH. The agent cannot set its own risk tier.",
  },
  {
    n: 3,
    title: "Independent challenge",
    body: "A separate auditor pays real Telegraph miners for counter-evidence. Required coverage scales with risk tier — the riskier the change, the more independent evidence it has to survive.",
  },
  {
    n: 4,
    title: "Verdict + merge gate",
    body: "PASS, BLOCK, or ESCALATE. Only a fresh PASS — bound to the exact reviewed head — unlocks the merge gate.",
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
        </div>
      ))}
    </div>
  );
}

const FAQ_ITEMS = [
  {
    q: "Is this using real Telegraph calls, or simulated?",
    a: "Real. Both closed cases below made real, paid calls to real Telegraph miners on Base Sepolia — real signal hashes, real x402 settlements. Nothing about the evidence itself is simulated.",
  },
  {
    q: "Why does the PR #1 evidence log stop at 1 of 2 coverage?",
    a: "It hit blocking evidence on the first completed path and stopped — not because anything failed. Once material counter-evidence is found, spending the rest of the budget to complete coverage wouldn't change the outcome, so the challenge ends early.",
  },
  {
    q: "What happens on ESCALATE, and has it actually been triggered in this demo?",
    a: "ESCALATE is a real, fully supported outcome — it fires when required coverage can't be completed, a source is unavailable, or a finding is too ambiguous to resolve automatically. Neither of the two closed cases below has triggered it. We say so directly rather than fabricating a third case to look complete.",
  },
  {
    q: "Is the demo live right now, or replayed from closed runs?",
    a: "The two cases below are real data from two closed T4 challenge runs (Telegraph Protocol Track 3) — not generated live at request time. Each case page replays that recorded evidence with paced loading states for legibility, and says so explicitly. That's a deliberate difference from a team whose check runs fresh per request, not a shortcut we're hiding.",
  },
];

export function Landing() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.hash]);

  return (
    <div className="landing">
      <div className="landing__hero">
        <div className="landing__glow" aria-hidden="true" />
        <h1 className="landing__wordmark">Skeptara</h1>
        <p className="landing__tagline">Independent Counter-Evidence, Before Merge</p>
        <p className="landing__thesis">
          Higher-risk autonomous changes must survive deeper, independently paid
          counter-evidence before a merge can execute.
        </p>

        <div className="terminal">
          <div className="terminal__bar">
            <span className="terminal__dot" />
            <span className="terminal__dot" />
            <span className="terminal__dot" />
            <span className="terminal__bar-title mono">skeptara — independent challenge</span>
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

        <div className="stat-row-3 stat-row-4">
          <div className="stat-col stat-col--policy">
            <span className="stat-col__label mono">
              <span className="stat-col__dot" aria-hidden="true" />
              coverage scales with risk
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
          <StatColumn label="real spend observed" value={`$${totalSpendUsd.toFixed(2)}`} hint="USDC · base sepolia" />
          <StatColumn label="real telegraph calls" value={String(totalEvidenceCalls)} hint="CVE_LOOKUP" />
          <StatColumn label="closed runs" value={`${blockCount} block · ${passCount} pass`} hint="0 escalate (yet)" />
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
          Required evidence scales with risk tier — the rubric decides this, not the reviewed agent:
        </p>
        <TierDiagram />
      </section>

      <section id="why-skeptara" className="landing__why">
        <h2 className="landing__section-title">Why Skeptara</h2>
        <p className="landing__section-note">
          Autonomy gets dangerous when the same agent proposes a change, grades its own risk, and
          authorizes its own merge. Skeptara breaks that loop by construction:
        </p>
        <ul className="why-list">
          <li>
            <strong>The constructor and the auditor are separate components.</strong> The agent
            proposing the change never runs the challenge against itself.
          </li>
          <li>
            <strong>The auditor doesn't see the agent's justification.</strong> It gets the
            canonical action facts — repo, SHA, dependency diff — not a persuasive case for why
            the change is fine.
          </li>
          <li>
            <strong>Risk tier is assigned outside the reviewed agent</strong>, by a deterministic
            rubric it cannot edit at runtime.
          </li>
          <li>
            <strong>PASS/BLOCK/ESCALATE is deterministic</strong> around required coverage and
            material findings — not a vote, not a second opinion from the same model.
          </li>
        </ul>
      </section>

      <section className="landing__cases">
        <h2 className="landing__section-title">Two real closed runs</h2>
        <p className="landing__section-note">
          Both cases below ran against real Telegraph miners on Base Sepolia. Nothing here is
          simulated to fit the story — the challenged case really blocked, the clean case really merged.
        </p>
        <div className="landing__case-grid">
          <CaseCard
            to="/case/pr1"
            eyebrow="PR #1 · challenged"
            title="lodash upgrade with a known vulnerability"
            target="4.17.20 → 4.17.21"
            outcome={challengedCase.challengeResult.outcome as "BLOCK"}
            summary="Independent challenge found blocking counter-evidence on the first completed path and stopped — merge stayed denied."
          />
          <CaseCard
            to="/case/pr2"
            eyebrow="PR #2 · clean"
            title="lodash upgrade past the vulnerable range"
            target="4.17.20 → 4.18.1"
            outcome={cleanCase.challengeResult.outcome as "PASS"}
            summary="Required coverage completed with no blocking evidence — merge was authorized and actually executed."
          />
        </div>
      </section>

      <section className="landing__escalate">
        <div className="landing__escalate-top">
          <VerdictBadge outcome="ESCALATE" />
          <h2 className="landing__section-title landing__escalate-title">A third outcome exists — it just hasn't fired yet</h2>
        </div>
        <p className="landing__section-note">
          <span className="mono">ESCALATE</span> fires when required coverage can't be completed — budget
          exhausted, a source unavailable, or a critical finding too ambiguous to resolve automatically.
          Both demo runs happened to resolve cleanly into a real <span className="mono">BLOCK</span> or{" "}
          <span className="mono">PASS</span>. No real Skeptara run has hit <span className="mono">ESCALATE</span>{" "}
          yet, so there is no case card for it here — showing one would mean inventing a run that never
          happened.
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
