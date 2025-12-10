import { ExperienceCard } from "@/components/experience-card";
import { PageHeader } from "@/components/page-header";
import { experiences } from "@/lib/data";

export default function ExperiencePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Experience"
        subtitle="Timeline of roles focused on AI platforms, real-time systems, and multi-tenant SaaS."
      />
      <div className="relative flex flex-col gap-12 py-4">
        <div className="pointer-events-none absolute left-4 top-0 h-full w-px bg-white/12" />
        {experiences.map((item) => (
          <ExperienceCard key={`${item.company}-${item.period}`} item={item} />
        ))}
      </div>
    </div>
  );
}
