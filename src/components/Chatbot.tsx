"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MessageCircle, Send, X, Mic, Square } from "lucide-react";

type ChatbotProps = {
  mode?: "floating" | "page";
  initialQuery?: string;
};

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

export default function Chatbot({
  mode = "floating",
  initialQuery = "",
}: ChatbotProps) {
  const isPage = mode === "page";
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(initialQuery);
  const [collapsed, setCollapsed] = useState(isPage ? false : true);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const targetTextRef = useRef("");
  const displayedTextRef = useRef("");
  const panelRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<WebSpeechRecognition | null>(null);
  const [canRecognize, setCanRecognize] = useState(false);
  const [listening, setListening] = useState(false);
  const autoQueryRef = useRef<string | null>(null);

  // Sync incoming query to input when navigating with ?q=
  useEffect(() => {
    setInput(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, collapsed]);

  useEffect(() => {
    if (isPage) return;
    const handleClick = (event: MouseEvent) => {
      if (collapsed) return;
      const panel = panelRef.current;
      if (panel && !panel.contains(event.target as Node)) {
        setCollapsed(true);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [collapsed, isPage]);

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

  const sendMessage = useCallback(
    async (event?: FormEvent, override?: string) => {
      event?.preventDefault();
      const trimmed = (override ?? input).trim();
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
        const historyForApi = nextMessages
          .slice(0, -1) // drop the empty assistant placeholder
          .filter((msg) => msg.content.trim() !== "")
          .slice(-10);

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history: historyForApi }),
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
            const step = Math.max(
              1,
              Math.min(2, target.length - current.length)
            );
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
    },
    [input, loading, messages]
  );

  useEffect(() => {
    const query = initialQuery.trim();
    if (!query || autoQueryRef.current === query) return;
    autoQueryRef.current = query;
    setInput(query);
    // Defer send to allow input state to update
    setTimeout(() => {
      void sendMessage(undefined, query);
    }, 0);
  }, [initialQuery, sendMessage]);

  const lastAssistantMessage = useMemo(
    () =>
      [...messages]
        .reverse()
        .find(
          (message) =>
            message.role === "assistant" && message.content.trim() !== ""
        ) || null,
    [messages]
  );

  const showYesNoQuickReplies =
    !!lastAssistantMessage &&
    /yes\/no/i.test(lastAssistantMessage.content) &&
    !loading;

  const choiceQuickReplies = useMemo(() => {
    if (!lastAssistantMessage || loading) return [];
    const text = lastAssistantMessage.content.toLowerCase();
    const options: { label: string; value: string }[] = [];

    if (text.includes("1-line summary") || text.includes("summary")) {
      options.push({
        label: "Summary",
        value: "Please give me the 1-line summary of Sandeep's profile.",
      });
    }
    if (text.includes("core skills") || text.includes("skills")) {
      options.push({
        label: "Core skills",
        value: "Show me Sandeep's core skills.",
      });
    }
    if (text.includes("flagship projects") || text.includes("projects")) {
      options.push({
        label: "Projects",
        value: "Show me Sandeep's flagship projects.",
      });
    }
    if (text.includes("ai/ml exposure") || text.includes("ai/ml")) {
      options.push({
        label: "AI/ML exposure",
        value: "Show me Sandeep's AI/ML exposure and related work.",
      });
    }

    return options;
  }, [lastAssistantMessage, loading]);

  const renderedMessages = useMemo(() => {
    const lastIndex = messages.length - 1;

    return messages.map((message, idx) => {
      const isUser = message.role === "user";
      const isAssistantPlaceholder =
        message.role === "assistant" &&
        message.content.trim() === "" &&
        loading &&
        idx === lastIndex;

      if (!isUser && message.content.trim() === "" && !isAssistantPlaceholder) {
        return null;
      }

      const isLastAssistant =
        !isUser &&
        !isAssistantPlaceholder &&
        lastAssistantMessage &&
        message === lastAssistantMessage &&
        (showYesNoQuickReplies || choiceQuickReplies.length > 0);

      return (
        <div
          key={idx.toString()}
          className={`flex ${isUser ? "justify-end" : "justify-start"}`}
        >
          {isAssistantPlaceholder ? (
            <div className="flex items-center gap-2 px-4 py-3">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.9)] animate-ping" />
            </div>
          ) : (
            <div className="flex flex-col items-start gap-2">
              <div
                className={`relative max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-lg shadow-black/20 ${
                  isUser
                    ? "bg-linear-to-br from-cyan-500 to-indigo-500 text-white min-w-[60px]"
                    : "bg-white/5 text-slate-100 border border-white/10"
                }`}
              >
                <div className="prose prose-invert prose-sm max-w-none *:my-0 [&>ul]:my-2 [&>p]:my-1">
                  {renderMessageContent(message.content)}
                </div>
              </div>
              {isLastAssistant && showYesNoQuickReplies ? (
                <div className="flex flex-wrap gap-2">
                  {["Yes", "No"].map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => sendMessage(undefined, label)}
                      className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-100 shadow-inner shadow-black/20 transition hover:border-cyan-400/60 hover:bg-cyan-500/20 cursor-pointer"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              ) : null}
              {isLastAssistant &&
              !showYesNoQuickReplies &&
              choiceQuickReplies.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {choiceQuickReplies.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => sendMessage(undefined, option.value)}
                      className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-100 shadow-inner shadow-black/20 transition hover:border-cyan-400/60 hover:bg-cyan-500/20 cursor-pointer"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      );
    });
  }, [
    messages,
    lastAssistantMessage,
    showYesNoQuickReplies,
    choiceQuickReplies,
    sendMessage,
    loading,
  ]);

  const suggestionPrompts = [
    "Show me Sandeep's top projects.",
    "What are his core skills and tech stack?",
    "Summarize Sandeep's experience in 30 seconds.",
    "Does he have AI/ML or backend strengths?",
  ];
  const showSuggestions = messages.length <= 1 && !loading;

  const panel = (
    <div
      ref={panelRef}
      className={`pointer-events-auto relative flex flex-col overflow-hidden rounded-3xl border border-cyan-500/15 bg-slate-950/80 backdrop-blur-2xl shadow-[0_15px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/5 ${
        isPage
          ? "w-full h-[70vh] min-h-[420px] max-h-[calc(100vh-220px)]"
          : "w-[calc(100vw-2rem)] max-w-[440px] h-[60vh]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.12),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(129,140,248,0.14),transparent_35%),radial-gradient(circle_at_30%_80%,rgba(16,185,129,0.12),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_18%,rgba(255,255,255,0.04)_36%,rgba(255,255,255,0)_54%,rgba(255,255,255,0.04)_72%,rgba(255,255,255,0)_90%)] opacity-30" />
      <div className="relative flex items-center justify-between gap-3 border-b border-white/10 bg-linear-to-r from-slate-900/70 via-slate-900/60 to-slate-900/50 px-5 py-4">
        <div className="flex items-center gap-3">
          <span
            className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.75)] ring-2 ring-emerald-400/20"
            aria-hidden
          />
          <div>
            <p className="text-sm font-semibold text-white">Chat with me</p>
            <p className="text-xs text-slate-300/80">
              Hey! I’m Sandeep’s assistant. Ask me about his skills, projects,
              or experience.
            </p>
          </div>
        </div>
        {!isPage && (
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="rounded-full p-1.5 text-slate-300 transition hover:bg-white/10"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div
        ref={listRef}
        className="relative flex flex-1 min-h-0 flex-col gap-3 overflow-y-auto bg-linear-to-b from-slate-950/65 via-slate-900/55 to-slate-900/70 px-5 py-5"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.05),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.06),transparent_35%)]" />
        <div className="relative flex flex-1 flex-col gap-3">
          {renderedMessages}
          <div className="mt-auto">
            {showSuggestions ? (
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900/70 via-slate-900/60 to-emerald-900/70 px-5 py-5 shadow-xl shadow-black/35 backdrop-blur">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.16),transparent_42%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.16),transparent_42%)] opacity-80" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_18%,rgba(255,255,255,0.08)_36%,rgba(255,255,255,0)_54%,rgba(255,255,255,0.08)_72%,rgba(255,255,255,0)_90%)] opacity-25" />

                <div className="relative space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                    Quick prompts
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {suggestionPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => sendMessage(undefined, prompt)}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-cyan-400/50 hover:bg-white/10 hover:text-white shadow-inner shadow-black/20 cursor-pointer"
                      >
                        <div className="pointer-events-none absolute inset-0 translate-y-full bg-gradient-to-r from-cyan-400/20 via-emerald-400/20 to-indigo-400/20 transition duration-500 group-hover:translate-y-0" />
                        <span className="relative block">{prompt}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {listening ? (
        <div className="px-5 pb-3">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-400/25 bg-gradient-to-b from-slate-950/90 via-slate-950/85 to-emerald-950/70 px-5 py-6 shadow-[0_20px_60px_rgba(16,185,129,0.25)] backdrop-blur">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(52,211,153,0.25),transparent_50%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.24),transparent_45%)] opacity-75" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_18%,rgba(255,255,255,0.1)_36%,rgba(255,255,255,0)_54%,rgba(255,255,255,0.1)_72%,rgba(255,255,255,0)_90%)] opacity-20" />

            <div className="relative flex flex-col items-center gap-6 text-center">
              <p className="text-sm font-semibold text-emerald-100">
                Listening…
              </p>

              <div className="relative h-32 w-32 perspective-[900px] sm:h-36 sm:w-36">
                <div className="absolute inset-0 animate-[spin_18s_linear_infinite] rounded-full bg-[conic-gradient(from_140deg,#0ea5e9_0%,#22c55e_20%,#0ea5e9_45%,#16a34a_70%,#0ea5e9_100%)] blur-[3px] opacity-70" />
                <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(255,255,255,0.32),rgba(16,185,129,0.25),rgba(0,0,0,0.55))]" />
                <div className="absolute inset-[14%] rounded-full bg-[radial-gradient(circle_at_70%_25%,rgba(255,255,255,0.4),transparent_55%)] opacity-90" />
                <div className="absolute inset-[4%] rounded-full bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.25),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(14,165,233,0.25),transparent_55%)] mix-blend-screen opacity-80" />
                <div className="absolute inset-[10%] rounded-full bg-gradient-to-br from-white/15 via-emerald-400/10 to-transparent opacity-70 [transform:rotateX(16deg)_rotateY(-12deg)]" />
                <div className="absolute inset-0 rounded-full shadow-[0_0_36px_rgba(16,185,129,0.6)]" />
                <div className="absolute inset-0 animate-[orbPulse_3s_ease-in-out_infinite] rounded-full bg-emerald-400/10 blur-xl" />
              </div>

              <p className="text-sm leading-relaxed text-slate-200/90">
                {input.trim()
                  ? `“${input}”`
                  : "Tell me your question and I’ll send it."}
              </p>

              <button
                type="button"
                onClick={toggleListening}
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/40 transition hover:scale-[1.02] hover:shadow-emerald-400/45 cursor-pointer"
              >
                Stop listening
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <form
        onSubmit={sendMessage}
        className="relative flex items-center gap-2 border-t border-white/10 bg-slate-950/85 px-4 py-3"
      >
        <div className="pointer-events-none absolute -top-6 left-8 h-12 w-12 rounded-full bg-cyan-500/20 blur-3xl" />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 transition focus:border-cyan-400 focus:outline-none focus:shadow-[0_10px_40px_rgba(6,182,212,0.25)] backdrop-blur"
          placeholder="Ask about Sandeep’s experience..."
        />
        <button
          type="button"
          onClick={toggleListening}
          disabled={!canRecognize || loading}
          className="inline-flex items-center justify-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-100 shadow-inner shadow-black/10 transition hover:border-cyan-300/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
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
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-cyan-500 via-sky-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5 hover:shadow-blue-500/35 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
        >
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );

  if (isPage) {
    return <div className="relative w-full">{panel}</div>;
  }

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
        panel
      )}
    </div>
  );
}
