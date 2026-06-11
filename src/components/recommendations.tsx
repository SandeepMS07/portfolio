"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Linkedin } from "lucide-react";
import { recommendations } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Recommendations() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="grid gap-5 sm:grid-cols-2"
    >
      {recommendations.map((r) => (
        <motion.figure
          key={r.name}
          variants={reveal}
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="group glass glass-sheen card-glow relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-7 sm:p-8"
        >
          {/* hover warm glow */}
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-[1.75rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(460px circle at 50% 0%, rgba(255,94,44,0.13), transparent 70%)",
            }}
          />

          {/* person header — fixed height so dividers align across cards */}
          <figcaption className="relative flex min-h-[3.5rem] items-center gap-4">
            {r.avatar ? (
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-accent/30 transition-all duration-500 group-hover:ring-accent/60">
                <Image
                  src={r.avatar}
                  alt={r.name}
                  fill
                  sizes="56px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </span>
            ) : (
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent/12 text-base font-semibold text-accent ring-1 ring-accent/20 transition-colors duration-500 group-hover:bg-accent/20">
                {initials(r.name)}
              </span>
            )}

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-base font-semibold text-fg">
                  {r.name}
                </p>
                <Linkedin className="h-3.5 w-3.5 shrink-0 text-accent transition-transform duration-300 group-hover:scale-110" />
              </div>
              <p className="mt-0.5 line-clamp-2 min-h-[2rem] text-xs leading-relaxed text-fg-dim">
                {r.title}
              </p>
              <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-wider text-fg-faint">
                {r.relation}
              </p>
            </div>
          </figcaption>

          {/* divider */}
          <div className="relative my-6 h-px w-full overflow-hidden bg-line-strong">
            <span className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-accent to-transparent transition-all duration-500 group-hover:w-full" />
          </div>

          {/* quote */}
          <blockquote className="relative flex-1 pl-5 text-[0.9375rem] leading-relaxed text-fg-dim">
            <span
              aria-hidden
              className="absolute left-0 top-0 font-display text-3xl font-bold leading-none text-accent/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
            >
              &ldquo;
            </span>
            {r.quote}
          </blockquote>
        </motion.figure>
      ))}
    </motion.div>
  );
}
