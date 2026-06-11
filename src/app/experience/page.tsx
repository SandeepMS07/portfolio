import { ExperienceTimeline } from "@/components/experience-timeline";
import { PageHeader } from "@/components/page-header";
import { SectionLabel } from "@/components/section-label";
import { experiences } from "@/lib/data";

export default function ExperiencePage() {
  return (
    <div className="space-y-16 sm:space-y-20">
      <PageHeader
        index="00"
        title="Experience"
        subtitle="Timeline of roles focused on AI platforms, real-time systems, and multi-tenant SaaS."
      />
      <section>
        <SectionLabel index="01">Career timeline</SectionLabel>
        <div className="mt-10">
          <ExperienceTimeline items={experiences} />
        </div>
      </section>
    </div>
  );
}
