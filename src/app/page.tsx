import { Hero } from "@/components/hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { ExperienceCard } from "@/components/experience-card";
import { SkillCard } from "@/components/skill-card";
import { projects } from "@/lib/data/projects";
import { experiences } from "@/lib/data/experience";
import { skills } from "@/lib/data/skills";
import Link from "next/link";

const featuredProjects = projects.filter((p) => p.highlight).slice(0, 3);
const recentExperience = experiences.slice(0, 2);
const skillHighlights = skills.slice(0, 3);

export default function Home() {
  return (
    <div className="space-y-10">
      <Hero />

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">
            Snapshot
          </p>
          <h3 className="text-lg font-semibold text-white">
            Full Stack & AI Platform Engineer
          </h3>
          <p className="text-sm text-slate-300">
            Building multi-tenant SaaS, AI voice/chat systems, and mobile experiences with a
            production-first mindset.
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-slate-200">
            <span className="rounded-full bg-white/5 px-3 py-1">3+ years</span>
            <span className="rounded-full bg-white/5 px-3 py-1">Turbostart</span>
            <span className="rounded-full bg-white/5 px-3 py-1">Bengaluru</span>
          </div>
        </Card>
        <Card className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">
            Focus Areas
          </p>
          <ul className="space-y-2 text-sm text-slate-200">
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
              AI voice/chat agents (Ultravox, Plivo, Gemini)
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
              Multi-tenant SaaS with auth, billing, licensing
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
              Real-time systems & mobile apps (Ionic)
            </li>
          </ul>
        </Card>
        <Card className="flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Let’s work</p>
            <h3 className="text-lg font-semibold text-white">Available for backend / full-stack / AI platform roles</h3>
            <p className="text-sm text-slate-300">
              Quick turnarounds on proof-of-concepts and production rollouts.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild size="sm">
              <Link href="/projects">View projects</Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Featured</p>
            <h2 className="text-2xl font-semibold text-white">Projects</h2>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/projects">See all</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Recent</p>
            <h2 className="text-2xl font-semibold text-white">Experience</h2>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/experience">View timeline</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {recentExperience.map((item) => (
            <ExperienceCard key={item.title + item.period} item={item} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Skills</p>
            <h2 className="text-2xl font-semibold text-white">Core stack</h2>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/skills">See all</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {skillHighlights.map((category) => (
            <SkillCard key={category.title} category={category} />
          ))}
        </div>
      </section>
    </div>
  );
}
