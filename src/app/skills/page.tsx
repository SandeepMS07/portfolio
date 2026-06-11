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
    <div className="space-y-20 sm:space-y-28">
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
          className="mt-8 grid gap-10 sm:grid-cols-3 sm:gap-12"
        >
          {spotlights.map((item, i) => (
            <motion.div key={item.title} variants={reveal}>
              <span className="font-poster text-3xl leading-none text-accent/70">
                0{i + 1}
              </span>
              <span className="mt-4 block h-px w-10 bg-line-strong" />
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-fg">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-dim">
                {item.copy}
              </p>
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
