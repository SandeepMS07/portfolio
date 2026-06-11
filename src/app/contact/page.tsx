"use client";

import { ContactRipple } from "@/components/contact-ripple";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="space-y-8 sm:space-y-12">
      <PageHeader
        index="00"
        title="Contact"
        subtitle="Open to AI engineering, full-stack, and platform roles. Let’s build something great."
      />
      <section className="relative">
        <ContactRipple />
        <div className="relative grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* intro */}
          <p className="max-w-md text-base leading-relaxed text-fg-dim lg:col-start-1 lg:row-start-1 lg:pt-2">
            Reach out directly for collaborations, product engineering
            leadership, or AI platform builds. I respond quickly with next
            steps.
          </p>

          {/* form */}
          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <ContactForm />
          </div>

          {/* contact buttons — bottom on mobile, left column on desktop */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap lg:col-start-1 lg:row-start-2 lg:self-start">
            <Button asChild size="sm" className="w-full justify-center sm:w-auto">
              <a href="mailto:sandeepms.work@gmail.com">
                <Mail className="h-4 w-4" />
                Email
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild className="w-full justify-center sm:w-auto">
              <a href="tel:+919590387494">
                <Phone className="h-4 w-4" />
                Call
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild className="w-full justify-center sm:w-auto">
              <Link
                href="https://www.linkedin.com/in/sandeep-m-s-bb99b5189/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="w-full justify-center sm:w-auto">
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
        </div>
      </section>
    </div>
  );
}
