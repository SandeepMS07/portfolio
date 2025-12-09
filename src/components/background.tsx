'use client';

import { motion } from "framer-motion";

export function BackgroundFX() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-cyan-500/25 blur-3xl"
        animate={{ x: [0, 30, -20, 0], y: [0, 10, -14, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-indigo-500/25 blur-3xl"
        animate={{ x: [0, -25, 18, 0], y: [0, -12, 16, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-teal-400/15 blur-[120px]"
        animate={{ x: [0, 20, -18, 0], y: [0, -16, 12, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.08),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(99,102,241,0.08),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(45,212,191,0.08),transparent_28%)]" />
      <div className="absolute inset-0 opacity-[0.08] mix-blend-screen">
        <div className="h-full w-full bg-[linear-gradient(120deg,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:120px_120px]" />
      </div>
      <motion.div
        className="absolute left-1/4 top-10 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-400/30 via-transparent to-indigo-400/20 blur-3xl"
        animate={{ rotate: [0, 12, -8, 0], scale: [1, 1.05, 0.98, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-1/4 bottom-12 h-72 w-72 rounded-full bg-gradient-to-tl from-indigo-500/25 via-transparent to-cyan-300/20 blur-3xl"
        animate={{ rotate: [0, -10, 6, 0], scale: [1, 0.97, 1.04, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-x-0 top-1/3 h-20 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent blur-2xl"
        animate={{ x: ["-10%", "10%", "-8%", "0%"], opacity: [0.35, 0.6, 0.4, 0.5] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-x-10 bottom-1/4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{ x: ["0%", "6%", "-4%", "0%"], opacity: [0.2, 0.5, 0.3, 0.4] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
