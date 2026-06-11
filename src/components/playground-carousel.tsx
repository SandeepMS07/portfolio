"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

// ---------- Per-category decorative motifs ----------
// Each motif is positioned absolute, behind the card content, with a
// soft gradient overlay handled by the card itself. SVGs use viewBox
// 0 0 200 200 and scale via CSS.

function MotifWaveform({ accent }: { accent: string }) {
  const bars = useMemo(
    () => Array.from({ length: 14 }, (_, i) => ({ i, h: 30 + Math.sin(i * 0.9) * 25 + Math.cos(i * 0.4) * 12 })),
    [],
  );
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full opacity-50">
      {bars.map((b, i) => (
        <motion.rect
          key={i}
          x={20 + i * 12}
          y={100 - b.h / 2}
          width="6"
          height={b.h}
          rx="3"
          fill={accent}
          initial={{ scaleY: 0.4 }}
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }}
          style={{ transformOrigin: "center", transformBox: "fill-box" }}
        />
      ))}
    </svg>
  );
}

function MotifGrid({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full opacity-50">
      <defs>
        <pattern id="grid-motif" width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M 22 0 L 0 0 0 22" fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#grid-motif)" />
      <motion.rect
        x="120"
        y="40"
        width="50"
        height="50"
        rx="6"
        fill="none"
        stroke={accent}
        strokeWidth="1.4"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.rect
        x="40"
        y="110"
        width="36"
        height="36"
        rx="4"
        fill={accent}
        fillOpacity="0.18"
        animate={{ y: [110, 120, 110] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function MotifPulse({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full opacity-60">
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx="140"
          cy="80"
          r="20"
          fill="none"
          stroke={accent}
          strokeWidth="1.4"
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{ scale: [0.5, 2.4, 0.5], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: i * 1.1, ease: "easeOut" }}
          style={{ transformOrigin: "140px 80px" }}
        />
      ))}
      <circle cx="140" cy="80" r="6" fill={accent} />
    </svg>
  );
}

function MotifHex({ accent }: { accent: string }) {
  const hex = "M30,17.32 L60,0 L90,17.32 L90,51.96 L60,69.28 L30,51.96 Z";
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full opacity-45">
      <g fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.55">
        <motion.path
          d={hex}
          transform="translate(20 30)"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3.6, repeat: Infinity, delay: 0 }}
        />
        <motion.path
          d={hex}
          transform="translate(86 30)"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3.6, repeat: Infinity, delay: 0.6 }}
        />
        <motion.path
          d={hex}
          transform="translate(53 88)"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3.6, repeat: Infinity, delay: 1.2 }}
        />
      </g>
    </svg>
  );
}

function MotifPhone({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full opacity-55">
      <g transform="translate(115 30)">
        <rect width="60" height="118" rx="10" fill="none" stroke={accent} strokeWidth="1.6" />
        <rect x="6" y="14" width="48" height="80" rx="4" fill={accent} fillOpacity="0.12" />
        {[0, 1, 2, 3].map((i) => (
          <motion.rect
            key={i}
            x="10"
            y={22 + i * 14}
            width={30 - i * 4}
            height="4"
            rx="2"
            fill={accent}
            fillOpacity="0.6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease }}
            style={{ transformOrigin: "left center", transformBox: "fill-box" }}
          />
        ))}
        <circle cx="30" cy="104" r="3" fill={accent} />
      </g>
    </svg>
  );
}

// ---------- Card palette + motif resolver ----------
type Palette = {
  bg: string;
  accent: string;
  glow: string;
  Motif: ({ accent }: { accent: string }) => React.ReactElement;
};

const palettes: Palette[] = [
  // warm orange (default brand)
  { bg: "from-[#1c0e08] to-[#0d0807]", accent: "#ff7a45", glow: "rgba(255,122,69,0.25)", Motif: MotifWaveform },
  // cool blue
  { bg: "from-[#0a1422] to-[#070c14]", accent: "#5fa5ff", glow: "rgba(95,165,255,0.20)", Motif: MotifGrid },
  // violet
  { bg: "from-[#170a22] to-[#0a050f]", accent: "#a778ff", glow: "rgba(167,120,255,0.22)", Motif: MotifPulse },
  // emerald
  { bg: "from-[#091c18] to-[#06100d]", accent: "#3ddc97", glow: "rgba(61,220,151,0.20)", Motif: MotifHex },
  // amber-rose
  { bg: "from-[#1f0e0e] to-[#100707]", accent: "#ff8466", glow: "rgba(255,132,102,0.22)", Motif: MotifPhone },
  // teal
  { bg: "from-[#062028] to-[#040f14]", accent: "#5fdfff", glow: "rgba(95,223,255,0.22)", Motif: MotifWaveform },
  // pink-orange
  { bg: "from-[#1f0a13] to-[#10060a]", accent: "#ff6699", glow: "rgba(255,102,153,0.22)", Motif: MotifGrid },
];

function paletteFor(index: number, tags: string[]): Palette {
  // Pick motif by primary tag intent, then cycle palette by index for variety.
  const tag = (tags[0] || "").toLowerCase();
  let Motif: Palette["Motif"] = MotifGrid;
  if (tag.includes("ai") || tag.includes("voice")) Motif = MotifWaveform;
  else if (tag.includes("mobile") || tag.includes("ionic")) Motif = MotifPhone;
  else if (tag.includes("real-time") || tag.includes("socket")) Motif = MotifPulse;
  else if (tag.includes("saas") || tag.includes("rbac") || tag.includes("auth")) Motif = MotifHex;
  else if (tag.includes("web")) Motif = MotifGrid;
  const base = palettes[index % palettes.length];
  return { ...base, Motif };
}

// ---------- Carousel ----------
// Autoplay tuning. Long enough to read a card title + first line; short
// enough that the page feels alive when idle.
const AUTOPLAY_INTERVAL_MS = 4000;
// After the user interacts (chevron click, swipe), suspend autoplay
// briefly so we don't fight them. Picks back up once they stop.
const AUTOPLAY_RESUME_AFTER_MS = 8000;

export function PlaygroundCarousel({ projects }: { projects: Project[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  // Paused while the user hovers/focuses the carousel OR for a cooldown
  // after manual navigation. Both signals collapse into one boolean.
  const [isPaused, setIsPaused] = useState(false);
  const interactionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    const card = el.firstElementChild as HTMLElement | null;
    if (card) {
      const cardW = card.getBoundingClientRect().width + 16;
      setActiveIdx(Math.round(el.scrollLeft / cardW));
    }
  }, []);

  useEffect(() => {
    updateEdges();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  // ---- Autoplay ----
  // Drives the carousel forward every AUTOPLAY_INTERVAL_MS while not
  // paused. At end-of-track, smooth-scrolls back to the start so it
  // loops cleanly. Respects prefers-reduced-motion.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion || isPaused) return;

    const id = window.setInterval(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const cardW =
        (el.firstElementChild as HTMLElement | null)?.getBoundingClientRect()
          .width ?? 320;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: cardW + 16, behavior: "smooth" });
      }
    }, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [isPaused]);

  // Pause briefly after explicit user navigation so we don't yank the
  // carousel away from them.
  function bumpInteractionCooldown() {
    setIsPaused(true);
    if (interactionTimerRef.current) {
      clearTimeout(interactionTimerRef.current);
    }
    interactionTimerRef.current = setTimeout(() => {
      // Only un-pause via cooldown if the user isn't still hovering. The
      // hover handlers also write isPaused; they win.
      setIsPaused(false);
      interactionTimerRef.current = null;
    }, AUTOPLAY_RESUME_AFTER_MS);
  }

  // Clean up interaction timer on unmount.
  useEffect(
    () => () => {
      if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    },
    [],
  );

  function scrollBy(dir: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const cardW = (el.firstElementChild as HTMLElement | null)?.getBoundingClientRect().width ?? 320;
    el.scrollBy({ left: dir * (cardW + 16), behavior: "smooth" });
    bumpInteractionCooldown();
  }

  // Jump directly to a card index — powers the dot-indicator clicks.
  function scrollToIndex(i: number) {
    const el = scrollerRef.current;
    if (!el) return;
    const cardW = (el.firstElementChild as HTMLElement | null)?.getBoundingClientRect().width ?? 320;
    el.scrollTo({ left: i * (cardW + 16), behavior: "smooth" });
    bumpInteractionCooldown();
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        // Only unpause when focus leaves the entire carousel subtree.
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={bumpInteractionCooldown}
    >
      {/* prev / next */}
      <div className="pointer-events-none absolute -top-14 right-0 hidden gap-2 sm:flex">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          disabled={!canPrev}
          className={`pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full ring-1 transition-all ${
            canPrev
              ? "cursor-pointer bg-white/8 text-fg ring-white/15 hover:bg-accent/20 hover:text-accent hover:ring-accent/40 active:scale-95"
              : "cursor-not-allowed bg-white/5 text-fg-faint/40 ring-white/8"
          }`}
          aria-label="Previous"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          disabled={!canNext}
          className={`pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full ring-1 transition-all ${
            canNext
              ? "cursor-pointer bg-white/8 text-fg ring-white/15 hover:bg-accent/20 hover:text-accent hover:ring-accent/40 active:scale-95"
              : "cursor-not-allowed bg-white/5 text-fg-faint/40 ring-white/8"
          }`}
          aria-label="Next"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* scroller */}
      <div
        ref={scrollerRef}
        className="no-scrollbar flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 active:cursor-grabbing"
      >
        {projects.map((project, i) => {
          const pal = paletteFor(i, project.tags);
          const Motif = pal.Motif;
          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease }}
              className="snap-start"
            >
              <Link
                href={project.links[0]?.href ?? "#"}
                target="_blank"
                className={`group relative flex h-[280px] w-[280px] shrink-0 flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br ${pal.bg} p-6 ring-1 ring-white/12 transition-transform duration-300 hover:-translate-y-1 sm:w-[320px]`}
              >
                {/* motif (decorative) */}
                <div aria-hidden className="absolute inset-0 -z-0">
                  <Motif accent={pal.accent} />
                </div>
                {/* radial glow accent */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl"
                  style={{ background: pal.glow }}
                />
                {/* darken overlay for text legibility */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
                />

                {/* content (top row) */}
                <div className="relative z-10 flex items-start justify-between gap-3">
                  <span
                    className="rounded-full px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.1em] ring-1 backdrop-blur-sm"
                    style={{
                      color: pal.accent,
                      backgroundColor: `${pal.accent}1f`,
                      borderColor: `${pal.accent}55`,
                    }}
                  >
                    {project.tags[0]}
                  </span>
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-fg ring-1 ring-white/15 transition-colors duration-300 group-hover:bg-white group-hover:text-night"
                  >
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>

                {/* content (bottom) */}
                <div className="relative z-10">
                  <h4 className="text-lg font-semibold leading-snug tracking-tight text-fg">
                    {project.title}
                  </h4>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-fg-dim">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.slice(1, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/10 px-2 py-0.5 text-[0.625rem] font-medium text-fg-dim ring-1 ring-white/12 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* dot indicator — clickable for direct nav */}
      <div className="mt-5 flex items-center justify-center gap-1.5">
        {projects.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to card ${i + 1}`}
            aria-current={i === activeIdx ? "true" : undefined}
            className={`cursor-pointer rounded-full transition-all duration-300 hover:bg-accent/70 ${
              i === activeIdx
                ? "h-1.5 w-6 bg-accent"
                : "h-1.5 w-1.5 bg-white/15 hover:w-3"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
