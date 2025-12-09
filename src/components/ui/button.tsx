import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-tr from-indigo-500 to-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/40",
        ghost:
          "border border-white/15 bg-white/5 text-slate-100 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10",
        outline:
          "border border-white/20 text-slate-100 hover:border-cyan-400/50 hover:bg-slate-900/80",
      },
      size: {
        default: "px-5 py-2.5",
        sm: "px-3 py-2 text-xs",
        lg: "px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
