"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-10 pt-14 sm:px-8 sm:pt-20">
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5 font-mono text-[11px] tracking-[0.14em] text-tangerine"
      >
        DEPARTMENT OF COMPLETELY UNNECESSARY ANALYSIS
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="font-display text-hero-sm text-ivory sm:text-hero lg:text-hero-lg"
      >
        Why didn&rsquo;t
        <br />
        <span className="italic text-lime">you</span> do it?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 max-w-md text-balance font-sans text-base text-ivory/65 sm:text-lg"
      >
        Submit your excuse. Our completely unnecessary investigation
        department will determine what really happened.
      </motion.p>
    </div>
  );
}
