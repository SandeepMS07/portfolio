"use client";

import { ContactRipple } from "@/components/contact-ripple";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        index="00"
        title="Contact"
        subtitle="Open to AI engineering, full-stack, and platform roles. Let’s build something great."
      />
      <section className="relative">
        <ContactRipple />
        <div className="relative grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="space-y-6 lg:pt-2">
            <p className="max-w-md text-base leading-relaxed text-fg-dim">
              Reach out directly for collaborations, product engineering
              leadership, or AI platform builds. I respond quickly with
              next steps.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm">
                <a href="mailto:sandeepms.work@gmail.com">
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="tel:+919590387494">
                  <Phone className="h-4 w-4" />
                  Call
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link
                  href="https://www.linkedin.com/in/sandeep-m-s-bb99b5189/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
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
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
