"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Step {
  label: string;
  target: number;
}

const STEPS: Step[] = [
  { label: "Analyzing linguistic patterns", target: 82 },
  { label: "Cross-referencing procrastination indicators", target: 100 },
  { label: "Checking suspicious levels of productivity", target: 71 },
  { label: "Consulting absolutely nobody qualified", target: 100 },
];

const STEP_DURATION = 620;

interface InvestigationSequenceProps {
  onComplete: () => void;
}

export default function InvestigationSequence({
  onComplete,
}: InvestigationSequenceProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (activeStep >= STEPS.length) {
      setDone(true);
      const t = setTimeout(onComplete, 650);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setActiveStep((s) => s + 1), STEP_DURATION);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  return (
    <div
      className="mx-auto max-w-2xl px-5 py-16 sm:px-8"
      role="status"
      aria-live="polite"
    >
      <div className="border border-ivory/20 bg-graphite/60 p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between font-mono text-[10px] tracking-[0.14em] text-ivory/45">
          <span>EXCUSE&trade; INVESTIGATION UNIT</span>
          <span className="text-lime">{done ? "COMPLETE" : "ACTIVE"}</span>
        </div>

        <ul className="space-y-5">
          {STEPS.map((step, i) => {
            const isVisible = i <= activeStep;
            const isCurrent = i === activeStep && !done;
            const pct = i < activeStep || done ? step.target : isCurrent ? step.target : 0;

            return (
              <li
                key={step.label}
                className={`transition-opacity duration-300 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="mb-1.5 flex items-center justify-between font-mono text-xs text-ivory/70">
                  <span>{step.label}&hellip;</span>
                  <span className="tabular-nums text-ivory/45">
                    {isVisible ? `${pct}%` : "0%"}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden bg-obsidian">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: isVisible ? `${pct}%` : "0%" }}
                    transition={{ duration: STEP_DURATION / 1000, ease: "easeOut" }}
                    className={`h-full ${
                      pct === 100 ? "bg-lime" : "bg-cyan"
                    }`}
                  />
                </div>
              </li>
            );
          })}
        </ul>

        {done && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 border-t hairline pt-4 font-display text-lg italic text-lime"
          >
            Investigation complete.
          </motion.p>
        )}
      </div>
    </div>
  );
}
