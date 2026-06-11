"use client";

import { motion, type Variants } from "framer-motion";
import { PageHeader } from "@/components/page-header";
import { SectionLabel } from "@/components/section-label";
import { SkillProficiency } from "@/components/skill-proficiency";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const spotlights = [
  {
    title: "Systems built for scale",
    copy: "Multi-tenant backends with crisp observability, queues, and real-time pipes.",
  },
  {
    title: "AI-first experiences",
    copy: "Voice/chat agents with guardrails, tool-use, and latency-aware UX.",
  },
  {
    title: "Delivery & flow",
    copy: "Developer ergonomics, reusable UI primitives, and production-readiness.",
  },
];

export default function SkillsPage() {
  return (
    <div className="space-y-14 sm:space-y-28">
      <PageHeader
        index="00"
        title="Skills"
        subtitle="Backend to frontend to AI/voice systems — the tools I reach for to ship reliable products."
      />

      {/* ---- 01 · what I optimize for ---- */}
      <section>
        <SectionLabel index="01">What I optimize for</SectionLabel>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-12"
        >
          {spotlights.map((item, i) => (
            <motion.div
              key={item.title}
              variants={reveal}
              className="flex items-start gap-4 rounded-2xl bg-white/[0.035] p-5 ring-1 ring-white/10 sm:block sm:rounded-none sm:bg-transparent sm:p-0 sm:ring-0"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 font-poster text-2xl leading-none text-accent ring-1 ring-accent/20 sm:h-auto sm:w-auto sm:rounded-none sm:bg-transparent sm:text-3xl sm:text-accent/70 sm:ring-0">
                0{i + 1}
              </span>
              <span className="mt-4 hidden h-px w-10 bg-line-strong sm:block" />
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold tracking-tight text-fg sm:mt-4 sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-dim sm:mt-2">
                  {item.copy}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---- 02 · proficiency ---- */}
      <section>
        <SectionLabel index="02">Depth by domain</SectionLabel>
        <div className="mt-8">
          <SkillProficiency />
        </div>
      </section>
    </div>
  );
}
