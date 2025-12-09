import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";

const whatIWorkOn = [
  "AI voice/chat systems (Ultravox, Plivo, Gemini)",
  "SaaS platforms with multi-tenant authentication and RBAC",
  "Mobile apps with Ionic React",
  "Real-time systems (Socket.IO)",
];

const engineeringValues = [
  "Ownership",
  "Clean abstractions",
  "Production-first mindset",
  "Developer UX (reusable components, automation)",
];

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="About"
        subtitle="Full Stack & AI Platform Engineer focused on resilient multi-tenant systems, voice/chat AI, and product velocity."
      />
      <Card className="space-y-4">
        <p className="text-slate-200">
          I build AI-driven, multi-tenant SaaS platforms that blend FastAPI backends, Next.js
          frontends, and Ionic mobile experiences. I focus on AI chat/voice agents, real-time
          systems, and enterprise auth—shipping reliable products with a production-first mindset.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">What I work on</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {whatIWorkOn.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Engineering values</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {engineeringValues.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
