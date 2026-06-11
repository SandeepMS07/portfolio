"use client";

import { motion } from "framer-motion";
import { Clock, Calendar } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog-format";
import { formatPublishedDate } from "@/lib/blog-format";

export function BlogHero({ post }: { post: BlogPostMeta }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border-b border-line pb-10"
    >
      <span className="eyebrow">// blog · long-form</span>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-accent/10 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-accent ring-1 ring-accent/15"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mt-5 text-4xl font-light leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-[3.5rem]">
        {post.title}
      </h1>

      <p className="mt-5 max-w-[52rem] text-base leading-relaxed text-fg-dim sm:text-lg">
        {post.description}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-fg-faint">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          {formatPublishedDate(post.publishedAt)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {post.readingTime}
        </span>
      </div>
    </motion.header>
  );
}
