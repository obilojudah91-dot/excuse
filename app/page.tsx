"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ExcuseInput from "@/components/ExcuseInput";
import InvestigationSequence from "@/components/InvestigationSequence";
import VerdictCard from "@/components/VerdictCard";
import { analyzeExcuse } from "@/lib/diagnosisEngine";
import { saveToArchive } from "@/lib/storage";
import { Diagnosis } from "@/lib/types";

type Stage = "idle" | "investigating" | "verdict";

export default function Home() {
  const [stage, setStage] = useState<Stage>("idle");
  const [pendingExcuse, setPendingExcuse] = useState("");
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);

  function handleInvestigate(excuse: string) {
    setPendingExcuse(excuse);
    setStage("investigating");
  }

  function handleInvestigationComplete() {
    const result = analyzeExcuse(pendingExcuse, false);
    setDiagnosis(result);
    saveToArchive(result);
    setStage("verdict");
  }

  function handleRoast() {
    if (!diagnosis) return;
    const roasted = analyzeExcuse(diagnosis.excuse, true);
    setDiagnosis(roasted);
    saveToArchive(roasted);
  }

  function handleAnother() {
    setDiagnosis(null);
    setPendingExcuse("");
    setStage("idle");
  }

  return (
    <main className="min-h-screen bg-obsidian pb-16">
      <Navigation />

      <AnimatePresence mode="wait">
        {stage === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Hero />
            <ExcuseInput onSubmit={handleInvestigate} />
          </motion.div>
        )}

        {stage === "investigating" && (
          <motion.div
            key="investigating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <InvestigationSequence onComplete={handleInvestigationComplete} />
          </motion.div>
        )}

        {stage === "verdict" && diagnosis && (
          <motion.div
            key="verdict"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-12"
          >
            <VerdictCard
              diagnosis={diagnosis}
              onRoast={handleRoast}
              onAnother={handleAnother}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
