import { CalendarRange, MapPin } from "lucide-react";
import type { ExperienceItem } from "@/lib/data";

type ExperienceCardProps = {
  item: ExperienceItem;
  cardfrom?: string;
};

export function ExperienceCard({ item, cardfrom }: ExperienceCardProps) {
  const highlights =
    cardfrom === "Home" ? item.highlights.slice(0, 2) : item.highlights;

  return (
    <article className="group relative flex gap-5 sm:gap-7">
      {/* timeline node */}
      <div className="relative flex flex-col items-center pt-1.5">
        <span className="relative z-10 h-3.5 w-3.5 shrink-0 rounded-full border border-violet/60 bg-night shadow-[0_0_0_4px_rgba(255,255,255,0.08)] transition-all duration-300 group-hover:bg-violet group-hover:shadow-[0_0_14px_3px_rgba(255,94,44,0.45)]" />
      </div>

      <div className="glass card-glow flex-1 overflow-hidden rounded-2xl">
        <div className="flex flex-col gap-1.5 p-5">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-[0.6875rem] font-medium text-fg-dim">
            <CalendarRange className="h-3.5 w-3.5 text-cyan" />
            {item.period}
          </span>
          <h3 className="mt-1 text-lg font-semibold text-fg">
            {item.title}
            <span className="text-fg-faint"> · </span>
            <span className="text-aurora">{item.company}</span>
          </h3>
          <p className="inline-flex items-center gap-1.5 text-sm text-fg-dim">
            <MapPin className="h-3.5 w-3.5" />
            {item.location}
          </p>
          <ul className="mt-3 space-y-2">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-2.5 text-sm text-fg-dim"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet to-cyan"
                  aria-hidden
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
