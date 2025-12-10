"use client";

import { useState, useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type WobbleCardProps = {
  children: ReactNode;
  background: string;
  className?: string;
};

export function WobbleCard({ children, background, className }: WobbleCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<Record<string, string>>({});

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    const translateX = ((x - centerX) / centerX) * 6;
    const translateY = ((y - centerY) / centerY) * 6;

    setStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${translateX}px, ${translateY}px, 0)`,
    });
  };

  const handleLeave = () => {
    setStyle({ transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)" });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl shadow-cyan-500/10 transition-transform duration-200 ease-out will-change-transform",
        className,
      )}
      style={style}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{ background }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
