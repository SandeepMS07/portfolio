"use client";

import { cn } from "@/lib/utils";
import { heroProfile } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/chat", label: "Chat" },
];

const isActive = (pathname: string | null, href: string) =>
  href === "/" ? pathname === "/" : !!pathname?.startsWith(href);

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="sticky top-4 z-40 flex flex-col items-center px-4">
      <header className="flex w-full max-w-fit items-center gap-2 rounded-full bg-[#0b0b0d]/80 p-1.5 pl-1.5 shadow-[0_18px_50px_-14px_rgba(0,0,0,0.5)] ring-1 ring-white/10 backdrop-blur-xl backdrop-saturate-150">
        {/* brand with avatar */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 rounded-full py-1 pl-1 pr-3 sm:pr-2"
        >
          <span className="relative shrink-0">
            <span className="block h-9 w-9 overflow-hidden rounded-full ring-1 ring-white/20 transition-transform group-hover:scale-105">
              <Image
                src={heroProfile.avatar}
                alt={heroProfile.name}
                width={36}
                height={36}
                className="h-full w-full object-cover"
                priority
              />
            </span>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-[#0b0b0d]" />
          </span>
          <span className="text-sm font-semibold text-white">
            {heroProfile.name}
          </span>
        </Link>

        {/* desktop links */}
        <nav className="hidden items-center gap-0.5 sm:flex">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/15 text-white"
                    : "text-white/60 hover:bg-white/10 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* contact CTA (desktop) */}
        <Link
          href="/contact"
          className={cn(
            "hidden items-center rounded-full px-5 py-2 text-sm font-semibold transition-transform duration-300 hover:scale-[1.03] sm:inline-flex",
            isActive(pathname, "/contact")
              ? "bg-accent text-night"
              : "bg-white text-[#0b0b0d]",
          )}
        >
          Contact
        </Link>
      </header>
    </div>
  );
}
