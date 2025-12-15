import { BriefcaseBusiness, CalendarRange, MapPin } from "lucide-react";
import type { ExperienceItem } from "@/lib/data";
import { Card } from "./ui/card";

type ExperienceCardProps = {
  item: ExperienceItem;
  cardfrom?: string;
};

export function ExperienceCard({ item, cardfrom }: ExperienceCardProps) {
  return (
    <div className="group relative flex w-full flex-row gap-6">
      <div className="relative flex flex-col items-center">
        <div className="absolute left-1/2 top-10 h-full w-px -translate-x-1/2 bg-white/12" />
        <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-900/90 text-cyan-50 shadow-[0_0_0_6px_rgba(255,255,255,0.12)] transition group-hover:border-cyan-300/60">
          <BriefcaseBusiness className="h-5 w-5" />
        </div>
      </div>
      <Card className="relative w-full cursor-pointer overflow-hidden border border-white/10 bg-linear-to-br from-slate-900/90 via-slate-900/80 to-slate-950/90 shadow-2xl shadow-cyan-500/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-cyan-400/35 group-hover:shadow-cyan-500/20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(129,140,248,0.08),transparent_30%)] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-linear-to-r from-transparent via-cyan-400/25 to-transparent" />
        <div className="relative flex flex-col gap-3 p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-200">
                <CalendarRange className="h-3.5 w-3.5" />
                {item.period}
              </div>
              <h3 className="text-lg font-semibold text-white">
                {item.title} — {item.company}
              </h3>
              <p className="inline-flex items-center gap-1 text-sm text-cyan-100/85">
                <MapPin className="h-3.5 w-3.5" />
                {item.location}
              </p>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-slate-200">
            {(cardfrom === "Home"
              ? item.highlights.slice(0, 2)
              : item.highlights
            ).map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <span
                  className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400"
                  aria-hidden
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}
