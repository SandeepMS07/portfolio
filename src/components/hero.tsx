"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { heroContent, heroProfile, heroHighlights } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

const disciplines = [
  { label: "AI & Voice", value: "LLM · Ultravox" },
  { label: "LLM Apps", value: "RAG · Agents" },
  { label: "Backend & APIs", value: "FastAPI · Python" },
  { label: "Frontend", value: "Next.js · React" },
];

export function Hero() {
  return (
    <section className="relative flex flex-col items-center pt-10 text-center sm:pt-16">
      {/* avatar + availability */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,94,44,0.45),transparent_70%)] blur-2xl"
        />
        <div className="animate-float relative h-24 w-24 overflow-hidden rounded-full ring-1 ring-white/15 sm:h-28 sm:w-28">
          <Image
            src={heroProfile.avatar}
            alt={heroProfile.name}
            fill
            sizes="112px"
            className="object-cover"
            priority
          />
        </div>
        <span className="absolute -bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-white/10 px-3 py-1 text-[0.6875rem] font-medium text-fg ring-1 ring-white/15 backdrop-blur">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60 opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Available for work
        </span>
      </motion.div>

      {/* name */}
      <motion.h1
        className="mt-10 text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-fg sm:mt-12 sm:text-7xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7, ease }}
      >
        Sandeep <span className="text-aurora-shimmer">M S</span>
      </motion.h1>

      {/* role */}
      <motion.p
        className="mt-5 flex items-center gap-3 text-base font-semibold tracking-tight sm:text-xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease }}
      >
        <span className="text-fg">AI Engineer</span>
        <span className="h-1 w-1 rounded-full bg-accent" />
        <span className="text-fg-dim">Full Stack Developer</span>
      </motion.p>

      <motion.p
        className="mt-5 max-w-xl text-base leading-relaxed text-fg-dim"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {heroContent.subheading}
      </motion.p>

      {/* CTAs — dark pills with subtle glow */}
      <motion.div
        className="mt-9 flex w-full flex-row gap-3 sm:w-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        <Link
          href={heroContent.ctaProjects}
          className="btn-shine group relative inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#17120e] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_0_44px_-10px_rgba(255,94,44,0.5)] ring-1 ring-white/12 transition-all duration-300 hover:ring-accent/40 sm:flex-none sm:px-7"
        >
          View Projects
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
        <a
          href={heroContent.ctaResume}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-3.5 text-sm font-semibold text-fg ring-1 ring-white/15 transition-colors duration-300 hover:bg-white/8 sm:flex-none sm:px-7"
        >
          Download Résumé
          <Download className="h-4 w-4" />
        </a>
      </motion.div>

      {/* unified glass bar — profile · divider · discipline tiles */}
      <motion.div
        className="mt-10 w-full max-w-3xl text-left sm:mt-16"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7, ease }}
      >
        <div className="glass glass-sheen flex flex-col gap-6 rounded-3xl p-6 sm:flex-row sm:items-center sm:gap-7">
          <div className="flex items-center gap-4 sm:w-56 sm:shrink-0">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/12">
              <Image
                src={heroProfile.avatar}
                alt={heroProfile.name}
                fill
                sizes="56px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="text-base font-semibold leading-tight text-fg">
                {heroProfile.name}
              </p>
              <p className="text-sm leading-tight text-fg-dim">
                {heroProfile.role}
              </p>
              <p className="mt-1 text-xs text-fg-faint">{heroProfile.period}</p>
            </div>
          </div>

          <div className="hidden w-px self-stretch bg-white/8 sm:block" />
          <div className="h-px w-full bg-white/[0.06] sm:hidden" />

          <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-4">
            {disciplines.map((row) => (
              <div key={row.label}>
                <p className="text-[0.6875rem] uppercase tracking-wide text-fg-faint">
                  {row.label}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-fg">
                  {row.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="mt-8 w-full sm:mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        {/* mobile: always-scrolling marquee */}
        <div className="marquee-mask group overflow-hidden sm:hidden">
          <div className="animate-marquee flex w-max gap-2 group-hover:[animation-play-state:paused]">
            {[...heroHighlights, ...heroHighlights].map((item, i) => (
              <span
                key={`${item}-${i}`}
                aria-hidden={i >= heroHighlights.length}
                className="glass shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[0.6875rem] text-fg-dim"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* desktop: static centered chips */}
        <div className="hidden flex-wrap justify-center gap-2 sm:flex">
          {heroHighlights.map((item) => (
            <span
              key={item}
              className="glass rounded-full px-4 py-2 text-xs text-fg-dim"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
