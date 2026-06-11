import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogPostFooter } from "@/components/blog/blog-post-footer";
import { getAdjacentPosts, getAllSlugs, getPostMeta } from "@/lib/blog";

// Static-generate every post at build time so MDX rendering happens
// once per post, never per request.
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostMeta(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} — Sandeep M S`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      tags: post.tags,
      ...(post.cover ? { images: [{ url: post.cover }] } : {}),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostMeta(slug);
  if (!post) notFound();

  // Dynamic import returns the MDX module — Next/MDX gives us the default
  // export as the rendered component.
  const { default: PostContent } = await import(
    `@/content/blog/${slug}.mdx`
  );

  const { prev, next } = getAdjacentPosts(slug);

  return (
    // Outer track is wide (56rem) so figures/diagrams/code can breathe.
    // Inner prose elements (p, h*, ul, blockquote) self-constrain to a
    // narrower track in mdx-elements.tsx for reading comfort. Net effect:
    // diagrams + animated hero + tables get +33% width; paragraphs stay
    // in the ~75-char reading zone.
    <article className="mx-auto max-w-[56rem]">
      <BlogHero post={post} />
      <div className="mt-10">
        <PostContent />
      </div>
      <BlogPostFooter prev={prev} next={next} />
    </article>
  );
}
