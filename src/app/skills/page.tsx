import { PageHeader } from "@/components/page-header";
import { SkillGrid } from "@/components/skill-card";

export default function SkillsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Skills"
        subtitle="Backend to frontend to AI/voice systems—tools I use to ship reliable products."
      />
      <SkillGrid />
    </div>
  );
}
