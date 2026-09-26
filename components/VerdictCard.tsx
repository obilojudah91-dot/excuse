"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Diagnosis } from "@/lib/types";
import SeverityMeter from "./SeverityMeter";
import EvidenceList from "./EvidenceList";
import TreatmentCard from "./TreatmentCard";
import Microcopy from "./Microcopy";

interface VerdictCardProps {
  diagnosis: Diagnosis;
  onRoast: () => void;
  onAnother: () => void;
}

const MICROCOPY_ROTATION = [
  "Peer review: unavailable.",
  "Scientific accuracy: questionable.",
  "Confidence: unnecessarily high.",
  "Reviewed by: nobody.",
  "Please do not cite this study.",
];

function formatDate(ts: number): string {
  return new Date(ts).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function buildShareText(d: Diagnosis): string {
  return [
    `CASE #${d.caseNumber}`,
    ``,
    `DIAGNOSIS: ${d.name}`,
    `SEVERITY: ${d.severity}/100`,
    ``,
    `PRIMARY SYMPTOM`,
    d.primarySymptom,
    ``,
    `EVIDENCE`,
    ...d.evidence.map((e) => `- ${e}`),
    ``,
    `RECOMMENDED TREATMENT`,
    d.treatment,
    ``,
    `RELAPSE PROBABILITY: ${d.relapseProbability}%`,
    ``,
    `— filed by EXCUSE™, Dept. of Completely Unnecessary Analysis`,
  ].join("\n");
}

export default function VerdictCard({
  diagnosis,
  onRoast,
  onAnother,
}: VerdictCardProps) {
  const [copied, setCopied] = useState(false);
  const stamp = MICROCOPY_ROTATION[diagnosis.severity % MICROCOPY_ROTATION.length];

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(buildShareText(diagnosis));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl px-5 pb-24 sm:px-8"
    >
      <div className="border border-ivory/20 bg-graphite/40">
        {/* Header strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b hairline px-6 py-4">
          <span className="font-mono text-[11px] tracking-[0.12em] text-ivory/50">
            CASE #{diagnosis.caseNumber}
          </span>
          <span className="font-mono text-[10px] tracking-[0.1em] text-ivory/35">
            {formatDate(diagnosis.timestamp)}
          </span>
        </div>

        <div className="space-y-8 px-6 py-7 sm:px-8 sm:py-9">
          {/* Excuse under review */}
          <div>
            <span className="font-mono text-[10px] tracking-[0.12em] text-ivory/40">
              EXCUSE UNDER REVIEW
            </span>
            <p className="mt-2 font-display text-base italic text-ivory/70">
              &ldquo;{diagnosis.excuse}&rdquo;
            </p>
          </div>

          {/* Diagnosis */}
          <div>
            <span className="font-mono text-[10px] tracking-[0.12em] text-ivory/40">
              DIAGNOSIS
            </span>
            <h2 className="mt-1 font-display text-3xl leading-tight text-ivory sm:text-4xl">
              {diagnosis.name}
            </h2>
          </div>

          <SeverityMeter severity={diagnosis.severity} />

          <div>
            <h3 className="mb-2 font-mono text-[11px] tracking-[0.12em] text-tangerine">
              PRIMARY SYMPTOM
            </h3>
            <p className="font-sans text-base text-ivory/80">
              {diagnosis.primarySymptom}
            </p>
          </div>

          <EvidenceList evidence={diagnosis.evidence} />

          <div className="border-t hairline pt-7">
            <TreatmentCard
              treatment={diagnosis.treatment}
              relapseProbability={diagnosis.relapseProbability}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t hairline pt-6">
            <Microcopy text={stamp} tone="graphite" />
            <Microcopy text="Not a real diagnosis" tone="cyan" />
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 gap-px border-t hairline bg-ivory/10 sm:grid-cols-3">
          <button
            onClick={handleCopy}
            className="bg-graphite px-4 py-4 font-mono text-xs tracking-[0.1em] text-ivory transition-colors hover:bg-obsidian"
          >
            {copied ? "COPIED ✓" : "COPY VERDICT"}
          </button>
          <button
            onClick={onAnother}
            className="bg-graphite px-4 py-4 font-mono text-xs tracking-[0.1em] text-ivory transition-colors hover:bg-obsidian"
          >
            INVESTIGATE ANOTHER
          </button>
          <button
            onClick={onRoast}
            className="bg-tangerine px-4 py-4 font-mono text-xs tracking-[0.1em] text-obsidian transition-opacity hover:opacity-90"
          >
            ROAST ME HARDER
          </button>
        </div>
      </div>

      <p className="mt-6 text-center font-mono text-[10px] tracking-[0.1em] text-ivory/30">
        Entertainment only. Not medical or psychological advice. Your excuse
        has been escalated, unfortunately, to nowhere.
      </p>
    </motion.div>
  );
}
