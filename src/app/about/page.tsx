import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";

const highlights = [
  {
    title: "4+ yrs",
    body: "Product engineering across AI, SaaS, and realtime systems.",
  },
  {
    title: "AI Voice/Chat",
    body: "Conversational platforms, speech-to-text, agentic workflows.",
  },
  {
    title: "Reliability",
    body: "Multi-tenant, authz-heavy backends with crisp observability.",
  },
];

const focusAreas = [
  "AI voice/chat systems (Ultravox, Plivo, Gemini)",
  "SaaS platforms with multi-tenant authentication and RBAC",
  "Mobile apps with Ionic React",
  "Real-time systems (Socket.IO)",
];

const values = [
  "Ownership and crisp delivery",
  "Clean abstractions over cleverness",
  "Production-first mindset",
  "Developer UX (reusable components, automation)",
];

const currentFocus = [
  "Shipping AI-driven customer experiences that feel human and reliable.",
  "Designing observability-first services (logs/metrics/traces) for faster iteration.",
  "Creating small, composable UI primitives that scale across products.",
];

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="About"
        subtitle="Full Stack & AI Platform Engineer focused on resilient multi-tenant systems, voice/chat AI, and product velocity."
      />

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-cyan-500/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,208,255,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(94,240,198,0.14),transparent_32%)]" />
        <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.9fr]">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100">
              Product-first AI & Systems
            </div>
            <p className="text-base text-slate-200 leading-relaxed">
              I build AI-driven, multi-tenant SaaS platforms that blend FastAPI
              backends, Next.js frontends, and Ionic mobile experiences. My work
              centers on resilient chat/voice agents, realtime collaboration,
              and enterprise-grade authentication—shipping with a
              production-first mindset.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-lg shadow-cyan-500/5 backdrop-blur"
                >
                  <div className="text-lg font-semibold text-white">
                    {item.title}
                  </div>
                  <p className="text-sm text-slate-300">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <Card className="space-y-3 border-white/10 bg-linear-to-br from-slate-900/80 via-slate-900/60 to-cyan-900/30 shadow-cyan-500/10">
            <h3 className="text-lg font-semibold text-white">Current focus</h3>
            <ul className="space-y-2 text-sm text-slate-200">
              {currentFocus.map((item) => (
                <li key={item} className="flex gap-2">
                  <span
                    className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-3 border-white/10 bg-slate-950/70 shadow-cyan-500/10">
          <h3 className="text-lg font-semibold text-white">What I work on</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            {focusAreas.map((item) => (
              <li key={item} className="flex gap-2">
                <span
                  className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="space-y-3 border-white/10 bg-slate-950/70 shadow-cyan-500/10">
          <h3 className="text-lg font-semibold text-white">
            Engineering values
          </h3>
          <ul className="space-y-2 text-sm text-slate-300">
            {values.map((item) => (
              <li key={item} className="flex gap-2">
                <span
                  className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
