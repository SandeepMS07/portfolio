import { PageHeader } from "@/components/page-header";
import { ProjectsFilter } from "@/components/projects-filter";

export default function ProjectsPage() {
  return (
    <div className="space-y-16 sm:space-y-20">
      <PageHeader
        index="00"
        title="Projects"
        subtitle="Real-world AI, mobile, and SaaS builds with production impact."
      />
      <ProjectsFilter />
    </div>
  );
}
