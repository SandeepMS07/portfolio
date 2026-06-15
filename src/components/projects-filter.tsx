"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { SectionLabel } from "@/components/section-label";
import { projectFilters, projects, type Project } from "@/lib/data";

function matchesFilter(
  project: Project,
  filter: (typeof projectFilters)[number],
) {
  if (filter === "All") return true;
  const tags = project.tags.map((t) => t.toLowerCase());
  if (filter === "AI/Voice")
    return tags.some((t) => t.includes("ai") || t.includes("voice"));
  if (filter === "Mobile")
    return tags.some(
      (t) =>
        t.includes("mobile") ||
        t.includes("ionic") ||
        t.includes("capacitor"),
    );
  if (filter === "SaaS/Auth")
    return tags.some(
      (t) =>
        t.includes("sso") ||
        t.includes("rbac") ||
        t.includes("auth") ||
        t.includes("billing") ||
        t.includes("saas"),
    );
  if (filter === "Real-time")
    return tags.some(
      (t) =>
        t.includes("real-time") ||
        t.includes("socket") ||
        t.includes("websockets"),
    );
  return true;
}

export function ProjectsFilter() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All");

  const filtered = useMemo(
    () => projects.filter((project) => matchesFilter(project, filter)),
    [filter],
  );

  return (
    <div className="space-y-8">
      {/* header: label + count + segmented filter */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <SectionLabel index="01">Selected work</SectionLabel>
          <motion.span
            key={filtered.length}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-full bg-white/8 px-2 py-0.5 font-mono text-[0.7rem] text-fg-dim ring-1 ring-white/12"
          >
            {String(filtered.length).padStart(2, "0")}
          </motion.span>
        </div>

        <div className="glass no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full p-1">
          {projectFilters.map((item) => {
            const active = filter === item;
            return (
              <button
                key={item}
                onClick={() => setFilter(item)}
                type="button"
                className={`relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors duration-300 ${
                  active ? "text-white" : "text-fg-dim hover:text-fg"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filterPill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-accent shadow-[0_8px_24px_-10px_rgba(255,94,44,0.5)]"
                  />
                )}
                <span className="relative z-10">{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* bento grid — featured spans wide, dense packing fills gaps */}
      <motion.div
        layout
        className="grid grid-flow-dense grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              wide={Boolean(project.highlight)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 ? (
        <p className="text-sm text-fg-faint">No projects match this filter.</p>
      ) : null}
    </div>
  );
}
