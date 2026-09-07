import { useEffect, useRef, useState } from "react";

export type ReplayPhase = "action" | "risk" | "challenging" | "done";

const ACTION_DELAY_MS = 350;
const RISK_DELAY_MS = 450;
const EVIDENCE_STEP_MS = 650;
const VERDICT_DELAY_MS = 400;

/**
 * Paces the reveal of an already-closed run so the judge-path states
 * (ASSESSING_RISK / CHALLENGING / verdict) are visible as real transitions
 * instead of a blank screen followed by everything at once. This is a
 * replay of recorded evidence, not a live call — callers must label it
 * as such in the UI.
 */
export function useCaseReplay(caseId: string, evidenceCount: number) {
  const [phase, setPhase] = useState<ReplayPhase>("action");
  const [revealedCount, setRevealedCount] = useState(0);
  const [runToken, setRunToken] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setPhase("action");
    setRevealedCount(0);

    const schedule = (fn: () => void, delay: number) => {
      const id = window.setTimeout(fn, delay);
      timers.current.push(id);
      return delay;
    };

    let t = 0;
    t += schedule(() => setPhase("risk"), (t += ACTION_DELAY_MS));
    schedule(() => setPhase("challenging"), (t += RISK_DELAY_MS));

    for (let i = 1; i <= evidenceCount; i++) {
      t += EVIDENCE_STEP_MS;
      const captured = i;
      schedule(() => setRevealedCount(captured), t);
    }

    schedule(() => setPhase("done"), t + VERDICT_DELAY_MS);

    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseId, evidenceCount, runToken]);

  const replay = () => setRunToken((n) => n + 1);

  return { phase, revealedCount, replay };
}
