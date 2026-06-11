"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin } from "lucide-react";
import { recommendations } from "@/lib/data";

type Recommendation = (typeof recommendations)[number];

const ease = [0.22, 1, 0.36, 1] as const;

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Avatar({ r, size }: { r: Recommendation; size: string }) {
  if (r.avatar) {
    return (
      <span
        className={`relative ${size} shrink-0 overflow-hidden rounded-full ring-1 ring-accent/30 transition-all duration-500 group-hover:ring-accent/60`}
      >
        <Image
          src={r.avatar}
          alt={r.name}
          fill
          sizes="56px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </span>
    );
  }
  return (
    <span
      className={`flex ${size} shrink-0 items-center justify-center rounded-full bg-accent/12 text-base font-semibold text-accent ring-1 ring-accent/20 transition-colors duration-500 group-hover:bg-accent/20`}
    >
      {initials(r.name)}
    </span>
  );
}

// Testimonial card — quote on top, person pinned to the bottom.
function TestimonialCard({ r }: { r: Recommendation }) {
  return (
    <figure className="group glass glass-sheen relative flex flex-col gap-5 rounded-3xl p-6 transition-colors duration-500 hover:ring-accent/25">
      <blockquote className="text-[0.9375rem] leading-relaxed text-fg-dim">
        <span
          aria-hidden
          className="mr-0.5 font-display text-2xl font-bold leading-none text-accent/70"
        >
          &ldquo;
        </span>
        {r.quote}
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <Avatar r={r} size="h-12 w-12" />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="truncate text-sm font-semibold text-fg">{r.name}</p>
            <Linkedin className="h-3.5 w-3.5 shrink-0 text-accent" />
          </div>
          <p className="line-clamp-1 text-xs text-fg-dim">{r.title}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function Recommendations() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
      {/* Left: intro + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease }}
      >
        <span className="eyebrow">Recommendations</span>
        <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-tight text-fg sm:text-4xl lg:text-5xl">
          See what <span className="text-fg-dim">others</span>
          <br />
          say <span className="text-fg-dim">about me</span>
        </h2>
        <p className="mt-5 max-w-md text-base leading-relaxed text-fg-dim">
          Engineers, founders, and managers I&apos;ve shipped real systems with
          — in their own words. Want to be the next?
        </p>
        <Link
          href="/contact"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white/8 px-6 py-3 text-sm font-semibold text-fg ring-1 ring-white/15 transition-colors duration-300 hover:bg-accent hover:text-night hover:ring-accent"
        >
          Contact
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </motion.div>

      {/* Right: auto-scrolling vertical column inside a fixed-height window */}
      <div className="marquee-mask-y group relative h-[440px] overflow-hidden lg:h-[540px]">
        <div className="animate-marquee-y flex flex-col gap-4 group-hover:[animation-play-state:paused] group-active:[animation-play-state:paused]">
          {[...recommendations, ...recommendations].map((r, i) => (
            <div
              key={`${r.name}-${i}`}
              aria-hidden={i >= recommendations.length}
            >
              <TestimonialCard r={r} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
