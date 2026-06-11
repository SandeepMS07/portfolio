import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { SectionLabel } from "@/components/section-label";
import { BlogCard } from "@/components/blog/blog-card";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Sandeep M S",
  description:
    "Long-form posts on real-world system architecture, AI engineering, and production lessons.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-16 sm:space-y-20">
      <PageHeader
        index="00"
        title="Blog"
        subtitle="Production system writeups — architecture decisions, trade-offs made, lessons learned."
      />

      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <SectionLabel index="01">Selected writing</SectionLabel>
          <span className="rounded-full bg-white/8 px-2 py-0.5 font-mono text-[0.7rem] text-fg-dim ring-1 ring-white/12">
            {String(posts.length).padStart(2, "0")}
          </span>
        </div>

        {posts.length === 0 ? (
          <p className="text-sm text-fg-faint">No posts published yet.</p>
        ) : (
          <div className="grid grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, idx) => (
              <BlogCard
                key={post.slug}
                post={post}
                index={idx}
                // Feature the latest post wide.
                wide={idx === 0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
