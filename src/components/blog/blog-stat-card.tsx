"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Stat = {
  value: string;
  label: string;
  sublabel?: string;
};

export function BlogStatGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="my-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="glass rounded-2xl p-5"
        >
          <div className="font-poster text-aurora text-4xl leading-none">
            {s.value}
          </div>
          <div className="mt-3 text-sm font-medium text-fg">{s.label}</div>
          {s.sublabel ? (
            <div className="mt-1 text-xs text-fg-faint">{s.sublabel}</div>
          ) : null}
        </motion.div>
      ))}
    </div>
  );
}

export function BlogPullQuote({
  children,
  attribution,
}: {
  children: ReactNode;
  attribution?: string;
}) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="my-10 border-l-2 border-accent pl-6"
    >
      <p className="text-xl font-light leading-relaxed tracking-tight text-fg sm:text-2xl">
        “{children}”
      </p>
      {attribution ? (
        <footer className="mt-3 text-xs uppercase tracking-[0.15em] text-fg-faint">
          — {attribution}
        </footer>
      ) : null}
    </motion.blockquote>
  );
}
