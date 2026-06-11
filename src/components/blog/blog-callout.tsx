import { AlertTriangle, Info, Lightbulb, ShieldAlert } from "lucide-react";
import type { ReactNode } from "react";

const variants = {
  note: {
    icon: Info,
    label: "Note",
    accent: "text-sky-300",
    bg: "bg-sky-300/8",
    ring: "ring-sky-300/20",
  },
  tip: {
    icon: Lightbulb,
    label: "Tip",
    accent: "text-emerald-300",
    bg: "bg-emerald-300/8",
    ring: "ring-emerald-300/20",
  },
  warning: {
    icon: AlertTriangle,
    label: "Warning",
    accent: "text-amber-300",
    bg: "bg-amber-300/8",
    ring: "ring-amber-300/20",
  },
  danger: {
    icon: ShieldAlert,
    label: "Danger",
    accent: "text-rose-300",
    bg: "bg-rose-300/10",
    ring: "ring-rose-300/25",
  },
} as const;

export function BlogCallout({
  type = "note",
  title,
  children,
}: {
  type?: keyof typeof variants;
  title?: string;
  children: ReactNode;
}) {
  const v = variants[type];
  const Icon = v.icon;
  return (
    <aside
      className={`my-8 flex gap-4 rounded-2xl ${v.bg} p-5 ring-1 ${v.ring}`}
    >
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${v.accent}`} />
      <div className="flex-1">
        <div
          className={`text-[0.7rem] font-semibold uppercase tracking-[0.15em] ${v.accent}`}
        >
          {title ?? v.label}
        </div>
        <div className="mt-1.5 text-sm leading-relaxed text-fg-dim [&_p]:m-0 [&_p+p]:mt-2">
          {children}
        </div>
      </div>
    </aside>
  );
}
