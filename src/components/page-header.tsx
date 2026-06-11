"use client";

import { motion } from "framer-motion";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  index?: string;
};

export function PageHeader({ title, subtitle, index }: PageHeaderProps) {
  return (
    <motion.div
      className="border-b border-line pb-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <span className="eyebrow">{index ?? "//"} {title}</span>
      <h1 className="mt-4 text-5xl font-light tracking-tight text-fg sm:text-7xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-4 max-w-2xl text-base text-fg-dim">{subtitle}</p>
      ) : null}
    </motion.div>
  );
}
