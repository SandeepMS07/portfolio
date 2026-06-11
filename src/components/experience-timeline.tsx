"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { MapPin } from "lucide-react";
import type { ExperienceItem } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

type Parsed = {
  startYear: string;
  endLabel: string;
  current: boolean;
};

function parsePeriod(period: string): Parsed {
  const years = period.match(/\d{4}/g) ?? [];
  const current = /present/i.test(period);
  return {
    startYear: years[0] ?? "",
    endLabel: current ? "Now" : years[1] ?? "",
    current,
  };
}

// Strip the parenthetical legal name for a cleaner display.
function displayCompany(company: string) {
  return company.replace(/\s*\(.*?\)\s*/g, "").trim();
}

const stats = [
  { value: "4+", label: "Years shipping" },
  { value: "5", label: "Roles held" },
  { value: "3", label: "Companies" },
];

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  // Measure the timeline height so the progress beam can map scroll → pixels.
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const measure = () => setLineHeight(el.getBoundingClientRect().height);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 30%", "end 70%"],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], [0, lineHeight]);
  const fillOpacity = useTransform(scrollYProgress, [0, 0.04], [0, 1]);

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* ---- overview band ---- */}
      <motion.dl
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-3 divide-x divide-line overflow-hidden rounded-3xl glass glass-sheen"
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={reveal}
            className="flex flex-col items-center gap-1 px-3 py-7 text-center sm:py-9"
          >
            <dt className="order-2 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-fg-faint sm:text-xs">
              {s.label}
            </dt>
            <dd className="order-1 font-display text-4xl font-light leading-none tracking-tight text-fg sm:text-5xl">
              <span className="text-aurora">{s.value}</span>
            </dd>
          </motion.div>
        ))}
      </motion.dl>

      {/* ---- timeline ---- */}
      <motion.ol
        ref={listRef}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative"
      >
        {/* base rail + scroll-linked progress beam */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-2 bottom-3 left-1.5 w-px overflow-hidden bg-line-strong sm:left-[calc(7.5rem+6px)] md:left-[calc(9rem+6px)]"
        >
          <motion.div
            style={{ height: fillHeight, opacity: fillOpacity }}
            className="absolute left-0 top-0 w-px bg-gradient-to-b from-violet via-cyan to-magenta"
          >
            {/* glowing leading edge that travels with the scroll */}
            <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-cyan shadow-[0_0_12px_3px_rgba(54,214,231,0.7)]" />
          </motion.div>
        </div>

        {items.map((item, i) => {
          const { startYear, endLabel, current } = parsePeriod(item.period);
          const isLast = i === items.length - 1;

          return (
            <motion.li
              key={`${item.company}-${item.period}`}
              variants={reveal}
              className="group grid gap-x-6 sm:grid-cols-[5.5rem_1fr] sm:gap-x-8 md:grid-cols-[7rem_1fr]"
            >
              {/* date column */}
              <div className="hidden flex-col items-end pt-1 text-right sm:flex">
                <span className="font-display text-3xl font-light leading-none tracking-tight text-fg md:text-4xl">
                  {startYear}
                </span>
                <span
                  className={`mt-2 font-mono text-[0.7rem] ${
                    current ? "text-aurora font-semibold" : "text-fg-faint"
                  }`}
                >
                  {endLabel === "Now" ? "→ Now" : `→ ${endLabel}`}
                </span>
              </div>

              {/* rail + content */}
              <div
                className={`relative pl-8 sm:pl-9 ${isLast ? "pb-0" : "pb-12 sm:pb-14"}`}
              >
                {/* node */}
                <span
                  aria-hidden
                  className={`absolute left-0 top-[7px] flex h-3.5 w-3.5 items-center justify-center rounded-full transition-all duration-300 ${
                    current
                      ? "bg-violet shadow-[0_0_0_4px_rgba(124,92,255,0.18),0_0_16px_3px_rgba(124,92,255,0.55)]"
                      : "border border-violet/60 bg-surface shadow-[0_0_0_4px_rgba(124,92,255,0.1)] group-hover:bg-violet group-hover:shadow-[0_0_14px_2px_rgba(124,92,255,0.5)]"
                  }`}
                >
                  {current && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet/50" />
                  )}
                </span>

                <article
                  className={`card-glow overflow-hidden rounded-2xl p-5 sm:p-6 ${
                    current ? "glass glass-sheen" : "glass"
                  }`}
                >
                  {/* mobile period */}
                  <span className="mb-2 inline-flex items-center gap-1.5 font-mono text-[0.7rem] text-fg-faint sm:hidden">
                    {item.period}
                    {current && (
                      <span className="text-aurora font-semibold">· Now</span>
                    )}
                  </span>

                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h3 className="text-lg font-semibold tracking-tight text-fg sm:text-xl">
                      {item.title}
                    </h3>
                    <span className="text-fg-faint">·</span>
                    <span className="text-aurora text-base font-semibold sm:text-lg">
                      {displayCompany(item.company)}
                    </span>
                    {current && (
                      <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-violet/30 bg-violet/[0.07] px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-violet">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet animate-pulse" />
                        Current
                      </span>
                    )}
                  </div>

                  <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-fg-dim">
                    <MapPin className="h-3.5 w-3.5 text-cyan" />
                    {item.location}
                  </p>

                  <ul className="mt-4 space-y-2.5">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm leading-relaxed text-fg-dim">
                        <span
                          aria-hidden
                          className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet to-cyan"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {item.stack && item.stack.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-line bg-white/[0.04] px-2.5 py-1 font-mono text-[0.7rem] text-fg-dim"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </div>
            </motion.li>
          );
        })}
      </motion.ol>
    </div>
  );
}
