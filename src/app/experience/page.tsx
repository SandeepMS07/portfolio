import { ExperienceCard } from "@/components/experience-card";
import { PageHeader } from "@/components/page-header";
import { experiences } from "@/lib/data/experience";

export default function ExperiencePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Experience"
        subtitle="Timeline of roles focused on AI platforms, real-time systems, and multi-tenant SaaS."
      />
      <div className="space-y-4">
        {experiences.map((item) => (
          <ExperienceCard key={`${item.company}-${item.period}`} item={item} />
        ))}
      </div>
    </div>
  );
}
