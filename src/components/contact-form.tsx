'use client';

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ name, email, message });
    setStatus("sent");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm text-slate-200" htmlFor="name">
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm text-slate-200" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm text-slate-200" htmlFor="message">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What would you like to collaborate on?"
            required
          />
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit">Send Message</Button>
          {status === "sent" ? (
            <span className="text-sm text-cyan-100">Message sent! I&apos;ll get back soon.</span>
          ) : null}
        </div>
      </form>
    </Card>
  );
}
