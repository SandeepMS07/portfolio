"use client";

export function ContactRipple() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/5 bg-linear-to-br from-slate-900/80 via-slate-900/40 to-slate-950/80">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[80px_80px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-16 rounded-full bg-linear-to-br from-cyan-500/20 via-indigo-500/10 to-transparent blur-3xl" />
      </div>
    </div>
  );
}
