import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Rnd } from 'react-rnd';
import { X, Send, Sparkles, RefreshCw, Compass, Minus, Square, Maximize2, Minimize2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { SunflowerLogo } from './SunflowerLogo';
import { SpiralBinding } from './SpiralBinding';

interface AINotebookAssistantProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface WindowState {
  x: number;
  y: number;
  width: number;
  height: number;
}

const STORAGE_KEY = 'portfolio_chat_window_state_v2';

const DEFAULT_DESKTOP_SIZE = { width: 400, height: 610 };
const MIN_SIZE = { width: 320, height: 420 };
const MAX_SIZE = { width: 620, height: 800 };

export const AINotebookAssistant: React.FC<AINotebookAssistantProps> = ({
  isOpen,
  onOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: "Greetings! I'm Rishitha's AI portfolio assistant. Ask me about her ConversaAI microservices engineering, LUCY AI voice interview system, LeaveX, or academic achievements in Data Science.",
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Calculate default docked position: docked beside right bookmark tabs (155px right margin, y = 20px)
  const getDefaultPosition = (): WindowState => {
    if (typeof window === 'undefined') {
      return { x: 100, y: 100, ...DEFAULT_DESKTOP_SIZE };
    }
    const width = DEFAULT_DESKTOP_SIZE.width;
    const height = Math.min(DEFAULT_DESKTOP_SIZE.height, Math.max(480, window.innerHeight - 40));
    // Bookmark tabs on the right take ~155px width
    const rightMargin = 155;
    const defaultX = Math.max(16, window.innerWidth - width - rightMargin);
    const defaultY = Math.max(16, Math.min(24, Math.floor((window.innerHeight - height) / 2)));
    return { x: defaultX, y: defaultY, width, height };
  };

  // Saved window size & position
  const [windowState, setWindowState] = useState<WindowState>(() => {
    const def = getDefaultPosition();
    if (typeof window === 'undefined') return def;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
          // Clamp restored position so it is fully inside viewport
          const clampedX = Math.max(10, Math.min(parsed.x, window.innerWidth - 60));
          const clampedY = Math.max(10, Math.min(parsed.y, window.innerHeight - 60));
          return {
            x: clampedX,
            y: clampedY,
            width: parsed.width || def.width,
            height: parsed.height || def.height,
          };
        }
      }
    } catch {
      // Fallback to default
    }
    return def;
  });

  // Backup of state before maximizing
  const prevSizeRef = useRef<WindowState | null>(null);

  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const chatScrollContainerRef = useRef<HTMLDivElement>(null);

  // Check mobile viewport screen width and clamp window within screen on resize
  useEffect(() => {
    const handleResize = () => {
      const isMob = window.innerWidth < 640;
      setIsMobile(isMob);

      if (!isMob) {
        setWindowState((prev) => {
          const maxX = Math.max(10, window.innerWidth - prev.width - 10);
          const maxY = Math.max(10, window.innerHeight - prev.height - 10);
          const clampedX = Math.max(10, Math.min(prev.x, maxX));
          const clampedY = Math.max(10, Math.min(prev.y, maxY));

          if (clampedX !== prev.x || clampedY !== prev.y) {
            const updated = { ...prev, x: clampedX, y: clampedY };
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch {
              // Storage quota guard
            }
            return updated;
          }
          return prev;
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Save window position and size to localStorage
  const saveState = (newState: Partial<WindowState>) => {
    setWindowState((prev) => {
      const updated = { ...prev, ...newState };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // localStorage quota / security block guard
      }
      return updated;
    });
  };

  // Close / Toggle on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Auto-scroll chat message log
  useEffect(() => {
    if (isOpen && !isMinimized && chatScrollContainerRef.current) {
      const scrollContainer = chatScrollContainerRef.current;
      requestAnimationFrame(() => {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth',
        });
      });
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsgText = input.trim();
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsgText }),
      });

      const data = await res.json();
      const replyMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply || "Rishitha Mondi is an AI/ML Intern & Full-Stack Engineer specializing in conversational AI, microservices, and React/Next.js.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, replyMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: "Rishitha Mondi is an AI/ML Intern at Kreative TimeBox working on ConversaAI, an enterprise multilingual conversational AI platform. She holds a 9.36 CGPA in CSE (Data Science).",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const toggleMaximize = () => {
    if (isMaximized) {
      if (prevSizeRef.current) {
        setWindowState(prevSizeRef.current);
      }
      setIsMaximized(false);
    } else {
      prevSizeRef.current = { ...windowState };
      const maxW = Math.min(580, window.innerWidth - 32);
      const maxH = Math.min(740, window.innerHeight - 32);
      const centerX = Math.max(16, (window.innerWidth - maxW) / 2);
      const centerY = Math.max(16, (window.innerHeight - maxH) / 2);
      setWindowState({ x: centerX, y: centerY, width: maxW, height: maxH });
      setIsMaximized(true);
    }
  };

  const sampleQuestions = [
    "What AI models did Rishitha use in LUCY AI?",
    "Tell me about ConversaAI at Kreative TimeBox.",
    "What databases and web tools is she proficient in?",
    "How can I contact Rishitha for opportunities?",
  ];

  if (typeof document === 'undefined') return null;

  return createPortal(
    <>
      {/* Floating Sunflower Trigger Bubble (Always floating bottom-right, non-blocking) */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[99990] select-none pointer-events-auto">
        <motion.button
          ref={triggerButtonRef}
          onClick={() => {
            if (isOpen && !isMinimized) {
              onClose();
            } else {
              if (isMinimized) setIsMinimized(false);
              onOpen();
            }
          }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-[#FFFBF7] border-[1.5px] border-[#D99B8A] shadow-[0_4px_20px_rgba(217,155,138,0.25)] hover:shadow-[0_8px_28px_rgba(217,155,138,0.4)] transition-shadow duration-300 flex items-center justify-center relative cursor-pointer p-2 sm:p-2.5"
          title={isOpen && !isMinimized ? 'Minimize AI Portfolio Assistant' : 'Open AI Portfolio Assistant'}
          aria-label="Toggle AI Portfolio Assistant Chat"
          aria-expanded={isOpen && !isMinimized}
        >
          {isOpen && !isMinimized ? (
            <Minus className="w-6 h-6 text-[#5D4A3F]" />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <SunflowerLogo
                size={40}
                showStem={true}
                animated={true}
                stemSway={true}
                petalBloom={true}
                className="w-full h-full"
              />
              <span className="absolute -top-1 -right-1 flex items-center justify-center pointer-events-none">
                <span className="w-3.5 h-3.5 rounded-full bg-[#D99B8A] border-2 border-[#FFFBF7] shadow-xs flex items-center justify-center">
                  <Sparkles className="w-2 h-2 text-white" />
                </span>
              </span>
            </div>
          )}
        </motion.button>
      </div>

      {/* Floating Chat Window (Desktop/Tablet) or Non-blocking Bottom Sheet (Mobile) - NO BACKDROP BLUR! */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <>
            {isMobile ? (
              /* MOBILE LAYOUT: Clean Bottom Sheet without background overlay */
              <motion.aside
                initial={{ opacity: 0, y: 100, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.98 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="fixed bottom-0 inset-x-0 h-[72vh] z-[99995] bg-[#FFFDF9] border-t border-x border-[#E7DDD4] shadow-[0_-8px_32px_rgba(46,42,39,0.2)] rounded-t-[24px] flex flex-col justify-between overflow-hidden pointer-events-auto"
              >
                {/* Spiral Binding Header */}
                <div className="shrink-0 bg-[#FFFBF7] pt-1">
                  <SpiralBinding orientation="horizontal" count={10} />
                </div>

                {/* Mobile Drag/Header Bar */}
                <div className="px-4 py-3 bg-[#FFFBF7] border-b border-[#E7DDD4] flex items-center justify-between shrink-0 select-none">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#FFFDF9] border border-[#D99B8A]/60 flex items-center justify-center shadow-2xs">
                      <SunflowerLogo size={22} showStem={false} stemSway={true} />
                    </div>
                    <div>
                      <h3 className="font-serif text-sm font-semibold text-[#2E2A27]">
                        Portfolio Assistant
                      </h3>
                      <p className="font-mono text-[9px] text-[#D99B8A] uppercase tracking-wider">
                        AI ENGINE ONLINE
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setIsMinimized(true)}
                      className="p-1.5 rounded-lg text-[#8A8078] hover:text-[#2E2A27] hover:bg-[#F7F1EA] transition-colors cursor-pointer"
                      title="Minimize"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={onClose}
                      className="p-1.5 rounded-lg text-[#8A8078] hover:text-[#2E2A27] hover:bg-[#F7F1EA] transition-colors cursor-pointer"
                      title="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Mobile Chat Message Scroll Log */}
                <div
                  ref={chatScrollContainerRef}
                  className="p-4 flex-1 overflow-y-auto space-y-3 bg-notebook-ruled bg-[#FFFDF9] relative"
                >
                  <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-[#D88E8E]/25 pointer-events-none" />
                  <div className="pl-3 space-y-3">
                    {messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`p-3 rounded-2xl max-w-[90%] space-y-1 shadow-2xs ${
                            m.sender === 'user'
                              ? 'bg-[#2E2A27] text-[#FFFDF9] rounded-br-xs'
                              : 'bg-[#FFFBF7] text-[#2E2A27] border border-[#E7DDD4] rounded-bl-xs'
                          }`}
                        >
                          {m.sender === 'assistant' && (
                            <div className="flex items-center gap-1 pb-1 mb-1 border-b border-[#E7DDD4]/60 text-[9px] font-label text-[#D99B8A]">
                              <Compass className="w-2.5 h-2.5" />
                              <span>COMPANION ENTRY</span>
                            </div>
                          )}
                          <p className="leading-relaxed text-xs font-sans whitespace-pre-wrap">{m.text}</p>
                          <span
                            className={`text-[9px] block text-right font-mono pt-0.5 ${
                              m.sender === 'user' ? 'text-[#D0C5BD]' : 'text-[#8A8078]'
                            }`}
                          >
                            {m.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex items-center gap-2 text-[#8A8078] text-[11px] font-mono p-2 rounded-2xl bg-[#FFFBF7] border border-[#E7DDD4] w-fit">
                        <RefreshCw className="w-3 h-3 animate-spin text-[#D99B8A]" />
                        <span>Searching portfolio...</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Quick Prompts */}
                <div className="px-3 py-1.5 bg-[#F7F1EA]/90 border-t border-[#E7DDD4] overflow-x-auto no-scrollbar flex items-center gap-1.5 text-[10px] font-label shrink-0">
                  {sampleQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(q)}
                      className="whitespace-nowrap px-2.5 py-0.5 rounded-full bg-[#FFFDF9] border border-[#E7DDD4] text-[#5D4A3F] active:scale-95"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* Mobile Input */}
                <form
                  onSubmit={handleSend}
                  className="p-3 bg-[#FFFBF7] border-t border-[#E7DDD4] flex items-center gap-2 shrink-0"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about Rishitha's skills..."
                    className="flex-1 px-3 py-2 rounded-xl bg-[#FFFDF9] border border-[#E7DDD4] text-xs font-sans text-[#2E2A27] focus:outline-none focus:border-[#D99B8A]"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="px-3 py-2 rounded-xl bg-[#2E2A27] text-white disabled:opacity-40 flex items-center gap-1 text-xs"
                  >
                    <Send className="w-3 h-3 text-[#D99B8A]" />
                  </button>
                </form>
              </motion.aside>
            ) : (
              /* DESKTOP/TABLET LAYOUT: Fully Draggable & Resizable Floating Window using react-rnd */
              <Rnd
                size={{ width: windowState.width, height: windowState.height }}
                position={{ x: windowState.x, y: windowState.y }}
                onDragStart={() => {
                  document.body.classList.add('select-none');
                }}
                onDrag={(e, d) => {
                  setWindowState((prev) => ({ ...prev, x: d.x, y: d.y }));
                }}
                onDragStop={(e, d) => {
                  document.body.classList.remove('select-none');
                  saveState({ x: d.x, y: d.y });
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  saveState({
                    width: parseInt(ref.style.width, 10),
                    height: parseInt(ref.style.height, 10),
                    x: position.x,
                    y: position.y,
                  });
                }}
                minWidth={MIN_SIZE.width}
                minHeight={MIN_SIZE.height}
                maxWidth={MAX_SIZE.width}
                maxHeight={MAX_SIZE.height}
                bounds="window"
                dragHandleClassName="chat-header-drag-handle"
                enableResizing={{
                  top: true,
                  right: true,
                  bottom: true,
                  left: true,
                  topRight: true,
                  bottomRight: true,
                  bottomLeft: true,
                  topLeft: true,
                }}
                className="z-[99995] pointer-events-auto"
                style={{ position: 'fixed' }}
              >
                <motion.aside
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="w-full h-full bg-[#FFFDF9] border border-[#E7DDD4] shadow-[0_16px_48px_rgba(46,42,39,0.22)] rounded-[24px] flex flex-col justify-between overflow-hidden page-curl-corner relative"
                >
                  {/* Spiral Binding Header */}
                  <div className="shrink-0 bg-[#FFFBF7] pt-1">
                    <SpiralBinding orientation="horizontal" count={12} />
                  </div>

                  {/* Header / Drag Bar */}
                  <div className="px-4 py-3 bg-[#FFFBF7] border-b border-[#E7DDD4] flex items-center justify-between select-none shrink-0">
                    {/* Draggable Title Area */}
                    <div className="chat-header-drag-handle flex-1 flex items-center gap-3 cursor-grab active:cursor-grabbing pr-2">
                      <div className="w-9 h-9 rounded-2xl bg-[#FFFDF9] border border-[#D99B8A]/60 flex items-center justify-center shadow-2xs shrink-0 pointer-events-none">
                        <SunflowerLogo size={24} showStem={false} stemSway={true} />
                      </div>
                      <div className="pointer-events-none">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-[#D99B8A] font-semibold">
                            ENGINEERING INSIGHTS
                          </span>
                        </div>
                        <h3 className="font-serif text-base font-semibold text-[#2E2A27] leading-tight flex items-center gap-1.5">
                          Portfolio Assistant
                          <Sparkles className="w-3 h-3 text-[#D99B8A]" />
                        </h3>
                      </div>
                    </div>

                    {/* Window Control Buttons */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => setIsMinimized(true)}
                        className="p-1.5 rounded-lg text-[#8A8078] hover:text-[#2E2A27] hover:bg-[#F7F1EA] transition-all cursor-pointer"
                        title="Minimize Window"
                        aria-label="Minimize Chat Window"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={toggleMaximize}
                        className="p-1.5 rounded-lg text-[#8A8078] hover:text-[#2E2A27] hover:bg-[#F7F1EA] transition-all cursor-pointer"
                        title={isMaximized ? 'Restore Size' : 'Maximize Window'}
                        aria-label="Maximize or Restore Window"
                      >
                        {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-[#8A8078] hover:text-[#2E2A27] hover:bg-[#F7F1EA] transition-all cursor-pointer"
                        title="Close Assistant"
                        aria-label="Close Assistant"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Scrollable Chat Message Area */}
                  <div
                    ref={chatScrollContainerRef}
                    className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-3.5 bg-notebook-ruled bg-[#FFFDF9] relative"
                  >
                    {/* Red Notebook Margin Line */}
                    <div className="absolute left-3.5 top-0 bottom-0 w-[1px] bg-[#D88E8E]/25 pointer-events-none" />

                    <div className="pl-3 space-y-3.5">
                      {messages.map((m) => (
                        <div
                          key={m.id}
                          className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                        >
                          <div
                            className={`p-3.5 rounded-2xl max-w-[90%] space-y-1 shadow-2xs ${
                              m.sender === 'user'
                                ? 'bg-[#2E2A27] text-[#FFFDF9] rounded-br-xs'
                                : 'bg-[#FFFBF7] text-[#2E2A27] border border-[#E7DDD4] rounded-bl-xs'
                            }`}
                          >
                            {m.sender === 'assistant' && (
                              <div className="flex items-center gap-1 pb-1 mb-1 border-b border-[#E7DDD4]/60 text-[9.5px] font-label text-[#D99B8A]">
                                <Compass className="w-2.5 h-2.5" />
                                <span>COMPANION ENTRY</span>
                              </div>
                            )}
                            <p className="leading-relaxed text-xs font-sans whitespace-pre-wrap">{m.text}</p>
                            <span
                              className={`text-[9px] block text-right font-mono pt-0.5 ${
                                m.sender === 'user' ? 'text-[#D0C5BD]' : 'text-[#8A8078]'
                              }`}
                            >
                              {m.timestamp}
                            </span>
                          </div>
                        </div>
                      ))}

                      {loading && (
                        <div className="flex items-center gap-2 text-[#8A8078] text-[11px] font-mono p-2.5 rounded-2xl bg-[#FFFBF7] border border-[#E7DDD4] w-fit shadow-2xs">
                          <RefreshCw className="w-3 h-3 animate-spin text-[#D99B8A]" />
                          <span>Searching portfolio...</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Prompt Suggestions */}
                  <div className="px-3.5 py-2 bg-[#F7F1EA]/90 border-t border-[#E7DDD4] overflow-x-auto no-scrollbar flex items-center gap-1.5 text-[10.5px] font-label shrink-0">
                    <span className="text-[#8A8078] shrink-0 font-mono text-[9px] uppercase">
                      PROMPTS:
                    </span>
                    {sampleQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => setInput(q)}
                        className="whitespace-nowrap px-2.5 py-0.5 rounded-full bg-[#FFFDF9] border border-[#E7DDD4] hover:border-[#D99B8A] hover:text-[#2E2A27] text-[#5D4A3F] transition-all shadow-2xs cursor-pointer active:scale-95"
                      >
                        {q}
                      </button>
                    ))}
                  </div>

                  {/* Notebook Input Bar */}
                  <form
                    onSubmit={handleSend}
                    className="p-3.5 bg-[#FFFBF7] border-t border-[#E7DDD4] flex items-center gap-2 select-none shrink-0"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask a question about Rishitha's projects or skills..."
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#E7DDD4] text-xs font-sans text-[#2E2A27] placeholder-[#8A8078]/70 focus:outline-none focus:border-[#D99B8A] focus:ring-1 focus:ring-[#D99B8A]/30 shadow-2xs"
                    />
                    <button
                      type="submit"
                      disabled={loading || !input.trim()}
                      className="px-3.5 py-2.5 rounded-xl bg-[#2E2A27] text-white hover:bg-[#3D3834] disabled:opacity-40 transition-all active:scale-95 shadow-xs flex items-center gap-1.5 text-xs font-label cursor-pointer"
                    >
                      <Send className="w-3 h-3 text-[#D99B8A]" />
                      <span>Ask</span>
                    </button>
                  </form>
                </motion.aside>
              </Rnd>
            )}
          </>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
};
