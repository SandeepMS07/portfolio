"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { PageHeader } from "@/components/page-header";
import { SectionLabel } from "@/components/section-label";
import { Recommendations } from "@/components/recommendations";
import { heroProfile } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

/* ---- evidenced impact ---- */
const metrics = [
  { value: "4+", label: "Years shipping production software" },
  { value: "12", label: "Products delivered end-to-end" },
  { value: "6", label: "Apps live on iOS & Android" },
  { value: "Multi-tenant", label: "SSO · RBAC · billing · licensing" },
];

/* ---- systems, framed with technical substance ---- */
const systems: { title: string; body: string; stack: string }[] = [
  {
    title: "AI voice & chat agents",
    body: "Low-latency streaming voice agents and conversational platforms with tool-calling and agentic workflows.",
    stack: "Ultravox · Plivo · Gemini · FastAPI",
  },
  {
    title: "Multi-tenant SaaS",
    body: "Realm-isolated tenancy with enterprise auth, role-based access, metered billing, and signed licensing.",
    stack: "Keycloak · SAML/OIDC · ECDSA · Razorpay",
  },
  {
    title: "LLM orchestration",
    body: "RAG pipelines, structured extraction, and evaluation loops wired into observable backend services.",
    stack: "Python · Vertex AI · MongoDB · PostgreSQL",
  },
  {
    title: "Realtime & mobile",
    body: "Socket.IO collaboration and live auction tooling broadcast at scale; mobile shipped to both stores.",
    stack: "Socket.IO · Ionic React · Capacitor",
  },
];

/* ---- principles ---- */
const principles = [
  {
    title: "Production-first",
    body: "Observable, recoverable, and load-tested before it ships — not after.",
  },
  {
    title: "Clean abstractions",
    body: "Composable primitives over clever one-offs. The next engineer matters.",
  },
  {
    title: "Crisp ownership",
    body: "From architecture to rollout to on-call. I own the outcome, not a ticket.",
  },
];

const coreStack: { group: string; items: string[] }[] = [
  { group: "Backend", items: ["FastAPI", "Python", "Node.js", "PostgreSQL", "MongoDB"] },
  { group: "Frontend", items: ["Next.js", "TypeScript", "React", "Tailwind"] },
  { group: "AI / Voice", items: ["Ultravox", "Gemini", "Vertex AI", "RAG"] },
  { group: "Platform", items: ["Keycloak", "OIDC / SAML", "Docker", "Socket.IO"] },
];

const now = [
  {
    title: "Human, reliable AI",
    body: "Shipping AI-driven customer experiences that feel human and stay reliable under load.",
  },
  {
    title: "Observability-first",
    body: "Designing services around logs, metrics, and traces so iteration stays fast and safe.",
  },
  {
    title: "Composable UI",
    body: "Building small UI primitives and automation that scale cleanly across products.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-20 sm:space-y-28">
      <PageHeader
        index="00"
        title="About"
        subtitle="AI Engineer & Full Stack Developer focused on LLM/voice systems, resilient multi-tenant platforms, and product velocity."
      />

      {/* ---- 01 · profile ---- */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16"
      >
        {/* photo */}
        <div>
          <div className="group relative aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-[1.5rem] ring-1 ring-line-strong">
            <Image
              src={heroProfile.avatar}
              alt={heroProfile.name}
              fill
              sizes="300px"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          </div>
          <div className="mt-5 max-w-[300px]">
            <p className="text-base font-semibold text-fg">{heroProfile.name}</p>
            <p className="text-sm text-fg-dim">{heroProfile.title}</p>
            <div className="mt-4 flex items-center gap-2.5 text-xs text-fg-faint">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              Open to senior roles · Bengaluru, IN
            </div>
          </div>
        </div>

        {/* statement */}
        <div className="flex flex-col justify-center">
          <SectionLabel index="01">Profile</SectionLabel>
          <p className="mt-7 text-2xl font-light leading-snug tracking-tight text-fg sm:text-[2rem] sm:leading-[1.3]">
            I architect and ship{" "}
            <span className="font-medium">AI-driven, multi-tenant platforms</span>{" "}
            end-to-end — from FastAPI backends and{" "}
            <span className="font-medium">LLM &amp; voice agents</span> to Next.js
            surfaces and mobile, with a production-first mindset.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-dim">
            Four-plus years owning systems where reliability is non-negotiable:
            realtime collaboration, enterprise authentication, and observable
            services that hold up under real traffic. I care about clean
            abstractions, fast iteration, and the engineer who inherits the code
            after me.
          </p>
        </div>
      </motion.section>

      {/* ---- 02 · impact (evidenced) ---- */}
      <section>
        <SectionLabel index="02">By the numbers</SectionLabel>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line-strong ring-1 ring-line-strong lg:grid-cols-4"
        >
          {metrics.map((m) => (
            <motion.div
              key={m.label}
              variants={reveal}
              className="bg-night-2/60 p-6 backdrop-blur-sm sm:p-7"
            >
              <div className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                {m.value}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-fg-dim">
                {m.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---- 03 · systems I build ---- */}
      <section>
        <SectionLabel index="03">Systems I build</SectionLabel>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-line-strong ring-1 ring-line-strong sm:grid-cols-2"
        >
          {systems.map((s) => (
            <motion.div
              key={s.title}
              variants={reveal}
              className="group bg-night-2/60 p-7 backdrop-blur-sm transition-colors duration-300 hover:bg-surface/80 sm:p-8"
            >
              <h3 className="text-lg font-semibold tracking-tight text-fg">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-dim">
                {s.body}
              </p>
              <p className="mt-5 font-mono text-xs text-fg-faint transition-colors duration-300 group-hover:text-accent">
                {s.stack}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---- 04 · stack ---- */}
      <section>
        <SectionLabel index="04">Toolkit</SectionLabel>
        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {coreStack.map((col) => (
            <div key={col.group}>
              <p className="text-xs font-semibold uppercase tracking-wider text-fg-faint">
                {col.group}
              </p>
              <ul className="mt-4 space-y-2.5 border-l border-line-strong pl-4">
                {col.items.map((item) => (
                  <li key={item} className="text-sm text-fg-dim">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ---- 05 · principles ---- */}
      <section>
        <SectionLabel index="05">How I work</SectionLabel>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-8 grid gap-10 sm:grid-cols-3 sm:gap-12"
        >
          {principles.map((p, i) => (
            <motion.div key={p.title} variants={reveal}>
              <span className="font-mono text-sm text-fg-faint">
                0{i + 1}
              </span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-fg">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-dim">
                {p.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---- 06 · now ---- */}
      <section>
        <SectionLabel index="06">Currently focused on</SectionLabel>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-8 grid gap-5 sm:grid-cols-3"
        >
          {now.map((item, i) => (
            <motion.div
              key={item.title}
              variants={reveal}
              className="glass glass-sheen card-glow rounded-2xl p-7"
            >
              <span className="font-display text-4xl font-bold leading-none text-aurora">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-base font-semibold text-fg">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-dim">
                {item.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---- 07 · recommendations ---- */}
      <section>
        <SectionLabel index="07">Recommendations</SectionLabel>
        <p className="mt-4 max-w-xl text-sm text-fg-dim">
          What colleagues and clients say — straight from LinkedIn.
        </p>
        <div className="mt-8">
          <Recommendations />
        </div>
      </section>

      {/* ---- closing ---- */}
      <motion.section
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="border-t border-line-strong pt-12"
      >
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-light tracking-tight text-fg sm:text-4xl">
              Let&apos;s build something reliable.
            </h2>
            <p className="mt-3 max-w-md text-sm text-fg-dim">
              Open to senior AI / full-stack roles — from proof-of-concept to
              production rollout.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-night transition-transform duration-300 hover:scale-[1.03]"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-fg ring-1 ring-line-strong transition-colors duration-300 hover:bg-white/8"
            >
              View projects
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
