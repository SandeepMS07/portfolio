"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, FileText } from "lucide-react";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog-format";
import { formatPublishedDate } from "@/lib/blog-format";

const ease = [0.22, 1, 0.36, 1] as const;

// Magazine-spread teaser for the homepage. Visually distinct from the
// /blog listing grid — one big featured lead post (left), stacked
// micro-cards (right) for the rest. Gracefully renders as a single
// hero card when only one post exists.
export function BlogTeaser({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) return null;

  const [lead, ...rest] = posts;
  const showRail = rest.length > 0;

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">Notes from the field · {posts.length}</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-3 max-w-xl text-sm text-fg-dim">
            Long-form writeups on real production systems — architecture
            decisions made, trade-offs accepted, lessons banked.
          </p>
        </div>
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 rounded-full bg-white/5 px-4 py-2 text-xs font-medium text-fg-dim ring-1 ring-white/10 transition-colors hover:bg-accent/15 hover:text-accent hover:ring-accent/30"
        >
          All writing
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div
        className={`grid gap-4 ${
          showRail ? "lg:grid-cols-[1.55fr_1fr]" : ""
        }`}
      >
        {/* ── Lead post ─────────────────────────────────────────── */}
        <motion.article
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="glass glass-sheen card-glow group relative overflow-hidden rounded-3xl"
        >
          {/* gradient top accent rail */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#ff9347] via-accent to-[#e63d12]"
          />

          {/* warm radial on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(640px circle at 50% -20%, rgba(255,94,44,0.18), transparent 70%)",
            }}
          />

          <Link
            href={`/blog/${lead.slug}`}
            className="relative grid gap-5 p-5 sm:gap-7 sm:p-8 md:grid-cols-[1.2fr_1fr] md:items-center"
          >
            {/* mobile-only visual banner (app-style cover) */}
            <div
              aria-hidden
              className="relative flex h-32 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#16171e] to-[#0a0b0f] ring-1 ring-white/8 md:hidden"
            >
              <motion.div
                className="absolute h-40 w-40 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,94,44,0.32), transparent 60%)",
                }}
                animate={{ scale: [0.9, 1.05, 0.9] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute h-20 w-20 rounded-full border border-accent/40"
                animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
              />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-accent bg-night">
                <span className="font-mono text-[0.6rem] font-semibold tracking-[0.18em] text-accent">
                  API
                </span>
              </div>
              <div className="absolute bottom-3 right-4 text-right">
                <div className="font-poster text-2xl leading-none text-aurora">
                  540K+
                </div>
                <div className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-fg-faint">
                  users
                </div>
              </div>
            </div>

            {/* left: copy */}
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/12 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-accent ring-1 ring-accent/25">
                  <FileText className="h-3 w-3" />
                  Latest essay
                </span>
                {lead.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/8 px-2.5 py-0.5 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-fg-dim ring-1 ring-white/12"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-tight text-fg sm:text-3xl">
                {lead.title}
              </h3>

              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-fg-dim sm:text-[0.95rem]">
                {lead.description}
              </p>

              <div className="mt-6 flex items-center gap-4 text-xs text-fg-faint">
                <span>{formatPublishedDate(lead.publishedAt)}</span>
                <span className="h-3 w-px bg-line-strong" />
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {lead.readingTime}
                </span>
              </div>

              <div className="mt-6 sm:mt-7">
                <span className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-night transition-transform duration-300 group-hover:-translate-y-0.5 sm:w-auto sm:py-2 sm:text-xs">
                  Read the writeup
                  <ArrowUpRight className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                </span>
              </div>
            </div>

            {/* right: visual block (cover or generated motif) */}
            <div
              className="relative hidden h-full min-h-[260px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#16171e] to-[#0a0b0f] ring-1 ring-white/8 md:block"
              aria-hidden
            >
              {/* subtle dot grid */}
              <svg className="absolute inset-0 h-full w-full opacity-50">
                <defs>
                  <pattern
                    id="teaser-dots"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="1" cy="1" r="0.8" fill="#ffffff14" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#teaser-dots)" />
              </svg>

              {/* concentric pulse — same motif as the post hero */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="absolute h-56 w-56 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,94,44,0.32), transparent 60%)",
                  }}
                  animate={{ scale: [0.9, 1.05, 0.9] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute h-32 w-32 rounded-full border border-accent/40"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-accent bg-night">
                  <span className="font-mono text-[0.65rem] font-semibold tracking-[0.18em] text-accent">
                    API
                  </span>
                </div>
              </div>

              {/* eyebrow inside the block */}
              <div className="absolute left-5 top-5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-fg-faint">
                // architecture
              </div>
              {/* stat callouts */}
              <div className="absolute bottom-5 right-5 text-right">
                <div className="font-poster text-3xl leading-none text-aurora">
                  540K+
                </div>
                <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-fg-faint">
                  users
                </div>
              </div>
            </div>
          </Link>
        </motion.article>

        {/* ── Right rail of older posts ─────────────────────────── */}
        {showRail ? (
          <div className="flex flex-col gap-4">
            {rest.slice(0, 3).map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="glass card-glow group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/8 px-2.5 py-0.5 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-fg-dim ring-1 ring-white/12">
                      {post.tags[0]}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-fg-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>
                  <h4 className="text-sm font-semibold leading-snug text-fg group-hover:text-accent">
                    {post.title}
                  </h4>
                  <p className="line-clamp-2 text-xs leading-relaxed text-fg-dim">
                    {post.description}
                  </p>
                  <div className="mt-auto flex items-center gap-3 text-[0.7rem] text-fg-faint">
                    <span>{formatPublishedDate(post.publishedAt)}</span>
                    <span className="h-3 w-px bg-line-strong" />
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readingTime}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* "more" affordance — only when there's a 4th+ post */}
            {rest.length > 3 ? (
              <Link
                href="/blog"
                className="glass card-glow group flex items-center justify-between gap-3 rounded-2xl p-4 text-xs font-medium text-fg-dim hover:text-accent"
              >
                <span>+{rest.length - 3} more in the archive</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
