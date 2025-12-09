import type { ExperienceItem } from "@/lib/data";
import { Card } from "./ui/card";

type ExperienceCardProps = {
  item: ExperienceItem;
};

export function ExperienceCard({ item }: ExperienceCardProps) {
  return (
    <Card className="space-y-3">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {item.title} — {item.company}
          </h3>
          <p className="text-sm text-cyan-100/90">{item.location}</p>
        </div>
        <span className="text-sm text-slate-300">{item.period}</span>
      </div>
      <ul className="space-y-2 text-sm text-slate-300">
        {item.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
