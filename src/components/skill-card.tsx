import { skills, type SkillCategory } from "@/lib/data";
import { Badge } from "./ui/badge";
import { WobbleCard } from "./wobble-card";
import { cn } from "@/lib/utils";
import {
  Server,
  Globe2,
  Smartphone,
  Bot,
  ShieldCheck,
  Container,
  type LucideIcon,
} from "lucide-react";

type SkillCardProps = {
  category: SkillCategory;
  gradient: string;
  icon: LucideIcon;
};

export function SkillCard({ category, gradient, icon: Icon }: SkillCardProps) {
  return (
    <WobbleCard background={gradient} className="h-full">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-cyan-200 shadow-inner shadow-cyan-500/20 backdrop-blur">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{category.title}</h3>
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-100/70">
            Core tools & stack
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-xl border border-white/5 bg-black/10 p-3 shadow-inner shadow-cyan-500/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(124,208,255,0.18), transparent 25%), radial-gradient(circle at 80% 20%, rgba(94,240,198,0.16), transparent 28%), radial-gradient(circle at 50% 80%, rgba(147,112,255,0.12), transparent 28%)",
          }}
        />
        <div className="relative flex flex-wrap gap-2">
          {category.items.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className={cn(
                "bg-white/10 text-slate-100 shadow-sm shadow-cyan-500/10 backdrop-blur",
                "hover:-translate-y-[1px] hover:bg-white/15 transition duration-150",
              )}
            >
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </WobbleCard>
  );
}

export function SkillGrid() {
  const gradients = [
    "rgba(70, 144, 204, 0.32)",
    "rgba(116, 90, 183, 0.32)",
    "rgba(160, 86, 130, 0.32)",
    "rgba(66, 151, 133, 0.32)",
    "rgba(138, 126, 72, 0.32)",
    "rgba(74, 132, 196, 0.32)",
  ];

  const icons: Record<string, LucideIcon> = {
    "Backend & APIs": Server,
    "Frontend & Web": Globe2,
    Mobile: Smartphone,
    "AI & Voice": Bot,
    "Auth & Security": ShieldCheck,
    "DevOps & Infra": Container,
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {skills.map((category, index) => (
        <SkillCard
          key={category.title}
          category={category}
          gradient={gradients[index % gradients.length]}
          icon={icons[category.title] ?? Server}
        />
      ))}
    </div>
  );
}
