"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArchiveEntry } from "@/lib/types";
import { clearArchive, deleteFromArchive, loadArchive } from "@/lib/storage";

function formatDate(ts: number): string {
  return new Date(ts).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function severityColor(value: number): string {
  if (value >= 80) return "text-tangerine";
  if (value >= 55) return "text-lime";
  return "text-cyan";
}

export default function Archive() {
  const [entries, setEntries] = useState<ArchiveEntry[] | null>(null);

  useEffect(() => {
    setEntries(loadArchive());
  }, []);

  function handleDelete(caseNumber: string) {
    setEntries(deleteFromArchive(caseNumber));
  }

  function handleClear() {
    if (!entries || entries.length === 0) return;
    if (window.confirm("Permanently clear every filed case?")) {
      setEntries(clearArchive());
    }
  }

  if (entries === null) {
    return (
      <div className="px-5 py-20 text-center font-mono text-xs text-ivory/40 sm:px-8">
        Loading case files&hellip;
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 font-mono text-[11px] tracking-[0.14em] text-cyan">
            CASE ARCHIVE
          </p>
          <h1 className="font-display text-4xl italic text-ivory sm:text-5xl">
            Filed excuses
          </h1>
        </div>
        {entries.length > 0 && (
          <button
            onClick={handleClear}
            className="shrink-0 border border-ivory/20 px-4 py-2 font-mono text-[11px] tracking-[0.1em] text-ivory/60 transition-colors hover:border-tangerine hover:text-tangerine"
          >
            CLEAR ALL
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <div className="border border-dashed border-ivory/20 px-6 py-16 text-center">
          <p className="font-display text-xl italic text-ivory/50">
            No cases on file yet.
          </p>
          <p className="mt-2 font-mono text-xs text-ivory/35">
            Every excuse you investigate gets filed here, locally, on this
            device only.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          <AnimatePresence initial={false}>
            {entries.map((entry) => (
              <motion.li
                key={entry.caseNumber}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                className="border border-ivory/15 bg-graphite/40 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] tracking-[0.1em] text-ivory/40">
                      <span>#{entry.caseNumber}</span>
                      <span>{formatDate(entry.timestamp)}</span>
                    </div>
                    <p className="truncate font-display text-base italic text-ivory/60">
                      &ldquo;{entry.excuse}&rdquo;
                    </p>
                    <p className="mt-1 font-sans text-sm font-medium text-ivory">
                      {entry.diagnosisName}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <span
                      className={`font-display text-2xl ${severityColor(
                        entry.severity
                      )}`}
                    >
                      {entry.severity}
                    </span>
                    <button
                      onClick={() => handleDelete(entry.caseNumber)}
                      aria-label={`Delete case ${entry.caseNumber}`}
                      className="font-mono text-[10px] tracking-[0.08em] text-ivory/35 hover:text-tangerine"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
