"use client";

import { motion } from "framer-motion";

// Animated hero for the MCA Fantasy post. Conceptually: a cricket pitch
// (oval + strip) with three data streams flowing across it, each labelled
// for a frontend (Web / Admin / Mobile). The streams converge on a
// central core labelled "Fastify" and pulse outward — the visual metaphor
// for "three frontends, one backend, real-time".
//
// Everything is contained in one component so it can be dropped into MDX
// via <AnimatedHero /> without per-post styling work.

const ease = [0.22, 1, 0.36, 1] as const;
const streams = [
  { id: "web", label: "Web", y: 150, delay: 0 },
  { id: "admin", label: "Admin", y: 300, delay: 0.2 },
  { id: "mobile", label: "Mobile", y: 450, delay: 0.4 },
];

export function BlogAnimatedHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="glass relative my-10 overflow-hidden rounded-3xl"
      style={{ aspectRatio: "1200 / 600" }}
    >
      <svg
        viewBox="0 0 1200 600"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="MCA Fantasy League — three frontends, one backend, real-time"
      >
        <defs>
          <linearGradient id="accent-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ff9347" />
            <stop offset="0.5" stopColor="#ff5e2c" />
            <stop offset="1" stopColor="#e63d12" />
          </linearGradient>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#ff5e2c" stopOpacity="0.55" />
            <stop offset="0.6" stopColor="#ff5e2c" stopOpacity="0.12" />
            <stop offset="1" stopColor="#ff5e2c" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#ff5e2c" stopOpacity="0.18" />
            <stop offset="1" stopColor="#ff5e2c" stopOpacity="0" />
          </radialGradient>
          <pattern
            id="dot-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="#ffffff10" />
          </pattern>
        </defs>

        {/* background */}
        <rect width="1200" height="600" fill="#0a0b0f" />
        <rect width="1200" height="600" fill="url(#dot-grid)" />
        <ellipse cx="800" cy="300" rx="360" ry="220" fill="url(#bg-glow)" />

        {/* cricket field — oval outline + 30-yard circle */}
        <ellipse
          cx="800"
          cy="300"
          rx="280"
          ry="170"
          fill="none"
          stroke="#ffffff14"
          strokeWidth="1.5"
        />
        <ellipse
          cx="800"
          cy="300"
          rx="130"
          ry="80"
          fill="none"
          stroke="#ffffff10"
          strokeWidth="1.5"
        />
        <rect
          x="794"
          y="265"
          width="12"
          height="70"
          fill="#ffffff14"
          rx="1.5"
        />

        {/* core (backend) */}
        <circle cx="800" cy="300" r="140" fill="url(#core-glow)" />
        <motion.circle
          cx="800"
          cy="300"
          r="36"
          fill="none"
          stroke="#ff5e2c"
          strokeWidth="1.5"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [0.6, 1.5, 0.6], opacity: [0.6, 0, 0.6] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeOut",
          }}
          style={{ transformOrigin: "800px 300px" }}
        />
        <circle cx="800" cy="300" r="32" fill="#0a0b0f" stroke="#ff5e2c" strokeWidth="1.5" />
        <text
          x="800"
          y="305"
          textAnchor="middle"
          fill="#ff9347"
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          fontWeight="600"
          letterSpacing="2"
        >
          API
        </text>

        {/* three streams — left edge to core */}
        {streams.map((s) => (
          <g key={s.id}>
            {/* origin chip */}
            <rect
              x="60"
              y={s.y - 22}
              width="120"
              height="44"
              rx="22"
              fill="#16171e"
              stroke="#ffffff20"
              strokeWidth="1"
            />
            <text
              x="120"
              y={s.y + 5}
              textAnchor="middle"
              fill="#f4f5f7"
              fontFamily="ui-sans-serif, system-ui"
              fontSize="14"
              fontWeight="600"
            >
              {s.label}
            </text>

            {/* path — curved bezier to core */}
            <path
              d={`M 180 ${s.y} Q 480 ${s.y}, 770 300`}
              fill="none"
              stroke="#ffffff14"
              strokeWidth="1.5"
              strokeDasharray="4 6"
            />

            {/* moving dot along the path */}
            <motion.circle
              r="5"
              fill="url(#accent-grad)"
              initial={{ offsetDistance: "0%", opacity: 0 }}
              animate={{
                offsetDistance: ["0%", "100%"],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: s.delay,
                ease: "easeInOut",
                times: [0, 0.1, 0.9, 1],
              }}
              style={{
                offsetPath: `path('M 180 ${s.y} Q 480 ${s.y}, 770 300')`,
              }}
            />
          </g>
        ))}

        {/* outbound stats — right edge */}
        {[
          { label: "540K+", sub: "users", y: 180 },
          { label: "670", sub: "fantasy players", y: 300 },
          { label: "26", sub: "matches scored live", y: 420 },
        ].map((stat, i) => (
          <g key={stat.label}>
            <motion.path
              d={`M 830 300 Q 1000 ${stat.y}, 1100 ${stat.y}`}
              fill="none"
              stroke="#ff5e2c"
              strokeWidth="1.5"
              strokeDasharray="2 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.6 + i * 0.15, ease }}
            />
            <motion.g
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.1 + i * 0.15, ease }}
            >
              <text
                x="1100"
                y={stat.y - 4}
                textAnchor="end"
                fill="#ff9347"
                fontFamily="ui-sans-serif, system-ui"
                fontSize="28"
                fontWeight="700"
              >
                {stat.label}
              </text>
              <text
                x="1100"
                y={stat.y + 14}
                textAnchor="end"
                fill="#8c8c97"
                fontFamily="ui-monospace, monospace"
                fontSize="10"
                letterSpacing="1.5"
              >
                {stat.sub.toUpperCase()}
              </text>
            </motion.g>
          </g>
        ))}

        {/* eyebrow label, bottom centre */}
        <text
          x="600"
          y="560"
          textAnchor="middle"
          fill="#ff5e2c"
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          letterSpacing="3"
        >
          THREE FRONTENDS · ONE BACKEND · REAL-TIME SCORING
        </text>
      </svg>
    </motion.div>
  );
}
