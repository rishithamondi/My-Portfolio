import { RESUME_DATA } from "./_data";

// Uses Gemini REST API directly via fetch — no SDK, no ESM/CJS compatibility issues.
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body || {};
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.json({
      reply: `Rishitha Mondi is an AI/ML Intern & Full-Stack Engineer with a 9.36 CGPA in CSE (Data Science) from Vignan's Institute of Information Technology. She specializes in multilingual voice & speech AI (ConversaAI), real-time technical evaluation platforms (LUCY AI), and high-concurrency hostel pass engines (LeaveX). Feel free to explore her notebook pages above!`,
    });
  }

  try {
    const prompt = `You are the digital AI assistant embedded in Rishitha Mondi's personal engineering notebook.
Answer questions accurately and concisely based ONLY on her resume details provided below.
Maintain a warm, professional, notebook-curator tone.

RESUME DATA:
${JSON.stringify(RESUME_DATA, null, 2)}

USER QUESTION: ${message}`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error("Gemini API error:", geminiRes.status, errText);
      return res.json({
        reply: `Rishitha Mondi is an AI/ML & Full-Stack Engineer currently interning at Kreative TimeBox on ConversaAI. She has expertise in React, Next.js, FastAPI, PostgreSQL, and LLM integrations with a 9.36 CGPA.`,
      });
    }

    const data = await geminiRes.json() as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const replyText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Thank you for asking! Rishitha is an AI/ML and Full-Stack engineer specializing in voice AI, microservices, and React/Next.js systems.";

    return res.json({ reply: replyText });
  } catch (err: unknown) {
    console.error("Error in /api/chat:", err);
    return res.json({
      reply: `Rishitha Mondi is an AI/ML & Full-Stack Engineer currently interning at Kreative TimeBox on ConversaAI. She has expertise in React, Next.js, FastAPI, PostgreSQL, and LLM integrations with a 9.36 CGPA.`,
    });
  }
}
