"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  const resetStatus = () => {
    if (status !== "idle") {
      setStatus("idle");
      setError("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "sending") {
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const message =
          data?.error || "Failed to send message. Please try again.";
        throw new Error(message);
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send message. Please try again.",
      );
    }
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
              onChange={(e) => {
                setName(e.target.value);
                resetStatus();
              }}
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
              onChange={(e) => {
                setEmail(e.target.value);
                resetStatus();
              }}
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
            onChange={(e) => {
              setMessage(e.target.value);
              resetStatus();
            }}
            placeholder="What would you like to collaborate on?"
            required
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </Button>
          {status === "sent" ? (
            <span className="text-sm text-cyan-100" aria-live="polite">
              Message sent! I&apos;ll get back soon.
            </span>
          ) : null}
          {status === "error" ? (
            <span className="text-sm text-rose-200" aria-live="polite">
              {error}
            </span>
          ) : null}
        </div>
      </form>
    </Card>
  );
}
