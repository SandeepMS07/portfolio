import type { Metadata } from "next";
import { Sora, Manrope, JetBrains_Mono, Anton } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { MobileTabBar } from "@/components/mobile-tab-bar";
import { Footer } from "@/components/footer";
import { ChatRedirectInput } from "@/components/ChatRedirectInput";
import { VisitTracker } from "@/components/visit-tracker";
import { AuroraBackground } from "@/components/aurora-background";
import { LiquidGlassFilter } from "@/components/liquid-glass-filter";
import { Analytics } from "@vercel/analytics/react";

const display = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const poster = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sandeep M S — AI Engineer & Full Stack Developer",
  description:
    "Portfolio for Sandeep M S — AI Engineer building LLM & voice agents, AI chat platforms, and multi-tenant SaaS, plus full stack and mobile builds.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} ${poster.variable} min-h-screen bg-night text-fg antialiased`}
      >
        <AuroraBackground />
        <LiquidGlassFilter />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main className="mx-auto w-full max-w-[88rem] flex-1 px-4 pt-10 sm:px-6 lg:px-10">
            {children}
          </main>
          <Footer />
        </div>
        <ChatRedirectInput />
        <MobileTabBar />
        <VisitTracker />
        <Analytics />
      </body>
    </html>
  );
}
