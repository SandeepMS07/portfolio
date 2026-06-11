import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogFrontmatter, BlogPostMeta } from "./blog-format";

// Re-export so server-side callers can import everything from one place.
export type { BlogFrontmatter, BlogPostMeta } from "./blog-format";
export { formatPublishedDate } from "./blog-format";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

function readPostFile(slug: string): { raw: string; data: BlogFrontmatter } {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { raw: content, data: data as BlogFrontmatter };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllPosts(): BlogPostMeta[] {
  return getAllSlugs()
    .map((slug) => {
      const { raw, data } = readPostFile(slug);
      const rt = readingTime(raw);
      return {
        slug,
        ...data,
        readingTime: rt.text,
        readingMinutes: Math.max(1, Math.round(rt.minutes)),
      };
    })
    .filter((post) => !post.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getPostMeta(slug: string): BlogPostMeta | null {
  if (!getAllSlugs().includes(slug)) return null;
  const { raw, data } = readPostFile(slug);
  const rt = readingTime(raw);
  return {
    slug,
    ...data,
    readingTime: rt.text,
    readingMinutes: Math.max(1, Math.round(rt.minutes)),
  };
}

export function getAdjacentPosts(slug: string): {
  prev: BlogPostMeta | null;
  next: BlogPostMeta | null;
} {
  const all = getAllPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: all[idx + 1] ?? null,
    next: all[idx - 1] ?? null,
  };
}
