"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

interface ExcuseInputProps {
  onSubmit: (excuse: string) => void;
  disabled?: boolean;
}

const EXAMPLE = "\u201cI didn't reply because...\u201d";
const MAX_LEN = 280;

export default function ExcuseInput({ onSubmit, disabled }: ExcuseInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
  }

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <form onSubmit={handleSubmit} className="relative">
        {/* Corner brackets — evidence-tag framing device */}
        <span className="pointer-events-none absolute -left-2 -top-2 h-5 w-5 border-l-2 border-t-2 border-lime sm:-left-3 sm:-top-3 sm:h-6 sm:w-6" />
        <span className="pointer-events-none absolute -right-2 -top-2 h-5 w-5 border-r-2 border-t-2 border-lime sm:-right-3 sm:-top-3 sm:h-6 sm:w-6" />
        <span className="pointer-events-none absolute -bottom-2 -left-2 h-5 w-5 border-b-2 border-l-2 border-lime sm:-bottom-3 sm:-left-3 sm:h-6 sm:w-6" />
        <span className="pointer-events-none absolute -bottom-2 -right-2 h-5 w-5 border-b-2 border-r-2 border-lime sm:-bottom-3 sm:-right-3 sm:h-6 sm:w-6" />

        <div className="border border-ivory/20 bg-graphite/60 p-4 sm:p-6">
          <div className="mb-3 flex items-center justify-between font-mono text-[10px] tracking-[0.12em] text-ivory/45">
            <span>EXHIBIT A &mdash; SUBJECT STATEMENT</span>
            <span>
              {value.length}/{MAX_LEN}
            </span>
          </div>

          <label htmlFor="excuse" className="sr-only">
            Enter your excuse
          </label>
          <textarea
            id="excuse"
            value={value}
            maxLength={MAX_LEN}
            onChange={(e) => setValue(e.target.value)}
            placeholder={EXAMPLE}
            rows={3}
            disabled={disabled}
            className="w-full resize-none bg-transparent font-display text-xl italic text-ivory placeholder:text-ivory/30 focus:outline-none sm:text-2xl"
          />

          <div className="mt-4 flex flex-col gap-3 border-t hairline pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[10px] tracking-[0.1em] text-ivory/40">
              NO ACCOUNT REQUIRED &bull; COMPLETELY UNQUALIFIED &bull; 100%
              UNNECESSARY
            </p>

            <motion.button
              type="submit"
              disabled={!value.trim() || disabled}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex shrink-0 items-center justify-center gap-2 bg-tangerine px-6 py-3 font-sans text-sm font-medium tracking-wide text-obsidian transition-opacity disabled:cursor-not-allowed disabled:opacity-30 sm:px-7 sm:py-3.5"
            >
              INVESTIGATE
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
}
