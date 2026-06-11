"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog-format";
import { formatPublishedDate } from "@/lib/blog-format";

const ease = [0.22, 1, 0.36, 1] as const;

type BlogCardProps = {
  post: BlogPostMeta;
  index?: number;
  wide?: boolean;
};

export function BlogCard({ post, index = 0, wide = false }: BlogCardProps) {
  const num = String(index + 1).padStart(2, "0");
  const primaryTag = post.tags[0];
  const visibleTags = post.tags.slice(1, wide ? 6 : 3);
  const hiddenCount = post.tags.length - (1 + visibleTags.length);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.97, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, ease, layout: { duration: 0.45, ease } }}
      className={`glass card-glow group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-6 sm:p-7 ${
        wide ? "sm:col-span-2" : ""
      }`}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#ff9347] via-accent to-[#e63d12]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[1.75rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(540px circle at 50% -20%, rgba(255,94,44,0.16), transparent 70%)",
        }}
      />

      <Link href={`/blog/${post.slug}`} className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <span className="font-poster leading-[0.85] text-aurora text-5xl">
            {num}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-fg-dim ring-1 ring-white/12 transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <div className="mt-5 flex flex-1 flex-col">
          <span className="w-fit rounded-full bg-accent/10 px-2.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-accent ring-1 ring-accent/15">
            {primaryTag}
          </span>

          <h3
            className={`mt-3 font-semibold leading-snug tracking-tight text-fg ${
              wide ? "text-xl sm:text-2xl" : "text-lg"
            }`}
          >
            {post.title}
          </h3>

          <p
            className={`mt-3 text-sm leading-relaxed text-fg-dim ${
              wide ? "" : "line-clamp-3"
            }`}
          >
            {post.description}
          </p>

          {visibleTags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {visibleTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/8 px-2.5 py-0.5 text-[0.6875rem] text-fg-dim ring-1 ring-white/12"
                >
                  {tag}
                </span>
              ))}
              {hiddenCount > 0 && (
                <span className="px-1.5 py-0.5 text-[0.6875rem] text-fg-faint">
                  +{hiddenCount}
                </span>
              )}
            </div>
          )}

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-5 text-xs text-fg-faint">
            <span>{formatPublishedDate(post.publishedAt)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
