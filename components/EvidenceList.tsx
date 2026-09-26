"use client";

import { motion } from "framer-motion";

interface EvidenceListProps {
  evidence: string[];
}

export default function EvidenceList({ evidence }: EvidenceListProps) {
  return (
    <div>
      <h3 className="mb-3 font-mono text-[11px] tracking-[0.12em] text-cyan">
        EVIDENCE
      </h3>
      <ul className="space-y-2">
        {evidence.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.35 }}
            className="flex gap-3 border-b hairline pb-2 font-sans text-sm text-ivory/75 last:border-b-0"
          >
            <span className="mt-0.5 font-mono text-xs text-ivory/30">
              {String(i + 1).padStart(2, "0")}
            </span>
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
