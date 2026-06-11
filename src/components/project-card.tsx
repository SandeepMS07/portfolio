"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

type ProjectCardProps = {
  project: Project;
  index?: number;
  wide?: boolean;
};

export function ProjectCard({ project, index = 0, wide = false }: ProjectCardProps) {
  const num = String(index + 1).padStart(2, "0");
  const primaryTag = project.tags[0];
  const visibleTags = project.tags.slice(1, wide ? 7 : 4);
  const hiddenCount = project.tags.length - (1 + visibleTags.length);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.97, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, ease, layout: { duration: 0.45, ease } }}
      className={`glass card-glow group relative flex h-full flex-col overflow-hidden rounded-3xl p-5 sm:rounded-[1.75rem] sm:p-7 ${
        wide ? "sm:col-span-2" : ""
      }`}
    >
      {/* featured gradient top accent */}
      {project.highlight && (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#ff9347] via-accent to-[#e63d12]"
        />
      )}

      {/* hover warm glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[1.75rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(540px circle at 50% -20%, rgba(255,94,44,0.16), transparent 70%)",
        }}
      />

      <div
        className={
          wide
            ? "relative grid gap-x-7 gap-y-5 sm:grid-cols-[auto_1fr] sm:items-start"
            : "relative flex h-full flex-col"
        }
      >
        {/* poster number + meta rail */}
        <div
          className={`flex items-center justify-between gap-3 ${
            wide ? "sm:flex-col sm:items-start sm:justify-start sm:gap-4" : ""
          }`}
        >
          <span
            className={`font-poster leading-[0.85] text-aurora ${
              wide ? "text-5xl sm:text-7xl" : "text-4xl sm:text-5xl"
            }`}
          >
            {num}
          </span>
          {project.highlight ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/12 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-accent ring-1 ring-accent/25">
              <Sparkles className="h-3 w-3" />
              Featured
            </span>
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-fg-dim ring-1 ring-white/12 transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          )}
        </div>

        {/* content */}
        <div className={`flex flex-col ${wide ? "" : "mt-5 flex-1"}`}>
          <span className="w-fit rounded-full bg-accent/10 px-2.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-accent ring-1 ring-accent/15">
            {primaryTag}
          </span>

          <h3
            className={`mt-3 font-semibold leading-snug tracking-tight text-fg ${
              wide ? "text-xl sm:text-2xl" : "text-lg"
            }`}
          >
            {project.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-fg-dim">{project.role}</p>

          <p
            className={`mt-3 text-sm leading-relaxed text-fg-dim ${
              wide ? "" : "line-clamp-3"
            }`}
          >
            {project.description}
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

          {/* links */}
          <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-line pt-5">
            {project.links.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                target="_blank"
                className="group/link inline-flex items-center gap-1 text-sm font-medium text-fg-dim transition-colors hover:text-accent"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
