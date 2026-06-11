// Pure types + formatters — safe to import from client components.
// All Node-only logic (fs, gray-matter) lives in blog.ts and must NOT
// be imported from anything tagged "use client".

export type BlogFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  cover?: string;
  draft?: boolean;
};

export type BlogPostMeta = BlogFrontmatter & {
  slug: string;
  readingTime: string;
  readingMinutes: number;
};

export function formatPublishedDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
