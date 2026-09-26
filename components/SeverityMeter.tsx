"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SeverityMeterProps {
  severity: number;
}

function severityColor(value: number): string {
  if (value >= 80) return "#FF5A1F"; // tangerine — high
  if (value >= 55) return "#C7F000"; // lime — moderate
  return "#9DEBFF"; // cyan — low
}

export default function SeverityMeter({ severity }: SeverityMeterProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    setDisplay(0);
    const duration = 900;
    const start = performance.now();
    let frame: number;

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * severity));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [severity]);

  const color = severityColor(severity);

  return (
    <div>
      <div className="mb-2 flex items-end justify-between">
        <span className="font-mono text-[11px] tracking-[0.12em] text-ivory/50">
          SEVERITY
        </span>
        <span
          className="font-display text-4xl tabular-nums sm:text-5xl"
          style={{ color }}
        >
          {display}
          <span className="text-lg text-ivory/40"> / 100</span>
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden border border-ivory/15 bg-obsidian">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${severity}%` }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ backgroundColor: color }}
          className="h-full"
        />
      </div>
    </div>
  );
}
