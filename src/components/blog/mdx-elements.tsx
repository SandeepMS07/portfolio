import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { BlogAnimatedHero } from "./blog-animated-hero";
import { BlogCallout } from "./blog-callout";
import { BlogDiagram } from "./blog-diagram";
import { BlogStatGrid, BlogPullQuote } from "./blog-stat-card";

// Renderers for raw MDX nodes — keeps prose visually consistent with the
// rest of the portfolio without authors needing to wrap every paragraph
// in custom components. Tables/code blocks/images all pick up styling
// automatically.
//
// Unified-width layout: every element inherits the article's 56rem
// outer track. Prose ends up at ~90-95 char line length — wider than
// the strict 65-80 char readability ideal, but matches the visual
// rhythm of the diagrams and animated hero so the post reads as one
// confident column rather than a narrow prose ribbon with wider
// figures bursting out of it.
const PROSE = "";

export const mdxElements: MDXComponents = {
  h1: (props) => (
    <h1
      className={`${PROSE} mt-14 mb-5 text-3xl font-semibold tracking-tight text-fg sm:text-4xl`}
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className={`${PROSE} mt-12 mb-4 scroll-mt-24 text-2xl font-semibold tracking-tight text-fg sm:text-3xl [&>code]:text-[0.85em]`}
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className={`${PROSE} mt-10 mb-3 scroll-mt-24 text-xl font-semibold tracking-tight text-fg [&>code]:text-[0.9em]`}
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className={`${PROSE} mt-8 mb-2 text-lg font-semibold tracking-tight text-fg`}
      {...props}
    />
  ),
  p: (props) => (
    <p
      className={`${PROSE} my-5 text-[0.96rem] leading-[1.75] text-fg-dim`}
      {...props}
    />
  ),
  a: ({ href, ...rest }) =>
    href?.startsWith("http") ? (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
        {...rest}
      />
    ) : (
      <Link
        href={href ?? "#"}
        className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
        {...rest}
      />
    ),
  ul: (props) => (
    <ul
      className={`${PROSE} my-5 list-disc space-y-2 pl-6 text-[0.96rem] leading-[1.7] text-fg-dim marker:text-accent`}
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className={`${PROSE} my-5 list-decimal space-y-2 pl-6 text-[0.96rem] leading-[1.7] text-fg-dim marker:text-fg-faint marker:font-mono`}
      {...props}
    />
  ),
  li: (props) => <li className="pl-1" {...props} />,
  blockquote: (props) => (
    <blockquote
      className={`${PROSE} my-6 border-l-2 border-accent/50 pl-5 text-base italic text-fg-dim`}
      {...props}
    />
  ),
  hr: () => <hr className={`${PROSE} my-12 border-line`} />,
  // Inline code (single backticks).
  code: (props) => (
    <code
      className="rounded-md bg-white/8 px-1.5 py-0.5 font-mono text-[0.85em] text-fg ring-1 ring-white/12"
      {...props}
    />
  ),
  // Block code (triple backticks). rehype-pretty-code wraps in <pre><code data-language=...>.
  pre: (props) => (
    <pre
      className="glass my-7 overflow-x-auto rounded-2xl p-5 font-mono text-[0.825rem] leading-[1.7] [&_code]:bg-transparent [&_code]:p-0 [&_code]:ring-0"
      {...props}
    />
  ),
  table: (props) => (
    <div className="my-7 overflow-x-auto">
      <table
        className="glass w-full overflow-hidden rounded-2xl text-left text-sm"
        {...props}
      />
    </div>
  ),
  th: (props) => (
    <th
      className="border-b border-line px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-fg-faint"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border-b border-line/60 px-4 py-3 text-fg-dim" {...props} />
  ),
  img: (props) => (
    // Plain markdown images — for richer diagrams use <BlogDiagram />.
    // eslint-disable-next-line @next/next/no-img-element
    <img className="my-7 w-full rounded-2xl" alt={props.alt ?? ""} {...props} />
  ),
  strong: (props) => <strong className="font-semibold text-fg" {...props} />,
  // Custom components exposed for in-MDX use.
  AnimatedHero: BlogAnimatedHero,
  Callout: BlogCallout,
  Diagram: BlogDiagram,
  StatGrid: BlogStatGrid,
  PullQuote: BlogPullQuote,
};
