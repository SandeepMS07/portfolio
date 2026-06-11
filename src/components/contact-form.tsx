"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Send, Check, Loader2, AlertCircle } from "lucide-react";

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  textarea?: boolean;
  rows?: number;
  required?: boolean;
};

const fieldBase =
  "peer w-full rounded-2xl border border-white/12 bg-white/[0.03] px-4 text-sm text-fg outline-none transition-all duration-200 placeholder:text-transparent hover:border-white/20 focus:border-accent/70 focus:bg-white/[0.05] focus:ring-4 focus:ring-accent/10";

const labelBase =
  "pointer-events-none absolute left-4 top-4 text-sm text-fg-faint transition-all duration-200 peer-focus:top-2.5 peer-focus:text-[0.65rem] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[0.65rem] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.14em] peer-[:not(:placeholder-shown)]:text-fg-dim";

function FloatingField({
  id,
  label,
  value,
  onChange,
  type = "text",
  textarea = false,
  rows = 5,
  required,
}: FieldProps) {
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          value={value}
          onChange={onChange}
          required={required}
          placeholder=" "
          className={`${fieldBase} resize-none pb-3 pt-7`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder=" "
          className={`${fieldBase} pb-2.5 pt-6`}
        />
      )}
      <label htmlFor={id} className={labelBase}>
        {label}
      </label>
    </div>
  );
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  const resetStatus = () => {
    if (status === "error") {
      setStatus("idle");
      setError("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

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
        throw new Error(
          data?.error || "Failed to send message. Please try again.",
        );
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

  if (status === "sent") {
    return (
      <div className="relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-10 text-center">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-accent/20" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ff7a45,#ff4733)] text-white shadow-[0_0_40px_-6px_rgba(255,94,44,0.8)]">
            <Check className="h-7 w-7" />
          </span>
        </div>
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-fg">
            Message sent
          </h3>
          <p className="mt-1.5 text-sm text-fg-dim">
            Thanks for reaching out — I&apos;ll get back to you soon.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-1 cursor-pointer rounded-full bg-white/[0.05] px-5 py-2.5 text-sm font-medium text-fg ring-1 ring-white/12 transition-colors hover:bg-white/10"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FloatingField
            id="name"
            label="Your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              resetStatus();
            }}
            required
          />
          <FloatingField
            id="email"
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              resetStatus();
            }}
            required
          />
        </div>

        <FloatingField
          id="message"
          label="What would you like to collaborate on?"
          textarea
          rows={5}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            resetStatus();
          }}
          required
        />

        {status === "error" ? (
          <p
            className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2.5 text-sm text-rose-300"
            aria-live="polite"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-shine inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#ff7a45,#ff4733)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_34px_-10px_rgba(255,94,44,0.7)] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Message
            </>
          )}
        </button>
    </form>
  );
}
