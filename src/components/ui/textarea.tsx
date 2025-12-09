import * as React from "react";
import { cn } from "@/lib/utils";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full rounded-xl border border-white/15 bg-slate-900/70 px-3 py-2 text-sm text-white shadow-inner shadow-black/30 outline-none transition focus:border-cyan-400/60 focus:shadow-cyan-500/10",
        className,
      )}
      {...props}
    />
  );
}
