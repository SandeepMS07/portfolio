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
  maxItems?: number;
};

export function SkillCard({
  category,
  gradient,
  icon: Icon,
  maxItems,
}: SkillCardProps) {
  const items = maxItems ? category.items.slice(0, maxItems) : category.items;

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
        <div className="relative flex flex-wrap gap-2">
          {items.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className={cn(
                "bg-white/10 text-slate-100 shadow-sm shadow-cyan-500/10 backdrop-blur",
                "hover:-translate-y-px hover:bg-white/15 transition duration-150"
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
    "linear-gradient(135deg, rgba(16, 28, 43, 0.94), rgba(10, 22, 34, 0.94)), url('/skills/pattern-grid.svg')",
    "linear-gradient(135deg, rgba(16, 28, 43, 0.94), rgba(10, 22, 34, 0.94)), url('/skills/pattern-grid.svg')",
    "linear-gradient(135deg, rgba(16, 28, 43, 0.94), rgba(10, 22, 34, 0.94)), url('/skills/pattern-grid.svg')",
    "linear-gradient(135deg, rgba(16, 28, 43, 0.94), rgba(10, 22, 34, 0.94)), url('/skills/pattern-grid.svg')",
    "linear-gradient(135deg, rgba(16, 28, 43, 0.94), rgba(10, 22, 34, 0.94)), url('/skills/pattern-grid.svg')",
    "linear-gradient(135deg, rgba(16, 28, 43, 0.94), rgba(10, 22, 34, 0.94)), url('/skills/pattern-grid.svg')",
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
      {skills.map((category, index) => {
        const isLast = index === skills.length - 1;
        return (
          <div key={category.title} className={cn(isLast && "md:col-span-2")}>
            <SkillCard
              category={category}
              gradient={gradients[index % gradients.length]}
              icon={icons[category.title] ?? Server}
            />
          </div>
        );
      })}
    </div>
  );
}
