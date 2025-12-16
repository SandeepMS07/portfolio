"use client";

"use client";

import { heroProfile } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/chat", label: "Chat" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-slate-100">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/15 bg-white/5 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/30">
            <Image
              src={heroProfile.avatar}
              alt={`${heroProfile.name} profile`}
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">Sandeep M S</span>
            <span className="text-xs text-slate-400">
              Full Stack & AI Platform Engineer
            </span>
          </div>
        </Link>
        <nav className="hidden items-center gap-2 text-sm sm:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-2 transition-all duration-300 hover:bg-white/10",
                  active
                    ? "bg-white/10 text-white shadow-inner"
                    : "text-slate-300"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-100 transition hover:bg-white/10 sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <div
        className={cn(
          "sm:hidden transition-[max-height,opacity] duration-300 ease-out overflow-hidden border-t border-white/10 bg-slate-950/95 backdrop-blur",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-sm sm:px-6 lg:px-8">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-xl px-3 py-3 transition-all duration-200",
                  active
                    ? "bg-white/10 text-white shadow-inner"
                    : "text-slate-300 hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.header>
  );
}
