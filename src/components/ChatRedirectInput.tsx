"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, FormEvent, KeyboardEvent, useEffect } from "react";
import { MessageCircle } from "lucide-react";

type ChatRedirectInputProps = {
  variant?: "floating" | "hero";
};

export function ChatRedirectInput({
  variant = "floating",
}: ChatRedirectInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState("");
  const redirectedRef = useRef(false);
  const isFloating = variant === "floating";
  const hideOnChat = pathname?.startsWith("/chat");

  const handleSubmit = (
    event?: FormEvent | KeyboardEvent<HTMLInputElement>
  ) => {
    event?.preventDefault();
    const query = value.trim();
    if (!query) return;
    if (redirectedRef.current) return;
    redirectedRef.current = true;
    router.push(`/chat?q=${encodeURIComponent(query)}`);
  };

  // Clear the quick input when returning to non-chat pages
  useEffect(() => {
    if (hideOnChat) return;
    setValue("");
    redirectedRef.current = false;
  }, [pathname, hideOnChat]);

  if (hideOnChat) {
    return null;
  }
  return (
    <form
      onSubmit={handleSubmit}
      className={
        isFloating
          ? "fixed bottom-4 right-3 z-40 w-[230px] max-w-[260px] space-y-2 sm:bottom-6 sm:right-6 sm:w-[260px] sm:max-w-[320px]"
          : "w-full max-w-xl space-y-2"
      }
      style={
        isFloating
          ? { bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }
          : undefined
      }
    >
      <div className="relative">
        <div
          className={`flex items-center gap-2 ${
            isFloating ? "absolute -top-10 right-1" : "relative mb-1"
          }`}
        >
          <div className="relative overflow-hidden rounded-full border border-emerald-300/50 bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-100 shadow-[0_10px_30px_rgba(16,185,129,0.35)]">
            <div className="pointer-events-none absolute inset-0 animate-shimmer bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.3)_35%,rgba(255,255,255,0)_70%)] bg-size-[200%_100%]" />
            <span className="relative flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
              Featured • AI chat
            </span>
          </div>
          {isFloating ? (
            <div className="relative h-8 w-8 text-emerald-200">
              <div className="absolute inset-0 animate-arrowBounce text-lg leading-none">
                ↓
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div
        className={`relative overflow-hidden rounded-2xl border border-cyan-400/30 bg-slate-900/70 shadow-[0_15px_40px_rgba(14,165,233,0.35)] backdrop-blur ${
          isFloating ? "" : "ring-1 ring-cyan-400/30"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.12),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.14),transparent_35%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_20%,rgba(255,255,255,0.05)_40%,rgba(255,255,255,0)_60%,rgba(255,255,255,0.05)_80%,rgba(255,255,255,0)_100%)] opacity-30" />
        <div className="pointer-events-none absolute inset-0 animate-shimmer bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.35)_30%,rgba(255,255,255,0)_60%)] bg-size-[220%_100%] opacity-40" />
        <div className="relative flex items-center gap-3 px-3 py-2">
          <div className="relative">
            <div className="absolute inset-0 animate-[pulseGlow_2.6s_ease-in-out_infinite] rounded-full bg-cyan-400/40 blur-md" />
            <MessageCircle className="relative h-4 w-4 text-cyan-200" />
          </div>
          <input
            id="chat-quick-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
            placeholder="Ask me about my skills, projects, or experience..."
            className="flex-1 bg-transparent text-sm text-slate-50 placeholder:text-slate-400 focus:outline-none"
          />
          <button type="submit" className="hidden" aria-hidden />
        </div>
      </div>
      <style jsx global>{`
        @keyframes pulseGlow {
          0%,
          100% {
            transform: scale(0.95);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }
        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
        @keyframes arrowBounce {
          0%,
          100% {
            transform: translateY(-6px);
            opacity: 0.7;
          }
          50% {
            transform: translateY(2px);
            opacity: 1;
          }
        }
      `}</style>
    </form>
  );
}
