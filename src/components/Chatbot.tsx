"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
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
    return <span className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: formatInline(content) }} />;
  }

  return blocks.map((block, idx) => {
    const lines = block.split("\n").filter(Boolean);
    const isList = lines.length > 1 && lines.every((line) => line.trim().startsWith("- "));

    if (isList) {
      return (
        <ul key={`block-${idx}`} className="ml-4 list-disc space-y-1">
          {lines.map((line, liIdx) => (
            <li
              key={`li-${idx}-${liIdx}`}
              dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^- /, "")) }}
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
    { role: "assistant", content: "Hey! I’m Sandeep’s assistant. Ask me about his skills, projects, or experience." },
  ]);
  const [input, setInput] = useState("");
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const pendingTextRef = useRef("");

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, collapsed]);

  const sendMessage = async (event?: FormEvent) => {
    event?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed },
      { role: "assistant", content: "" },
    ];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";
      pendingTextRef.current = "";

      const flushFrame = () => {
        if (rafIdRef.current !== null) return;
        rafIdRef.current = requestAnimationFrame(() => {
          setMessages((prev) => {
            const updated = [...prev];
            const lastIndex = updated.length - 1;
            if (lastIndex >= 0 && updated[lastIndex].role === "assistant") {
              updated[lastIndex] = { role: "assistant", content: pendingTextRef.current };
            }
            return updated;
          });
          rafIdRef.current = null;
        });
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        pendingTextRef.current = assistantText;
        flushFrame();
      }

      // Final decode flush
      assistantText += decoder.decode();
      pendingTextRef.current = assistantText || pendingTextRef.current;
      flushFrame();
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
    } finally {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      setLoading(false);
    }
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {collapsed ? (
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-indigo-500 text-white shadow-xl shadow-cyan-500/35 ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:shadow-cyan-400/40"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      ) : (
        <div className="pointer-events-auto w-[calc(100vw-2rem)] max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.55)]">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/80 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]" aria-hidden />
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
            className="relative flex max-h-[75vh] min-h-[360px] flex-col gap-3 overflow-y-auto bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900/80 px-4 py-4"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.05),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.06),transparent_35%)]" />
            <div className="relative flex flex-col gap-3">
              {messages.map((message, idx) => (
                <div
                  key={idx.toString()}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg shadow-black/20 ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-cyan-500 to-indigo-500 text-white"
                        : "bg-white/5 text-slate-100 border border-white/10"
                    }`}
                  >
                    <div className="prose prose-invert prose-sm max-w-none [&>*]:my-0 [&>ul]:my-2 [&>p]:my-1">
                      {renderMessageContent(message.content)}
                    </div>
                  </div>
                </div>
              ))}
            {loading ? (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
                  <span className="h-2 w-2 rounded-full bg-cyan-300 animate-bounce" />
                  <span className="h-2 w-2 rounded-full bg-cyan-300 animate-bounce [animation-delay:0.12s]" />
                  <span className="h-2 w-2 rounded-full bg-cyan-300 animate-bounce [animation-delay:0.24s]" />
                  <span className="ml-1">Thinking…</span>
                </div>
              </div>
            ) : null}
            </div>
          </div>

          <form
            onSubmit={sendMessage}
            className="flex items-center gap-2 border-t border-white/10 bg-slate-900/80 px-3 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
              placeholder="Ask about Sandeep’s experience..."
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:from-cyan-400 hover:to-indigo-400 disabled:cursor-not-allowed disabled:opacity-70"
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
