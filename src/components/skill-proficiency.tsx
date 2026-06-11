"use client";

import { motion, type Variants } from "framer-motion";
import {
  Server,
  Globe2,
  Smartphone,
  Bot,
  ShieldCheck,
  Container,
  type LucideIcon,
} from "lucide-react";
import { skills } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

/* ──────────────────────────────────────────────────────────────
   PROFICIENCY — edit freely. Levels: "expert" | "advanced" | "proficient"
   These are curated highlights per category, not the full tool list.
   ────────────────────────────────────────────────────────────── */
type Level = "expert" | "advanced" | "proficient";

const levelRank: Record<Level, number> = {
  expert: 0,
  advanced: 1,
  proficient: 2,
};

const tierChip: Record<Level, string> = {
  expert:
    "bg-accent/15 text-[#ffb38f] ring-1 ring-accent/40 shadow-[0_0_18px_-6px_rgba(255,94,44,0.6)]",
  advanced: "bg-white/[0.07] text-fg ring-1 ring-white/12",
  proficient: "text-fg-dim ring-1 ring-white/10",
};

type Group = {
  title: string;
  icon: LucideIcon;
  bars: { name: string; level: Level }[];
};

const groups: Group[] = [
  {
    title: "Backend & APIs",
    icon: Server,
    bars: [
      { name: "FastAPI", level: "expert" },
      { name: "Python", level: "expert" },
      { name: "Node.js", level: "advanced" },
      { name: "PostgreSQL", level: "advanced" },
      { name: "MongoDB", level: "advanced" },
      { name: "System Design", level: "advanced" },
      { name: "Microservices", level: "proficient" },
    ],
  },
  {
    title: "Frontend & Web",
    icon: Globe2,
    bars: [
      { name: "Next.js", level: "expert" },
      { name: "React", level: "expert" },
      { name: "TypeScript", level: "advanced" },
      { name: "TailwindCSS", level: "advanced" },
      { name: "Redux / Zustand", level: "advanced" },
      { name: "shadcn/ui", level: "proficient" },
    ],
  },
  {
    title: "AI & Voice",
    icon: Bot,
    bars: [
      { name: "LLM Integrations", level: "advanced" },
      { name: "Ultravox", level: "advanced" },
      { name: "Gemini", level: "advanced" },
      { name: "Voice Bots", level: "advanced" },
      { name: "RAG", level: "proficient" },
      { name: "Vertex AI", level: "proficient" },
    ],
  },
  {
    title: "Auth & Security",
    icon: ShieldCheck,
    bars: [
      { name: "Multi-Tenant Auth", level: "expert" },
      { name: "Keycloak", level: "advanced" },
      { name: "OAuth2 / OIDC", level: "advanced" },
      { name: "SAML 2.0", level: "advanced" },
      { name: "RBAC", level: "advanced" },
      { name: "JWT", level: "advanced" },
    ],
  },
  {
    title: "Mobile",
    icon: Smartphone,
    bars: [
      { name: "Ionic React", level: "advanced" },
      { name: "Capacitor", level: "advanced" },
      { name: "App / Play Store deploy", level: "advanced" },
    ],
  },
  {
    title: "DevOps & Infra",
    icon: Container,
    bars: [
      { name: "Docker", level: "advanced" },
      { name: "Kubernetes", level: "proficient" },
      { name: "Nginx", level: "proficient" },
    ],
  },
];

/* remaining non-graded skills, surfaced as a compact strip */
const extraTitle = "Product & Collaboration";

const panelStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const panelReveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

function Chip({ name, level }: { name: string; level: Level }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-transform duration-200 hover:-translate-y-0.5 ${tierChip[level]}`}
    >
      {level === "expert" && (
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
      )}
      {name}
    </span>
  );
}

function CategoryCard({ group, index }: { group: Group; index: number }) {
  const { icon: Icon } = group;
  const bars = [...group.bars].sort(
    (a, b) => levelRank[a.level] - levelRank[b.level],
  );

  return (
    <motion.div
      variants={panelReveal}
      className="glass glass-sheen card-glow relative flex flex-col overflow-hidden rounded-[1.75rem] p-7 sm:p-8"
    >
      {/* poster index watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-3 right-4 font-poster text-7xl leading-none text-fg/[0.05]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative flex items-center gap-3.5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(255,94,44,0.22),rgba(255,94,44,0.05))] text-accent shadow-[inset_0_0_0_1px_rgba(255,94,44,0.25)]">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-fg">
            {group.title}
          </h3>
          <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-fg-faint">
            {group.bars.length} tools
          </p>
        </div>
      </div>

      <div className="relative mt-6 flex flex-wrap gap-2">
        {bars.map((bar) => (
          <Chip key={bar.name} name={bar.name} level={bar.level} />
        ))}
      </div>
    </motion.div>
  );
}

function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <motion.div
        className="flex w-max gap-2.5 py-1"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 160, ease: "linear", repeat: Infinity }}
      >
        {loop.map((tool, i) => (
          <span
            key={`${tool}-${i}`}
            className="whitespace-nowrap rounded-full bg-white/[0.035] px-3.5 py-1.5 text-xs text-fg-dim ring-1 ring-white/10"
          >
            {tool}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Legend() {
  const entries: { level: Level; label: string }[] = [
    { level: "expert", label: "Expert" },
    { level: "advanced", label: "Advanced" },
    { level: "proficient", label: "Proficient" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      {entries.map((e) => (
        <span
          key={e.level}
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] font-medium ${tierChip[e.level]}`}
        >
          {e.level === "expert" && (
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          )}
          {e.label}
        </span>
      ))}
    </div>
  );
}

export function SkillProficiency() {
  const extras = skills.find((c) => c.title === extraTitle)?.items ?? [];

  // unique flat tool list for the marquee
  const allTools = Array.from(
    new Set(skills.flatMap((c) => c.items)),
  );

  return (
    <div className="space-y-8">
      <Marquee items={allTools} />

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-fg-dim">
          Curated highlights per domain — proficiency at a glance.
        </p>
        <Legend />
      </div>

      <motion.div
        variants={panelStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {groups.map((group, i) => (
          <CategoryCard key={group.title} group={group} index={i} />
        ))}
      </motion.div>

      {/* product & collaboration — not graded, shown as chips */}
      {extras.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className="rounded-[1.75rem] border border-line p-7 sm:p-8"
        >
          <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-fg-faint">
            {extraTitle}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {extras.map((item) => (
              <span
                key={item}
                className="rounded-full bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-fg-dim ring-1 ring-white/10 transition-all duration-200 hover:-translate-y-0.5 hover:text-fg"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
