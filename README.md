# Rishitha Mondi — Interactive Engineering Notebook Portfolio

A full-stack, responsive, notebook-themed portfolio website with an integrated AI Companion Assistant, interactive engineering project showcase, curriculum vitae viewer, and contact form.

---

## 📁 Repository Directory Structure

```text
├── frontend/                 # FRONTEND APPLICATION (React 19 + TypeScript + Tailwind CSS v4)
│   └── src/                  # React Source Code
│       ├── components/       # UI Components (Notebook, AI Assistant, Resume, Pages)
│       │   ├── AINotebookAssistant.tsx  # Floating Draggable AI Assistant
│       │   ├── ResumeModal.tsx          # CV & Print PDF Generator
│       │   ├── NotebookHeader.tsx       # Top Bar Controls & Sound Toggles
│       │   ├── BookmarkTabs.tsx         # Side Ribbon Navigation
│       │   ├── CoverPage.tsx            # Front Cover & Engineering Index
│       │   ├── ProjectsPage.tsx         # Engineering Case Studies
│       │   ├── ContactPage.tsx          # Direct Contact Form & Links
│       │   └── ...
│       ├── data/             # Resume Data & Engineering Notebook Records
│       │   └── resumeData.ts
│       ├── index.css         # Tailwind Styles & Notebook Paper Effects
│       ├── main.tsx          # React Entry Point
│       └── App.tsx           # Main Application Container
│
├── backend/                  # BACKEND APPLICATION (Node.js + Express API Server)
│   └── server.ts             # Express REST API Server
│       ├── POST /api/contact # Contact Form Email Dispatch Endpoint
│       ├── POST /api/chat    # AI Portfolio Assistant Endpoint (Gemini 2.5)
│       └── GET  /api/health  # Health Check Endpoint
│
├── .env.example              # Environment Variables Template
├── .gitignore                # Git Exclusions File
├── index.html                # HTML Entry Point
├── package.json              # Dependencies and Full-Stack Scripts
├── vite.config.ts            # Vite Frontend Bundler Configuration
├── tsconfig.json             # TypeScript Configuration
└── README.md                 # Project Setup & Quick Start Documentation
```

---

## ⚙️ Prerequisites for Local PC Execution

Before starting, ensure you have installed:

1. **Node.js** (version 18.0.0 or higher): [Download Node.js](https://nodejs.org/)
2. **npm** (included with Node.js)
3. **Git**: [Download Git](https://git-scm.com/)
4. *(Optional)* **Google Gemini API Key**: For live AI responses in the chatbot.

---

## 🚀 Commands to Start the Project on Local PC

Open your terminal (Command Prompt, PowerShell, or macOS Terminal) and run:

### 1️⃣ Step 1: Clone or Open the Repository
```bash
git clone <your-repository-url>
cd <repository-folder-name>
```

### 2️⃣ Step 2: Install All Dependencies
```bash
npm install
```

### 3️⃣ Step 3: Create Environment Configuration
Copy the example environment file to `.env`:
```bash
cp .env.example .env
```
*(Optional)* Add your Gemini API key inside `.env`:
```env
GEMINI_API_KEY="your_gemini_api_key_here"
```

### 4️⃣ Step 4: Run the Development Server (Frontend + Backend)
Start both the Express backend server and the React Vite frontend:
```bash
npm run dev
```

### 5️⃣ Step 5: Open in Web Browser
Navigate to:
```text
http://localhost:3000
```

---

## 🛠️ Summary of NPM Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts full-stack dev server (`backend/server.ts` + React Vite) on port `3000` |
| `npm run build` | Compiles frontend and bundles `backend/server.ts` for production |
| `npm run start` | Runs production built server (`dist/server.cjs`) |
| `npm run lint` | Runs TypeScript compiler verification |
| `npm run clean` | Cleans build artifacts (`dist/`) |
