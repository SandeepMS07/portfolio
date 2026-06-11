/**
 * Hidden SVG filter that powers the real "liquid glass" refraction.
 * `.glass` references it via `backdrop-filter: url(#liquidGlass)`, which warps
 * whatever is behind the element (lens/droplet distortion) — not just blur.
 * Browsers without url() backdrop support gracefully fall back to the blur.
 */
export function LiquidGlassFilter() {
  return (
    <svg aria-hidden className="pointer-events-none absolute h-0 w-0">
      <defs>
        <filter
          id="liquidGlass"
          x="-25%"
          y="-25%"
          width="150%"
          height="150%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.009 0.011"
            numOctaves="2"
            seed="11"
            result="turb"
          />
          <feGaussianBlur in="turb" stdDeviation="2.4" result="soft" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="soft"
            scale="34"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
