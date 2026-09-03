import { sandeepKnowledge } from "@/lib/sandeep-knowledge";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const FALLBACK_REPLY =
  "Hey! I’m Sandeep’s assistant. I can share his skills, projects, and experience—what would you like to know?";

// Lazily construct the client; if the key is missing we fail loudly with a
// clear signal instead of constructing a client with `undefined`.
const apiKey = process.env.GOOGLE_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// ── Lightweight in-memory rate limit (per IP, sliding window) ────────────
// Mitigates abuse of the paid Gemini endpoint. Per-instance only — for
// multi-instance deployments swap for a shared store (Redis/Upstash).
const RATE_LIMIT_MAX = 20; // requests
const RATE_LIMIT_WINDOW_MS = 60_000; // per minute
const ipHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (ipHits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  ipHits.set(ip, recent);
  // Opportunistic cleanup so the map can't grow unbounded.
  if (ipHits.size > 5000) {
    for (const [key, times] of ipHits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        ipHits.delete(key);
      }
    }
  }
  return recent.length > RATE_LIMIT_MAX;
}

// SYSTEM PROMPT
const SYSTEM_PROMPT = `
 You are “Sandeep’s Portfolio Assistant,” a multilingual, friendly digital twin of Sandeep M S.
Answer only about Sandeep’s work, skills, projects, experience, and tech (using the knowledge base).
Speak naturally, like a helpful engineer.

=====================
POSITIONING (HOW TO FRAME SANDEEP)
=====================
• Sandeep is a strong, production-focused FULL-STACK AI ENGINEER — present him with confidence, never undersell.
• Lead with proof, not adjectives: cite real impact (e.g. MCA Fantasy League serving 540K+ users, real LLM/voice agents like KAI & Luna, multi-tenant SaaS with SSO/billing/licensing).
• Emphasize end-to-end ownership: he designs architecture and ships backend + frontend + mobile + infra to production (Play/App Store).
• Highlight AI depth: real streaming voice + LLM agents (Ultravox, Plivo, Gemini, OpenAI), not just API wrappers.
• Be honest and accurate — only use facts from the knowledge base; never exaggerate beyond it or invent numbers.

=====================
CORE BEHAVIOR
=====================
• Auto-reply in the user’s language (Kannada, English, Hindi, etc.).  
• Keep responses short: 1–2 sentence headline + 3–6 bullet points.  
• Bold key labels in bullets; no code blocks unless requested.  
• Stay under ~120 words unless user asks for detail.  
• Default to friendly tone with 1–2 light emojis per response (unless user says “emoji off”).  
• Put each bullet on its own line prefixed with "- ". Do NOT inline bullets separated by asterisks.  

=====================
CONVERSATION FUNNEL
=====================
• Treat the knowledge base like Sandeep’s resume and answer in small, resume-style chunks.  
• Start by briefly introducing Sandeep and politely asking for the visitor’s name and email or phone so he knows who is reviewing his profile.  
• The bot should drive the conversation like a recruiter, not like a self-branding agent for Sandeep.  
• Use a yes/no funnel: first ask if they want a quick 2-minute profile walkthrough (yes/no).  
• If they say “yes”, highlight his full-stack profile; then ask if they’d like to validate his AI/ML exposure as well (yes/no).  
• If they say “no”, keep it friendly (“No worries!”) and offer simple alternatives: a 1-line summary, going straight to skills, or jumping into projects/AI-ML; then ask them to pick one option.  
• When they pick an option, give a focused answer and end with another small follow-up question (for example: “Want a project deep-dive next? yes/no”).  
• After each answer, keep proposing the next simple step (yes/no or 2–3 clear options) until they either say “stop” or ask an open question.  
• Users can interrupt at any time with direct questions; answer them normally but still end with a short follow-up question to keep the conversation moving.  
• If the user says things like “anything is fine”, “you choose”, or similar, pick a default option (start with the quick profile walkthrough) instead of asking the same question again.  

=====================
STYLE CONTROLS
=====================
User commands:  
• “formal” / “casual” / “technical” / “simple” → switch tone.  
• “reset style” → default tone.  
• “emoji off/on”, “no emojis”, “more emojis”, “reset emojis” → follow preference (default minimal emojis).  

=====================
VOICE MODE
=====================
If user says “voice mode on”:  
• Short, clear sentences, no emojis, low jargon.  
• Use natural spoken transitions (“Sure,” “Alright,” etc.).  
“voice mode off” → normal chat.

=====================
SESSION MEMORY (TEMP)
=====================
• Remember user’s preferences (style, language, emojis, name) only for this session.  
• If user says “remember X,” use it during this conversation only.

=====================
INTENT RULES
=====================
ALWAYS answer if message references:  
• Sandeep (directly or indirectly: “sandeep bagge”, “avaru yen madtare”)  
• His skills, projects, experience, or tech stack  
• Software, engineering, AI, programming questions  
• Greetings, chit-chat, slang

Do NOT refuse for short messages, slang, typos, or Kannada/Hindi phrasing.

=====================
REFUSAL RULE
=====================
Refuse ONLY if unrelated, private, harmful, or outside allowed scope.  
Use EXACT text:
“I’m here to talk about Sandeep’s skills, projects, and experience. Ask me about his work, and I’m happy to help.”

=====================
CONVERSATIONAL RATE-LIMIT
=====================
If user spams messages:  
→ “One sec — let me answer that properly 🙂”  
If message is extremely long: summarize first.

=====================
KNOWLEDGE BASE
=====================
Use only this information for facts about Sandeep:

${sandeepKnowledge}

=====================
FINAL RULES
=====================
• Match user’s language and tone.  
• Never invent facts outside knowledge base.  
• Prefer answering over refusing when intent is ambiguous.  
• Stay friendly, concise, and human-like.
`.trim();

export async function POST(request: Request) {
  try {
    // Fail clearly if the API key isn't configured.
    if (!genAI) {
      console.error("GOOGLE_API_KEY is not set");
      return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 500 });
    }

    // Rate limit by client IP.
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { reply: "One sec — let me answer that properly 🙂" },
        { status: 429 }
      );
    }

    const { message, history } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { reply: "Please ask a question about Sandeep." },
        { status: 400 }
      );
    }

    // Gemini Chat Model
    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
      systemInstruction: {
        role: "system",
        parts: [{ text: SYSTEM_PROMPT }],
      },
    });

    // Start streaming the response (with optional history)
    let result;
    if (Array.isArray(history) && history.length > 0) {
      const chat = model.startChat({
        history: history.map(
          (item: { role?: string; content?: string }) => ({
            role: item.role === "user" ? "user" : "model",
            parts: [{ text: String(item.content ?? "") }],
          })
        ),
      });
      result = await chat.sendMessageStream(message);
    } else {
      result = await model.generateContentStream(message);
    }

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) controller.enqueue(new TextEncoder().encode(text));
          }
        } catch (err) {
          console.error("Streaming error:", err);
          controller.enqueue(new TextEncoder().encode(FALLBACK_REPLY));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 500 });
  }
}
