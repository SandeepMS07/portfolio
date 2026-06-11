"use client";

import Link from "next/link";
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
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item.link}
          key={item.title + idx.toString()}
          target={item.link.startsWith("http") ? "_blank" : undefined}
          className="glass glass-sheen card-glow group flex h-full flex-col gap-4 rounded-3xl p-6"
        >
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-base font-semibold leading-snug text-fg">
              {item.title}
            </h4>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/8 ring-1 ring-white/12 transition-colors group-hover:bg-accent group-hover:text-night">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
          {item.role && <p className="-mt-2 text-sm text-fg-dim">{item.role}</p>}
          <p className="text-sm leading-relaxed text-fg-dim">
            {item.description}
          </p>
          {item.tags?.length ? (
            <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
              {item.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/8 px-2.5 py-0.5 text-[0.6875rem] text-fg-dim ring-1 ring-white/12"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </Link>
      ))}
    </div>
  );
}
