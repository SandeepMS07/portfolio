import { NextResponse } from "next/server";
import OpenAI from "openai";
import { sandeepKnowledge } from "@/lib/sandeep-knowledge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are Sandeep M S's personal portfolio assistant.
- Use the Sandeep knowledge base to answer questions about him.
- For general, simple factual or tech questions (e.g., "who is the prime minister of India?"), give a concise answer.
- For quick greetings or compliments (e.g., "hi", "thanks", "nice"), respond with a short friendly acknowledgement and offer to help.
- For unrelated personal/unknown topics outside Sandeep and simple facts, respond exactly with:
  "I’m here to talk about Sandeep’s skills, projects, and experience. Ask me about his work, and I’m happy to help."
- Do not repeat the refusal for valid Sandeep or general factual/tech questions.
- Keep answers brief and well-formatted for chat:
  - Lead with a 1–2 sentence headline.
  - Then 3–6 short bullet points (use "-" bullets), each on its own line.
  - No code blocks or heavy markdown; only simple bullets and bold for titles when helpful.
  - Stay under ~120 words unless the user asks for more.

Knowledge:
${sandeepKnowledge}
`.trim();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userMessage = typeof body?.message === "string" ? body.message : "";

    if (!userMessage) {
      return NextResponse.json({ reply: "Please ask a question about Sandeep." }, { status: 400 });
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
              "Hey! I’m Sandeep’s assistant. I can share his skills, projects, and experience—what would you like to know?",
            ),
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
      { reply: "Hey! I’m Sandeep’s assistant. I can share his skills, projects, and experience—what would you like to know?" },
      { status: 500 },
    );
  }
}
