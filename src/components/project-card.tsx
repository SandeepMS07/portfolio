"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/data";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  index?: number;
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
    >
      <Card
        className={cn(
          "relative h-full cursor-pointer overflow-hidden gap-4 border-white/15 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950/95 shadow-2xl shadow-cyan-500/10",
          project.highlight && "border-cyan-400/40 ring-1 ring-cyan-400/25"
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.08),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(99,102,241,0.08),transparent_35%)]" />
        <div className="relative flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white">
                {project.title}
              </h3>
              <p className="text-sm text-cyan-100/90">{project.role}</p>
            </div>
            {project.highlight ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-50">
                <Star className="h-3.5 w-3.5" />
                Highlight
              </span>
            ) : null}
          </div>

          <p className="text-sm leading-relaxed text-slate-200">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} className="border-white/15 bg-white/5 text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {project.links.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 px-3 py-2 text-xs font-semibold text-cyan-100 transition hover:from-cyan-500/35 hover:to-indigo-500/35"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
