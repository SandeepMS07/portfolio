"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type HoverCardItem = {
  title: string;
  description: string;
  link: string;
  role?: string;
  tags?: string[];
  linkLabel?: string;
};

type HoverEffectProps = {
  items: HoverCardItem[];
  className?: string;
};

export function HoverEffect({ items, className }: HoverEffectProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 py-6",
        className,
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item.link}
          key={item.title + idx.toString()}
          className="group relative block h-full w-full p-1"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-cyan-400/5"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.18 } }}
                exit={{ opacity: 0, transition: { duration: 0.18, delay: 0.12 } }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-2">
                <CardTitle>{item.title}</CardTitle>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-cyan-100">
                  {item.linkLabel ?? "View"}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
              {item.role && (
                <p className="text-sm font-medium text-cyan-100/85">{item.role}</p>
              )}
              <CardDescription>{item.description}</CardDescription>
              {item.tags?.length ? (
                <div className="flex flex-wrap gap-2">
                  {item.tags.slice(0, 6).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative z-10 h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur",
        "shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-transform duration-200 group-hover:-translate-y-[2px]",
        className,
      )}
    >
      <div className="relative z-20 p-4">{children}</div>
    </div>
  );
}

export function CardTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h4 className={cn("text-lg font-semibold tracking-tight text-white", className)}>{children}</h4>
  );
}

export function CardDescription({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={cn("text-sm leading-relaxed text-slate-200/90", className)}>{children}</p>
  );
}
