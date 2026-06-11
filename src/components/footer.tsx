import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const menu = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
];

const more = [
  { href: "/projects", label: "Projects" },
  { href: "/chat", label: "Chat" },
  { href: "/contact", label: "Contact" },
  { href: "/sandeep-m-s-resume.pdf", label: "Résumé", external: true },
];

const socials = [
  {
    href: "https://www.linkedin.com/in/sandeep-m-s-bb99b5189/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  { href: "https://github.com/SandeepMS07", icon: Github, label: "GitHub" },
  { href: "mailto:sandeepms.work@gmail.com", icon: Mail, label: "Email" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden rounded-t-[2.5rem] bg-[#08080a] text-white">
      {/* ambient top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />

      <div className="mx-auto max-w-[88rem] px-6 pt-20 sm:px-10 sm:pt-28">
        {/* CTA headline */}
        <div className="relative">
          <span
            aria-hidden
            className="absolute -top-8 left-0 select-none text-6xl font-bold tracking-tight text-white/[0.04] sm:-top-12 sm:text-8xl"
          >
            ship
          </span>
          <h2 className="relative max-w-4xl text-5xl font-medium leading-[1.05] tracking-tight text-white/45 sm:text-7xl">
            <span className="font-semibold text-white">Let&apos;s</span> build
            <br />
            incredible things together.
          </h2>
        </div>

        {/* contact row */}
        <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/40">
              Email
            </p>
            <a
              href="mailto:sandeepms.work@gmail.com"
              className="mt-3 inline-block text-lg text-white/85 transition-colors hover:text-white sm:text-xl"
            >
              sandeepms.work@gmail.com
            </a>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-white/40">
              Let&apos;s talk
            </p>
            <Link
              href="/contact"
              className="group mt-3 inline-flex items-center gap-1.5 text-lg text-white/85 transition-colors hover:text-white sm:text-xl"
            >
              Book a call
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-white/40">
              Social
            </p>
            <div className="mt-3 flex items-center gap-2.5">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80 ring-1 ring-white/15 transition-all duration-300 hover:bg-white hover:text-[#08080a]"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="mt-16 h-px w-full bg-white/10" />

        {/* link columns + copyright */}
        <div className="mt-8 grid gap-10 sm:grid-cols-3 sm:gap-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/40">
              Menu
            </p>
            <ul className="mt-4 space-y-2.5">
              {menu.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-white/40">
              More
            </p>
            <ul className="mt-4 space-y-2.5">
              {more.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer noopener" : undefined}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:text-right">
            <p className="text-sm font-medium text-white/85">Sandeep M S</p>
            <p className="mt-1 text-sm text-white/45">
              AI Engineer &amp; Full Stack Developer
            </p>
            <p className="mt-4 text-xs text-white/35">
              © {year} Sandeep M S · Bengaluru, IN
            </p>
          </div>
        </div>

        {/* giant wordmark */}
        <div className="pointer-events-none relative mt-16 select-none">
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/2 bg-white/10 blur-[80px]"
          />
          <span
            className="relative block w-full text-center font-bold leading-[0.78] tracking-tighter text-transparent"
            style={{
              fontSize: "clamp(3.5rem, 22vw, 18rem)",
              backgroundImage:
                "linear-gradient(to bottom, rgba(255,255,255,0.92), rgba(255,94,44,0.45))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              transform: "translateY(16%)",
            }}
          >
            SANDEEP
          </span>
        </div>
      </div>
    </footer>
  );
}
