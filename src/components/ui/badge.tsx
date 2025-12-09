import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all duration-300",
  {
    variants: {
      variant: {
        primary: "border-cyan-500/50 bg-cyan-500/10 text-cyan-200",
        secondary: "border-white/10 bg-white/5 text-slate-200",
        outline: "border-white/15 text-slate-200",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  },
);

type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
