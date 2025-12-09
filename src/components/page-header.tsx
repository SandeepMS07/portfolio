'use client';

import { motion } from "framer-motion";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h1 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
      {subtitle ? <p className="text-slate-300">{subtitle}</p> : null}
    </motion.div>
  );
}
