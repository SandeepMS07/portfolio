"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  FolderGit2,
  Wrench,
  Send,
  User,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = { href: string; label: string; icon: LucideIcon; dot?: boolean };

const tabs: Tab[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: FolderGit2 },
  { href: "/skills", label: "Skills", icon: Wrench },
  { href: "/chat", label: "Chat", icon: Send, dot: true },
  { href: "/contact", label: "Contact", icon: User },
];

const isActive = (pathname: string | null, href: string) =>
  href === "/" ? pathname === "/" : !!pathname?.startsWith(href);

export function MobileTabBar() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        // hysteresis so it doesn't flicker right at the threshold
        setCompact((prev) => {
          const y = window.scrollY;
          if (!prev && y > 60) return true;
          if (prev && y < 30) return false;
          return prev;
        });
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center sm:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div
        className={cn(
          "mb-3 flex items-center rounded-full border border-white/10 bg-black/70 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.8)] backdrop-blur-xl backdrop-saturate-150 transition-[width,padding,gap,margin] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[width,padding]",
          compact
            ? "gap-1 p-1.5"
            : "mx-3 w-[calc(100%-1.5rem)] justify-around p-1.5",
        )}
      >
        {tabs.map(({ href, label, icon: Icon, dot }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex flex-col items-center justify-center transition-[flex,width] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)]",
                compact ? "w-14" : "flex-1",
                active ? "text-white" : "text-white/55 active:text-white/80",
              )}
            >
              <span
                className={cn(
                  "relative flex h-10 items-center justify-center rounded-2xl transition-[width,background-color] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  active ? "w-14 bg-white/12" : "w-10",
                )}
              >
                <Icon
                  className="h-[1.35rem] w-[1.35rem] transition-all"
                  strokeWidth={active ? 2.4 : 1.9}
                />
                {dot && (
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent ring-2 ring-black/70" />
                )}
              </span>
              <span
                className={cn(
                  "grid text-[0.625rem] font-medium leading-none transition-[grid-template-rows,opacity,margin] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  compact
                    ? "grid-rows-[0fr] opacity-0"
                    : "mt-1 grid-rows-[1fr] opacity-100",
                )}
              >
                <span className="overflow-hidden">{label}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
