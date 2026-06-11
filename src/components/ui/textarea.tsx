import * as React from "react";
import { cn } from "@/lib/utils";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full resize-none rounded-xl border border-white/12 bg-white/8 px-3.5 py-2.5 text-sm text-fg shadow-inner outline-none backdrop-blur-md transition-colors placeholder:text-fg-faint focus:border-accent/60 focus:bg-white/12",
        className,
      )}
      {...props}
    />
  );
}
