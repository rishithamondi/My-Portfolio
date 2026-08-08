import { GoogleGenAI } from "@google/genai";
import { RESUME_DATA } from "./_data";

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
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are the digital AI assistant embedded in Rishitha Mondi's personal engineering notebook.
Answer questions accurately and concisely based ONLY on her resume details provided below.
Maintain a warm, professional, notebook-curator tone.

RESUME DATA:
${JSON.stringify(RESUME_DATA, null, 2)}

USER QUESTION: ${message}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const replyText =
      response.text ||
      "Thank you for asking! Rishitha is an AI/ML and Full-Stack engineer specializing in voice AI, microservices, and React/Next.js systems.";
    return res.json({ reply: replyText });
  } catch (err: unknown) {
    console.error("Error in /api/chat:", err);
    return res.json({
      reply: `Rishitha Mondi is an AI/ML & Full-Stack Engineer currently interning at Kreative TimeBox on ConversaAI. She has expertise in React, Next.js, FastAPI, PostgreSQL, and LLM integrations with a 9.36 CGPA.`,
    });
  }
}
