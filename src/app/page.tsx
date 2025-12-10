import Link from "next/link";
import { Hero } from "@/components/hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { ExperienceCard } from "@/components/experience-card";
import { SkillCard } from "@/components/skill-card";
import { Server, Globe2, Smartphone, Bot, ShieldCheck, Container } from "lucide-react";
import {
  projects,
  experiences,
  skills,
  homeSnapshot,
  homeFocusAreas,
  homeAvailability,
} from "@/lib/data";

const featuredProjects = projects.filter((p) => p.highlight).slice(0, 3);
const recentExperience = experiences.slice(0, 2);
const skillHighlights = skills.slice(0, 3);
const skillGradients = [
  "rgba(70, 144, 204, 0.32)",
  "rgba(116, 90, 183, 0.32)",
  "rgba(160, 86, 130, 0.32)",
];
const skillIcons: Record<string, typeof Server> = {
  "Backend & APIs": Server,
  "Frontend & Web": Globe2,
  Mobile: Smartphone,
  "AI & Voice": Bot,
  "Auth & Security": ShieldCheck,
  "DevOps & Infra": Container,
};

export default function Home() {
  return (
    <div className="space-y-10">
      <Hero />

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">{homeSnapshot.label}</p>
          <h3 className="text-lg font-semibold text-white">{homeSnapshot.title}</h3>
          <p className="text-sm text-slate-300">{homeSnapshot.description}</p>
          <div className="flex flex-wrap gap-2 text-xs text-slate-200">
            {homeSnapshot.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/5 px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        </Card>
        <Card className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">{homeFocusAreas.label}</p>
          <ul className="space-y-2 text-sm text-slate-200">
            {homeFocusAreas.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">{homeAvailability.label}</p>
            <h3 className="text-lg font-semibold text-white">{homeAvailability.title}</h3>
            <p className="text-sm text-slate-300">{homeAvailability.description}</p>
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
          {skillHighlights.map((category, index) => (
            <SkillCard
              key={category.title}
              category={category}
              gradient={skillGradients[index % skillGradients.length]}
              icon={skillIcons[category.title] ?? Server}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
