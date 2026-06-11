import { ExperienceTimeline } from "@/components/experience-timeline";
import { PageHeader } from "@/components/page-header";
import { SectionLabel } from "@/components/section-label";
import { BlogInlineCard } from "@/components/blog/blog-inline-card";
import { experiences } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";

export default function ExperiencePage() {
  const posts = getAllPosts();
  const latest = posts[0];

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

      {latest ? (
        <section>
          <SectionLabel index="02">Behind the work</SectionLabel>
          <p className="mt-4 max-w-xl text-sm text-fg-dim">
            A long-form writeup on one of the systems above — architecture
            decisions, trade-offs, and what the production incident taught me.
          </p>
          <div className="mt-8">
            <BlogInlineCard
              post={latest}
              eyebrow="Architecture deep-dive"
              intro="System topology, real-time scoring engine, the Impact Player mechanic, rotating-JWT auth, DPDP-ready PII at rest — and the production incident that taught me the most."
            />
          </div>
        </section>
      ) : null}
    </div>
  );
}
