import { PageHeader } from "@/components/page-header";
import { SkillGrid } from "@/components/skill-card";
import { Cpu, Workflow, Sparkles } from "lucide-react";

export default function SkillsPage() {
  const cardBackground = "linear-gradient(145deg, #0a1a2c 0%, #0c2038 50%, #0f2a46 100%)";

  const spotlights = [
    {
      title: "Systems built for scale",
      copy: "Multi-tenant backends with crisp observability, queues, and real-time pipes.",
      icon: Cpu,
      background: cardBackground,
    },
    {
      title: "AI-first experiences",
      copy: "Voice/chat agents with guardrails, tool-use, and latency-aware UX.",
      icon: Sparkles,
      background: cardBackground,
    },
    {
      title: "Delivery & flow",
      copy: "Developer ergonomics, reusable UI primitives, and production-readiness.",
      icon: Workflow,
      background: cardBackground,
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Skills"
        subtitle="Backend to frontend to AI/voice systems—tools I use to ship reliable products."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {spotlights.map((item) => (
          <div
            key={item.title}
            className="relative overflow-hidden rounded-2xl border border-white/10 p-4 shadow-lg shadow-cyan-500/10"
            style={{
              background: item.background,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-cyan-100 shadow-inner shadow-cyan-500/20 backdrop-blur">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-slate-200">{item.copy}</p>
            </div>
          </div>
        ))}
      </div>
      <SkillGrid />
    </div>
  );
}
