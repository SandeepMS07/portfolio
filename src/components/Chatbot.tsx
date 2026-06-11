"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MessageCircle, Send, X, Mic, Square, Sparkles, ArrowUpRight } from "lucide-react";

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

  // Clear the typewriter interval if the component unmounts mid-stream,
  // so we never call setState on an unmounted component.
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    };
  }, []);

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
            <div className="flex items-center gap-1.5 px-3 py-3">
              <span className="h-2 w-2 animate-bounce rounded-full bg-cyan [animation-delay:-0.2s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-violet [animation-delay:-0.1s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-magenta" />
            </div>
          ) : (
            <div className="flex max-w-[88%] flex-col items-start gap-2">
              <div
                className={`relative rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  isUser
                    ? "bg-gradient-to-br from-violet to-cyan text-night shadow-[0_8px_30px_-10px_rgba(255,94,44,0.5)]"
                    : "glass text-fg"
                }`}
              >
                <div className="prose prose-sm max-w-none *:my-0 [&>ul]:my-2 [&>p]:my-1">
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
                      className="cursor-pointer rounded-full border border-line bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-fg-dim transition-colors hover:border-violet/60 hover:text-fg"
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
                      className="cursor-pointer rounded-full border border-line bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-fg-dim transition-colors hover:border-violet/60 hover:text-fg"
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
  const promptChips = [
    { label: "Top projects", value: "Show me Sandeep's top projects." },
    { label: "Core skills", value: "What are his core skills and tech stack?" },
    { label: "Experience", value: "Summarize Sandeep's experience in 30 seconds." },
    { label: "AI / ML strengths", value: "Does he have AI/ML or backend strengths?" },
  ];
  const showSuggestions = messages.length <= 1 && !loading;

  const panel = (
    <div
      ref={panelRef}
      className={`glass pointer-events-auto relative flex flex-col overflow-hidden rounded-3xl shadow-[0_30px_90px_-25px_rgba(0,0,0,0.85)] ${
        isPage
          ? "h-[calc(100dvh-12.5rem)] min-h-[460px] w-full sm:h-[82vh] sm:max-h-[calc(100vh-150px)]"
          : "h-[60vh] w-[calc(100vw-2rem)] max-w-[440px]"
      }`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line bg-white/[0.02] px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(255,94,44,0.7)]" />
          </span>
          <div>
            <p className="text-sm font-semibold text-fg">Portfolio Assistant</p>
            <p className="text-xs text-fg-faint">
              Ask about skills, projects, or experience.
            </p>
          </div>
        </div>
        {!isPage && (
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="rounded-lg border border-line p-1.5 text-fg-dim transition-colors hover:border-violet/60 hover:text-fg"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div
        ref={listRef}
        className="relative flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-5"
      >
        <div className="flex flex-1 flex-col gap-3">
          {showSuggestions ? (
            isPage ? (
              /* immersive centered welcome */
              <div className="flex flex-1 flex-col items-center justify-center gap-5 py-4 text-center sm:gap-7 sm:py-8">
                <div className="relative">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,94,44,0.5),transparent_70%)] blur-2xl"
                  />
                  <div className="animate-float relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(255,94,44,0.28),rgba(255,71,51,0.08))] text-accent ring-1 ring-accent/30">
                    <Sparkles className="h-7 w-7" />
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="eyebrow">Portfolio Assistant</span>
                  <h2 className="font-poster text-4xl leading-[0.95] tracking-tight text-fg sm:text-5xl">
                    How can I <span className="text-aurora">help?</span>
                  </h2>
                  <p className="mx-auto max-w-md text-sm leading-relaxed text-fg-dim">
                    Ask about Sandeep&apos;s skills, projects, and experience —
                    in plain English. Tap a topic or type your own question.
                  </p>
                </div>

                {/* desktop: centered pill chips */}
                <div className="hidden flex-wrap justify-center gap-2.5 sm:flex">
                  {promptChips.map((chip) => (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={() => sendMessage(undefined, chip.value)}
                      className="btn-shine glass card-glow inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-fg-dim transition-colors hover:text-fg"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-accent" />
                      {chip.label}
                    </button>
                  ))}
                </div>

                {/* mobile: 2×2 quick-action tiles */}
                <div className="grid w-full grid-cols-2 gap-2.5 sm:hidden">
                  {promptChips.map((chip) => (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={() => sendMessage(undefined, chip.value)}
                      className="group glass card-glow flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(135deg,rgba(255,94,44,0.28),rgba(255,94,44,0.06))] text-accent ring-1 ring-accent/25">
                        <Sparkles className="h-4 w-4" />
                      </span>
                      <span className="text-[0.8125rem] font-semibold leading-tight text-fg">
                        {chip.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* floating widget welcome */
              <div className="flex flex-col gap-4">
                <div className="flex items-end gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(255,94,44,0.3),rgba(255,71,51,0.1))] text-accent ring-1 ring-accent/30">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <div className="glass max-w-[88%] rounded-2xl rounded-bl-md px-4 py-3 text-sm leading-relaxed text-fg">
                    Hey! I&apos;m Sandeep&apos;s portfolio assistant. Ask me
                    about his skills, projects, or experience — or tap a prompt
                    to begin.
                  </div>
                </div>
                <div className="mt-1 grid gap-2.5 pl-10 sm:grid-cols-2">
                  {suggestionPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(undefined, prompt)}
                      className="group glass card-glow flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left text-sm text-fg-dim transition-colors hover:text-fg"
                    >
                      <span>{prompt}</span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </button>
                  ))}
                </div>
              </div>
            )
          ) : (
            renderedMessages
          )}
        </div>
      </div>

      {listening ? (
        <div className="border-t border-line bg-white/[0.02] px-5 py-9">
          <div className="flex flex-col items-center gap-6 text-center">
            {/* pulsing mic orb */}
            <div className="relative flex h-24 w-24 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent/15" />
              <span className="absolute inset-2 animate-ping rounded-full bg-accent/10 [animation-delay:0.4s]" />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ff7a45,#ff4733)] text-white shadow-[0_0_44px_-6px_rgba(255,94,44,0.85)]">
                <Mic className="h-6 w-6" />
              </span>
            </div>

            {/* live waveform */}
            <div className="flex h-7 items-center gap-1">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <span
                  key={i}
                  className="animate-eq w-1 rounded-full bg-accent"
                  style={{
                    height: "100%",
                    animationDelay: `${(i % 5) * 0.13}s`,
                    opacity: 0.5 + ((i + 1) % 3) * 0.2,
                  }}
                />
              ))}
            </div>

            <div className="space-y-1.5">
              <p className="eyebrow">Listening…</p>
              <p className="max-w-sm text-sm text-fg-dim">
                {input.trim()
                  ? `“${input}”`
                  : "Tell me your question and I’ll send it."}
              </p>
            </div>

            <button
              type="button"
              onClick={toggleListening}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white/[0.05] px-5 py-2.5 text-sm font-medium text-fg ring-1 ring-white/12 transition-colors hover:bg-white/10"
            >
              <Square className="h-3.5 w-3.5 text-accent" />
              Stop listening
            </button>
          </div>
        </div>
      ) : null}

      <form
        onSubmit={sendMessage}
        className="border-t border-line bg-white/[0.02] px-4 py-3"
      >
        <div className="flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-xl border border-line bg-white/[0.03] px-3.5 py-2.5 text-sm text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-violet/60"
          placeholder="Ask about Sandeep’s experience…"
        />
        <button
          type="button"
          onClick={toggleListening}
          disabled={!canRecognize || loading}
          className="inline-flex items-center justify-center rounded-xl border border-line bg-white/[0.03] px-3 py-2.5 text-fg-dim transition-colors hover:border-violet/60 hover:text-fg disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={listening ? "Stop listening" : "Start voice input"}
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
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet to-cyan px-4 py-2.5 text-sm font-medium text-white shadow-[0_8px_24px_-10px_rgba(255,94,44,0.5)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
        </div>
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
          className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet to-cyan text-night shadow-[0_12px_40px_-8px_rgba(255,94,44,0.5)] transition-transform hover:-translate-y-0.5"
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
