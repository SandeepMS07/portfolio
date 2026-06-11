"use client";

export function ContactRipple() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
    >
      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.1),transparent_65%)] blur-2xl" />
      <div className="absolute bottom-0 right-10 h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(255,209,102,0.18),transparent_65%)] blur-2xl" />
    </div>
  );
}
