"use client";

import { ContactRipple } from "@/components/contact-ripple";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Phone, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="flex min-h-[calc(100vh-20rem)] flex-col justify-center space-y-8">
      <PageHeader
        title="Contact"
        subtitle="Open to backend, full-stack, and AI platform roles. Let’s build something great."
      />
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-cyan-500/10">
        <ContactRipple />
        <div className="relative grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Card className="space-y-4">
            <p className="text-slate-200">
              Reach out directly for collaborations, product engineering
              leadership, or AI platform builds. I respond quickly with next
              steps.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <a href="mailto:sandeepms.work@gmail.com">
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="tel:+919590387494">
                  <Phone className="h-4 w-4" />
                  Call
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link
                  href="https://www.linkedin.com/in/sandeep-m-s-bb99b5189/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link
                  href="https://github.com/SandeepMS07"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </Link>
              </Button>
            </div>
          </Card>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
