"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog-format";
import { formatPublishedDate } from "@/lib/blog-format";

// Compact, single-card teaser for embedding inline on pages like
// /experience or /about — gives a contextual nudge into the long-form
// writeups without cloning the homepage BlogTeaser's magazine layout.
export function BlogInlineCard({
  post,
  eyebrow = "Read the writeup",
  intro,
}: {
  post: BlogPostMeta;
  eyebrow?: string;
  intro?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="glass card-glow group relative flex flex-col gap-5 overflow-hidden rounded-3xl p-7 sm:flex-row sm:items-center sm:gap-7"
      >
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#ff9347] via-accent to-[#e63d12]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at 50% -20%, rgba(255,94,44,0.14), transparent 70%)",
          }}
        />

        {/* icon mark */}
        <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/20 transition-colors duration-300 group-hover:bg-accent group-hover:text-night">
          <BookOpen className="h-6 w-6" />
        </span>

        <div className="relative flex-1">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </span>
          <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-fg group-hover:text-accent">
            {post.title}
          </h3>
          {intro ? (
            <p className="mt-2 text-sm leading-relaxed text-fg-dim">{intro}</p>
          ) : (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fg-dim">
              {post.description}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-[0.7rem] text-fg-faint">
            <span>{formatPublishedDate(post.publishedAt)}</span>
            <span className="h-3 w-px bg-line-strong" />
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readingTime}
            </span>
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/8 px-2 py-0.5 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-fg-dim ring-1 ring-white/12"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <span className="relative hidden shrink-0 items-center justify-center self-start rounded-full bg-white/8 p-3 text-fg-dim ring-1 ring-white/12 transition-colors duration-300 group-hover:bg-accent group-hover:text-night sm:flex">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </Link>
    </motion.div>
  );
}
