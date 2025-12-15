"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Send, X, Mic, Square } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type SpeechRecognitionResult = {
  0: {
    transcript: string;
  };
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: SpeechRecognitionResult[];
};

type WebSpeechRecognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: Event) => void) | null;
};

type SpeechRecognitionConstructor = new () => WebSpeechRecognition;

type SpeechWindow = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatInline(text: string) {
  const escaped = escapeHtml(text);
  return escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

function renderMessageContent(content: string) {
  const blocks = content.split(/\n\n+/).filter(Boolean);

  if (blocks.length === 0) {
    return (
      <span
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: formatInline(content) }}
      />
    );
  }

  return blocks.map((block, idx) => {
    const lines = block.split("\n").filter(Boolean);
    const isList =
      lines.length > 1 && lines.every((line) => line.trim().startsWith("- "));

    if (isList) {
      return (
        <ul key={`block-${idx}`} className="ml-4 list-disc space-y-1">
          {lines.map((line, liIdx) => (
            <li
              key={`li-${idx}-${liIdx}`}
              dangerouslySetInnerHTML={{
                __html: formatInline(line.replace(/^- /, "")),
              }}
            />
          ))}
        </ul>
      );
    }

    return (
      <p
        key={`block-${idx}`}
        className={idx > 0 ? "mt-2" : undefined}
        dangerouslySetInnerHTML={{ __html: formatInline(block) }}
      />
    );
  });
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! I’m Sandeep’s assistant. Ask me about his skills, projects, or experience.",
    },
  ]);
  const [input, setInput] = useState("");
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const targetTextRef = useRef("");
  const displayedTextRef = useRef("");
  const panelRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<WebSpeechRecognition | null>(null);
  const [canRecognize, setCanRecognize] = useState(false);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, collapsed]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (collapsed) return;
      const panel = panelRef.current;
      if (panel && !panel.contains(event.target as Node)) {
        setCollapsed(true);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [collapsed]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const speechWindow = window as SpeechWindow;
    const SR =
      speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (!SR) return;
    const recognition: WebSpeechRecognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognitionRef.current = recognition;
    setCanRecognize(true);

    recognition.onresult = (event: SpeechRecognitionEventLike) => {
      // Use only the most recent result to avoid repeated phrases
      const idx = event.resultIndex;
      const transcript = event.results[idx]?.[0]?.transcript?.trim();
      if (!transcript) return;
      setInput(transcript);
      recognition.stop();
    };

    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    return () => {
      recognition.onresult = null;
      recognition.onend = null;
      recognition.onerror = null;
      recognition.stop();
      recognitionRef.current = null;
    };
  }, []);

  const toggleListening = () => {
    if (!canRecognize || !recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
      return;
    }
    try {
      recognitionRef.current.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  };

  const sendMessage = async (event?: FormEvent) => {
    event?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const nextMessages: Message[] = [
      ...messages.slice(-8), // keep last 8 to limit history size
      { role: "user", content: trimmed },
      { role: "assistant", content: "" },
    ];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    displayedTextRef.current = "";
    targetTextRef.current = "";
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const contentType = response.headers.get("content-type") || "";

      // Handle JSON fallback (errors or non-streamed replies)
      if (!response.ok || contentType.includes("application/json")) {
        const data = (await response.json().catch(() => null)) as {
          reply?: string;
          text?: string;
        } | null;
        const reply =
          data?.reply ||
          data?.text ||
          "Hey! I’m Sandeep’s assistant. I can share his skills, projects, and experience—what would you like to know?";
        setMessages((prev) => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;
          if (lastIndex >= 0 && updated[lastIndex].role === "assistant") {
            updated[lastIndex] = { role: "assistant", content: reply };
          }
          return updated;
        });
        displayedTextRef.current = reply;
        targetTextRef.current = reply;
        setLoading(false);
        return;
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      const startTypingLoop = () => {
        if (typingIntervalRef.current) return;
        typingIntervalRef.current = setInterval(() => {
          const target = targetTextRef.current;
          const current = displayedTextRef.current;
          if (current === target) {
            clearInterval(typingIntervalRef.current as NodeJS.Timeout);
            typingIntervalRef.current = null;
            return;
          }
          const step = Math.max(1, Math.min(2, target.length - current.length));
          const next = target.slice(0, current.length + step);
          if (next === displayedTextRef.current) return;
          displayedTextRef.current = next;
          setMessages((prev) => {
            const updated = [...prev];
            const lastIndex = updated.length - 1;
            if (lastIndex >= 0 && updated[lastIndex].role === "assistant") {
              if (updated[lastIndex].content === next) return prev;
              updated[lastIndex] = { role: "assistant", content: next };
            }
            return updated;
          });
        }, 50);
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        targetTextRef.current = assistantText;
        startTypingLoop();
      }

      // Final decode flush
      assistantText += decoder.decode();
      targetTextRef.current = assistantText || targetTextRef.current;
      startTypingLoop();
    } catch (error) {
      console.error("Chat send error", error);
      setMessages((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        if (lastIndex >= 0 && updated[lastIndex].role === "assistant") {
          updated[lastIndex] = {
            role: "assistant",
            content:
              "Hey! I’m Sandeep’s assistant. I can share his skills, projects, and experience—what would you like to know?",
          };
        }
        return updated;
      });
      displayedTextRef.current =
        "Hey! I’m Sandeep’s assistant. I can share his skills, projects, and experience—what would you like to know?";
      targetTextRef.current = displayedTextRef.current;
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const renderedMessages = useMemo(
    () =>
      messages.map((message, idx) => {
        const isUser = message.role === "user";
        if (!isUser && message.content.trim() === "") {
          return null;
        }
        return (
          <div
            key={idx.toString()}
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`relative max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-lg shadow-black/20 ${
                isUser
                  ? "bg-linear-to-br from-cyan-500 to-indigo-500 text-white"
                  : "bg-white/5 text-slate-100 border border-white/10"
              }`}
            >
              <div className="prose prose-invert prose-sm max-w-none *:my-0 [&>ul]:my-2 [&>p]:my-1">
                {renderMessageContent(message.content)}
              </div>
            </div>
          </div>
        );
      }),
    [messages]
  );

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {collapsed ? (
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-cyan-500 to-indigo-500 text-white shadow-xl shadow-cyan-500/35 ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:shadow-cyan-400/40 cursor-pointer"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      ) : (
        <div
          ref={panelRef}
          className="pointer-events-auto w-[calc(100vw-2rem)] max-w-[440px] overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-950/95 via-slate-900/90 to-slate-900/90 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.65)]"
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-linear-to-r from-slate-950/80 via-slate-900/60 to-slate-900/70 px-4 py-3">
            <div className="flex items-center gap-2">
              <span
                className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]"
                aria-hidden
              />
              <p className="text-sm font-semibold text-white">Chat with me</p>
            </div>
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              className="rounded-full p-1 text-slate-300 transition hover:bg-white/10"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={listRef}
            className="relative flex h-[60vh] flex-col gap-3 overflow-y-auto bg-linear-to-b from-slate-950/70 via-slate-900/60 to-slate-900/80 px-4 py-4"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.05),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.06),transparent_35%)]" />
            <div className="relative flex flex-col gap-3">
              {renderedMessages}
              {loading ? (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-slate-200 shadow-lg shadow-black/10 backdrop-blur">
                    <span className="h-2 w-2 rounded-full bg-cyan-300 animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-cyan-300 animate-bounce [animation-delay:0.12s]" />
                    <span className="h-2 w-2 rounded-full bg-cyan-300 animate-bounce [animation-delay:0.24s]" />
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {listening ? (
            <div className="flex items-center gap-2 px-4 pb-1 text-xs font-semibold text-cyan-100">
              <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-2 shadow-inner shadow-black/20 ring-1 ring-white/10 backdrop-blur">
                <span className="flex h-2 w-1 rounded-full bg-cyan-300 animate-ping" />
                <span className="flex h-3 w-1 rounded-full bg-cyan-300 animate-ping [animation-delay:0.15s]" />
                <span className="flex h-2 w-1 rounded-full bg-cyan-300 animate-ping [animation-delay:0.3s]" />
                <span className="ml-2">Listening…</span>
              </div>
            </div>
          ) : null}

          <form
            onSubmit={sendMessage}
            className="flex items-center gap-2 border-t border-white/10 bg-slate-950/80 px-3 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none backdrop-blur"
              placeholder="Ask about Sandeep’s experience..."
            />
            <button
              type="button"
              onClick={toggleListening}
              disabled={!canRecognize || listening || loading}
              className="inline-flex items-center justify-center gap-1 rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-100 shadow-inner shadow-black/10 transition hover:border-cyan-400/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {listening ? (
                <Square className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-cyan-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:from-cyan-400 hover:to-indigo-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
