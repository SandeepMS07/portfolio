'use client';

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
      <Card className={cn("relative h-full gap-3", project.highlight && "border-cyan-400/50")}>
        {project.highlight ? (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-cyan-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100">
            <Star className="h-3.5 w-3.5" />
            Highlight
          </span>
        ) : null}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          <p className="text-sm text-cyan-100/90">{project.role}</p>
        </div>
        <p className="text-sm text-slate-300">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-3">
          {project.links.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-cyan-100 transition hover:border-cyan-400/50 hover:bg-white/10"
            >
              {link.label}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
