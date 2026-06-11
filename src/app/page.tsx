import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { Hero } from "@/components/hero";
import { Recommendations } from "@/components/recommendations";
import Globe3DDemo from "@/components/3d-globe-demo";
import { Boxes } from "@/components/ui/background-boxes";
import { BlogTeaser } from "@/components/blog/blog-teaser";
import { PlaygroundCarousel } from "@/components/playground-carousel";
import { projects } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";

const featured = projects.filter((p) => p.highlight);
const playground = projects.filter((p) => !p.highlight);

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="space-y-28 pb-20">
      <Hero />

      {/* statement + 3D globe */}
      <section className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
        <div className="relative order-2 h-[380px] sm:h-[480px] lg:order-1">
          <Globe3DDemo />
        </div>
        <p className="order-1 text-2xl font-medium leading-snug tracking-tight text-fg sm:text-4xl lg:order-2">
          I build digital products where{" "}
          <span className="text-aurora">reliability</span>,{" "}
          <span className="text-aurora">aesthetics</span> and{" "}
          <span className="text-aurora">scale</span> meet — systems used across{" "}
          <span className="text-aurora">the globe</span>.
        </p>
      </section>

      {/* featured projects */}
      <section className="space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="eyebrow">Selected works · {featured.length}</span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              Featured Projects
            </h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((project, idx) => (
            <Link
              key={project.title}
              href={project.links[0]?.href ?? "#"}
              target="_blank"
              className="glass glass-sheen card-glow group relative flex flex-col overflow-hidden rounded-3xl p-6"
            >
              {/* watermark index */}
              <span
                aria-hidden
                className="pointer-events-none absolute right-4 top-1 font-display text-7xl font-bold leading-none text-fg/[0.05]"
              >
                {String(idx + 1).padStart(2, "0")}
              </span>

              <div className="relative flex items-center justify-between">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-wide text-accent ring-1 ring-accent/15">
                  {project.tags[0]}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-fg-dim ring-1 ring-white/12 transition-colors group-hover:bg-accent group-hover:text-night">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <div className="relative mt-8">
                <h3 className="text-xl font-semibold leading-tight tracking-tight text-fg sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-fg-dim">
                  {project.role}
                </p>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-fg-dim">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.slice(1, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/8 px-2.5 py-0.5 text-[0.6875rem] text-fg-dim ring-1 ring-white/12"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
          <Link
            href="/projects"
            className={`glass card-glow group flex min-h-[210px] flex-col items-center justify-center gap-3 rounded-3xl text-center ${
              // When the featured count is even, this card lands alone
              // on the trailing row in a 2-column grid — span the full
              // row so the layout doesn't leave a lopsided empty cell.
              featured.length % 2 === 0 ? "sm:col-span-2" : ""
            }`}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/15 transition-colors group-hover:bg-accent group-hover:text-night">
              <Plus className="h-5 w-5" />
            </span>
            <span className="font-medium text-fg-dim transition-colors group-hover:text-fg">
              See all projects
            </span>
          </Link>
        </div>
      </section>

      {/* statement 2 */}
      <section className="mx-auto max-w-3xl text-center">
        <p className="text-2xl font-medium leading-snug tracking-tight text-fg sm:text-4xl">
          I enjoy creating <span className="text-aurora">new visions</span> and
          trying different techniques — so you’ll find plenty of experiments.
        </p>
      </section>

      {/* playground — horizontal scroll-snap carousel with per-card motifs */}
      <section className="space-y-8">
        <div>
          <span className="eyebrow">Experiments · {playground.length}</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Playground
          </h2>
          <p className="mt-3 max-w-xl text-sm text-fg-dim">
            Smaller builds and side bets — voice agents, investor tooling,
            broadcast portals. Swipe through.
          </p>
        </div>
        <PlaygroundCarousel projects={playground} />
      </section>

      {/* blog teaser — magazine-spread feature post + right rail */}
      {posts.length > 0 ? <BlogTeaser posts={posts} /> : null}

      {/* recommendations */}
      <section className="space-y-8">
        <div>
          <span className="eyebrow">Recommendations</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            What people say
          </h2>
        </div>
        <Recommendations />
      </section>

      {/* contact teaser */}
      <section>
        <div className="relative isolate flex flex-col items-center overflow-hidden rounded-[32px] border border-line bg-[#0b0c11] px-8 py-20 text-center sm:py-24">
          {/* interactive boxes background */}
          <Boxes />
          {/* radial mask — fades the grid into the dark, keeps the center calm */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 bg-[#0b0c11] [mask-image:radial-gradient(transparent,#0b0c11)]"
          />
          {/* warm theme tint */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 z-20 h-[120%] w-[70%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,94,44,0.16),transparent_70%)] blur-3xl"
          />

          <span className="eyebrow relative z-30">Let&apos;s build</span>
          <h2 className="relative z-30 mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-5xl">
            Have a project in mind?
          </h2>
          <p className="relative z-30 mx-auto mt-3 max-w-md text-base text-fg-dim">
            Open to AI engineering, full-stack, and platform roles.
          </p>
          <Link
            href="/contact"
            className="btn-shine relative z-30 mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-night shadow-[0_10px_30px_-8px_rgba(255,94,44,0.5)] transition-transform hover:-translate-y-0.5"
          >
            Get in touch
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
