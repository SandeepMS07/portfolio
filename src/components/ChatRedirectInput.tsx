"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, FormEvent, KeyboardEvent, useEffect } from "react";
import { Sparkles, ArrowUp } from "lucide-react";

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
  // Hide the floating assistant where it would collide / is redundant.
  const hideFloating =
    hideOnChat || pathname?.startsWith("/contact");

  const handleSubmit = (
    event?: FormEvent | KeyboardEvent<HTMLInputElement>,
  ) => {
    event?.preventDefault();
    const query = value.trim();
    if (!query) return;
    if (redirectedRef.current) return;
    redirectedRef.current = true;
    setValue("");
    router.push(`/chat?q=${encodeURIComponent(query)}`);
  };

  // Re-arm the redirect guard when returning to non-chat pages
  useEffect(() => {
    if (hideOnChat) return;
    redirectedRef.current = false;
  }, [pathname, hideOnChat]);

  if (hideFloating) {
    return null;
  }

  return (
    <>
      {/* mobile: compact floating action button above the tab bar */}
      {isFloating ? (
        <Link
          href="/chat"
          aria-label="Open AI assistant"
          className="animate-float group fixed right-4 bottom-[calc(env(safe-area-inset-bottom,0px)+5.75rem)] z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-night shadow-[0_12px_34px_-10px_rgba(255,94,44,0.7)] ring-1 ring-white/20 transition-transform active:scale-90 sm:hidden"
        >
          {/* breathing glow ring */}
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full bg-accent/40 [animation-duration:2.5s]"
          />
          {/* notification dot */}
          <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-accent ring-2 ring-[#0b0b0d]" />
          </span>
          <Sparkles className="relative h-6 w-6 transition-transform duration-500 group-hover:rotate-12 group-active:scale-110" />
        </Link>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className={
          isFloating
            ? "fixed bottom-5 right-5 z-40 hidden w-[320px] max-w-[calc(100vw-2.5rem)] flex-col items-end sm:flex"
            : "w-full max-w-xl"
        }
        style={
          isFloating
            ? { bottom: "calc(env(safe-area-inset-bottom, 0px) + 20px)" }
            : undefined
        }
      >
      {/* badge */}
      <div className="mb-2 mr-1 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 shadow-sm ring-1 ring-white/15 backdrop-blur">
        <span className="relative flex h-2 w-2 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        <span className="bg-gradient-to-r from-violet to-accent bg-clip-text text-[0.625rem] font-bold uppercase tracking-[0.16em] text-transparent">
          AI Assistant
        </span>
      </div>

      <div className="group relative w-full">
        {/* soft animated aura */}
        <div className="absolute -inset-1 rounded-full bg-[radial-gradient(closest-side,rgba(255,94,44,0.28),transparent)] opacity-50 blur-2xl transition-opacity duration-500 group-focus-within:opacity-80" />

        {/* subtle gradient ring */}
        <div className="relative rounded-full bg-gradient-to-r from-accent/60 via-accent/15 to-accent/40 p-px shadow-[0_14px_38px_-14px_rgba(255,94,44,0.35)]">
          <div className="flex items-center gap-2 rounded-full bg-[#0e0c0b]/95 py-1.5 pl-1.5 pr-1.5 backdrop-blur-xl">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-night shadow-md">
              <Sparkles className="h-4 w-4" />
            </span>
            <input
              id="chat-quick-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
              placeholder="Ask me anything…"
              className="min-w-0 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-fg-faint"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={!value.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-night shadow transition-all hover:scale-105 disabled:scale-100 disabled:bg-white/10 disabled:text-fg-faint disabled:shadow-none"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      </form>
    </>
  );
}
