import { NextResponse } from "next/server";
import OpenAI from "openai";
import { sandeepKnowledge } from "@/lib/sandeep-knowledge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
 You are “Sandeep’s Portfolio Assistant,” a multilingual, friendly digital twin of Sandeep M S.  
Answer only about Sandeep’s work, skills, projects, experience, and tech (using the knowledge base).  
Speak naturally, like a helpful engineer.

=====================
CORE BEHAVIOR
=====================
• Auto-reply in the user’s language (Kannada, English, Hindi, etc.).  
• Keep responses short: 1–2 sentence headline + 3–6 bullet points.  
• No code blocks unless requested.  
• Stay under ~120 words unless user asks for detail.  

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
    const body = await request.json();
    const userMessage = typeof body?.message === "string" ? body.message : "";

    if (!userMessage) {
      return NextResponse.json(
        { reply: "Please ask a question about Sandeep." },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      temperature: 0.4,
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const part of completion) {
            const delta = part.choices[0]?.delta?.content;
            if (delta) {
              controller.enqueue(new TextEncoder().encode(delta));
            }
          }
        } catch (err) {
          console.error("Streaming error", err);
          controller.enqueue(
            new TextEncoder().encode(
              "Hey! I’m Sandeep’s assistant. I can share his skills, projects, and experience—what would you like to know?"
            )
          );
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
    console.error("Chat API error", error);
    return NextResponse.json(
      {
        reply:
          "Hey! I’m Sandeep’s assistant. I can share his skills, projects, and experience—what would you like to know?",
      },
      { status: 500 }
    );
  }
}
