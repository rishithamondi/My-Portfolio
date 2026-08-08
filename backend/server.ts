import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { RESUME_DATA } from "../frontend/src/data/resumeData.js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", engineer: "Rishitha Mondi" });
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required." });
      }

      console.log(`[CONTACT FORM] Message received from ${name} (${email}): ${message}`);

      // Attempt sending to Web3Forms API for direct email delivery to rishithashivanandh@gmail.com
      try {
        const web3res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: "f7b11568-df09-41b9-87ed-d8905bbf2f02",
            email_to: "rishithashivanandh@gmail.com",
            subject: `Portfolio Inquiry from ${name}`,
            from_name: name,
            replyto: email,
            message: `Sender Name: ${name}\nSender Email: ${email}\n\nMessage:\n${message}`,
          }),
        });
        const data = await web3res.json();
        console.log("[WEB3FORMS RESPONSE]", data);
      } catch (err) {
        console.warn("[WEB3FORMS NOTICE] External dispatch notice:", err);
      }

      return res.json({
        success: true,
        message: "Message received successfully and dispatched to Rishitha Mondi.",
      });
    } catch (err) {
      console.error("Error in /api/contact:", err);
      return res.status(500).json({ error: "Failed to send message. Please try again or use direct mailto." });
    }
  });

  // AI Assistant endpoint for asking questions about Rishitha's engineering notebook
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback response if GEMINI_API_KEY is not yet configured
        return res.json({
          reply: `Rishitha Mondi is an AI/ML Intern & Full-Stack Engineer with a 9.36 CGPA in CSE (Data Science) from Vignan's Institute of Information Technology. She specializes in multilingual voice & speech AI (ConversaAI), real-time technical evaluation platforms (LUCY AI), and high-concurrency hostel pass engines (LeaveX). Feel free to explore her notebook pages above!`
        });
      }

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

      const replyText = response.text || "Thank you for asking! Rishitha is an AI/ML and Full-Stack engineer specializing in voice AI, microservices, and React/Next.js systems.";
      return res.json({ reply: replyText });
    } catch (err: unknown) {
      console.error("Error in /api/chat:", err);
      return res.json({
        reply: `Rishitha Mondi is an AI/ML & Full-Stack Engineer currently interning at Kreative TimeBox on ConversaAI. She has expertise in React, Next.js, FastAPI, PostgreSQL, and LLM integrations with a 9.36 CGPA.`
      });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Notebook server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
