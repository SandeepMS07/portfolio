import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Phone, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Contact"
        subtitle="Open to backend, full-stack, and AI platform roles. Let’s build something great."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Card className="space-y-4">
          <p className="text-slate-200">
            Reach out directly for collaborations, product engineering leadership, or AI platform
            builds. I respond quickly with next steps.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="mailto:hello@sandeepms.dev">
                <Mail className="h-4 w-4" />
                Email
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="tel:+9100000000">
                <Phone className="h-4 w-4" />
                Call
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://www.linkedin.com">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://github.com">
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            </Button>
          </div>
        </Card>
        <ContactForm />
      </div>
    </div>
  );
}
