import { useEffect, useRef } from "react";
import "./CursorGlow.css";

/**
 * Restrained ambient spotlight that follows the cursor. Low opacity, large
 * soft radius per the no-glowing-hovers rule — this is meant to read as
 * texture, not an interactive effect. Skipped entirely for touch input and
 * for prefers-reduced-motion; updates a CSS custom property directly via
 * ref rather than React state so it never triggers a re-render per move.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--cursor-x", `${e.clientX}px`);
        el.style.setProperty("--cursor-y", `${e.clientY}px`);
        el.style.opacity = "1";
        raf = 0;
      });
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
