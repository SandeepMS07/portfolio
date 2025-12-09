'use client';

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { projectFilters, projects, type Project } from "@/lib/data/projects";

function matchesFilter(project: Project, filter: (typeof projectFilters)[number]) {
  if (filter === "All") return true;
  const tags = project.tags.map((t) => t.toLowerCase());
  if (filter === "AI/Voice") return tags.some((t) => t.includes("ai") || t.includes("voice"));
  if (filter === "Mobile")
    return tags.some((t) => t.includes("mobile") || t.includes("ionic") || t.includes("capacitor"));
  if (filter === "SaaS/Auth")
    return tags.some(
      (t) =>
        t.includes("sso") || t.includes("rbac") || t.includes("auth") || t.includes("billing") || t.includes("saas"),
    );
  if (filter === "Real-time")
    return tags.some((t) => t.includes("real-time") || t.includes("socket") || t.includes("websockets"));
  return true;
}

export function ProjectsFilter() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All");

  const filtered = useMemo(
    () => projects.filter((project) => matchesFilter(project, filter)),
    [filter],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {projectFilters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
              filter === item
                ? "border-cyan-400/60 bg-cyan-500/20 text-white shadow-cyan-500/10"
                : "border-white/15 bg-white/5 text-slate-200 hover:border-white/30 hover:bg-white/10"
            }`}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
      {filtered.length === 0 ? (
        <Badge variant="outline">No projects match this filter.</Badge>
      ) : null}
    </div>
  );
}
