import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950/80 py-6 text-center text-sm text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <span>
          © {year} Sandeep MS · Built with Next.js &amp; TailwindCSS
        </span>
        <div className="flex items-center gap-3 text-slate-300">
          <Link
            href="https://www.linkedin.com"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-cyan-400/40 hover:text-white"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </Link>
          <Link
            href="https://github.com"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-cyan-400/40 hover:text-white"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
