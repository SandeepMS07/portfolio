import * as React from "react";
import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-black/20 backdrop-blur transition-all duration-300 hover:border-cyan-400/30 hover:shadow-cyan-500/10",
        className,
      )}
      {...props}
    />
  );
}
