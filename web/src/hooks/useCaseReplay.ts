import { useEffect, useRef, useState } from "react";

export type ReplayPhase = "action" | "risk" | "challenging" | "done";

const ACTION_DELAY_MS = 350;
const RISK_DELAY_MS = 450;
const EVIDENCE_STEP_MS = 650;
const VERDICT_DELAY_MS = 400;

/**
 * Replays an already-closed run for judge legibility. It never performs a
 * Telegraph request or GitHub write. Callers must keep the historical replay
 * label visible in the UI.
 */
export function useCaseReplay(caseId: string, evidenceCount: number) {
  const [phase, setPhase] = useState<ReplayPhase>("action");
  const [revealedCount, setRevealedCount] = useState(0);
  const [runToken, setRunToken] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setPhase("done");
      setRevealedCount(evidenceCount);
      return;
    }

    setPhase("action");
    setRevealedCount(0);

    const later = (delay: number, fn: () => void) => {
      const id = window.setTimeout(fn, delay);
      timers.current.push(id);
    };

    let elapsed = ACTION_DELAY_MS;
    later(elapsed, () => setPhase("risk"));

    elapsed += RISK_DELAY_MS;
    later(elapsed, () => setPhase("challenging"));

    for (let i = 1; i <= evidenceCount; i += 1) {
      elapsed += EVIDENCE_STEP_MS;
      const count = i;
      later(elapsed, () => setRevealedCount(count));
    }

    elapsed += VERDICT_DELAY_MS;
    later(elapsed, () => setPhase("done"));

    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    };
  }, [caseId, evidenceCount, runToken]);

  const replay = () => setRunToken((n) => n + 1);

  return { phase, revealedCount, replay };
}
