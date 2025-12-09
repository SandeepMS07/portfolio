"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { heroHighlights, heroContent, heroProfile } from "@/lib/data";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 p-6 shadow-2xl shadow-cyan-500/10 sm:p-10">
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <motion.div
          className="absolute -left-10 -top-24 h-64 w-64 rounded-full bg-cyan-500/30 blur-3xl"
          animate={{ x: [0, 10, -6, 0], y: [0, 12, -8, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"
          animate={{ x: [0, -12, 8, 0], y: [0, -8, 6, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(34,211,238,0.15),transparent_25%),radial-gradient(circle_at_90%_0%,rgba(99,102,241,0.12),transparent_25%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.08),transparent_20%)]"
          animate={{ opacity: [0.6, 0.9, 0.7] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Badge variant="primary" className="uppercase tracking-[0.25em]">
            {heroContent.badge}
          </Badge>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              {heroContent.heading}
            </h1>
            <p className="text-lg text-slate-300">
              {heroContent.subheading}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link href={heroContent.ctaProjects}>
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href={heroContent.ctaResume}>
                Download Resume
                <Download className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {heroHighlights.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index + 0.2, duration: 0.35 }}
              >
                <Badge variant="secondary">{item}</Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <Card className="relative overflow-hidden border-white/10 bg-slate-900/80">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-indigo-500/10" />
            <div className="relative space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/15">
                  <Image
                    src={heroProfile.avatar}
                    alt={`${heroProfile.name} profile photo`}
                    fill
                    className="object-cover"
                    sizes="64px"
                    priority
                  />
                </div>
                <div>
                  <p className="text-sm text-slate-300">Profile</p>
                  <p className="text-lg font-semibold text-white">{heroProfile.name}</p>
                  <p className="text-xs text-cyan-100/90">{heroProfile.title}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">At a glance</p>
                  <p className="text-lg font-semibold text-white">{heroProfile.role}</p>
                  <p className="text-sm text-cyan-100/90">{heroProfile.period}</p>
                </div>
                <Badge variant="outline">{heroProfile.tag}</Badge>
              </div>
              <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                {heroProfile.stats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">{stat.label}</span>
                    <span className="text-sm font-semibold text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
