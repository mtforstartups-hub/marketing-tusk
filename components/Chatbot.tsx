"use client";
import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";

// ---------- Quick suggestion chips ----------
const QUICK_QUESTIONS = [
  "What services do you offer?",
  "How long does a website take?",
  "How can I contact you?",
];

// ---------- Typing animation ----------
function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-white border border-primary-blue-light rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-primary-blue inline-block animate-bounce"
            style={{
              animationDelay: `${i * 0.15}s`,
              animationDuration: "0.9s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ---------- Main component ----------
export default function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  const [popoverDismissed, setPopoverDismissed] = useState(false);
  const { messages, sendMessage, status } = useChat();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const isReplying = status === "submitted" || status === "streaming";
  const hasMessages = messages.length > 0;

  // Show popover after 3s, auto-hide after 8s
  useEffect(() => {
    if (popoverDismissed || isChatOpen) return;
    const show = setTimeout(() => setShowPopover(true), 3000);
    const hide = setTimeout(() => setShowPopover(false), 11000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [popoverDismissed, isChatOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen, isReplying]);

  const handleOpen = () => {
    setIsChatOpen(true);
    setShowPopover(false);
    setPopoverDismissed(true);
  };

  const handleQuickQuestion = (q: string) => {
    sendMessage({ text: q });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isReplying) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <>
      {/* --- Popover bubble --- */}
      <div
        className={`fixed right-16 bottom-8 md:bottom-[138px] z-50 transition-all duration-500 ease-out ${
          showPopover && !isChatOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <div className="relative bg-white border border-primary-blue-light rounded-2xl rounded-br-sm shadow-xl px-4 py-3 max-w-[210px]">
          {/* Dismiss button */}
          <button
            onClick={() => {
              setShowPopover(false);
              setPopoverDismissed(true);
            }}
            className="absolute -top-2 -right-2 bg-white border border-gray-200 rounded-full p-0.5 text-gray-400 hover:text-gray-600 shadow-sm transition-colors"
          >
            <X size={12} />
          </button>

          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles size={13} className="text-primary-blue" />
            <span className="text-[11px] font-semibold text-primary-blue uppercase tracking-wide">
              AI Assistant
            </span>
          </div>
          <p className="text-[13px] text-custom-gray leading-snug">
            Got questions about our services? Ask me anything! 👋
          </p>

          {/* Tail pointing right toward the FAB */}
          <div className="absolute -right-2 bottom-3 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-white" />
          <div className="absolute -right-[9px] bottom-[11px] w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[9px] border-l-primary-blue-light" />
        </div>
      </div>

      {/* --- Floating Action Button --- */}
      <button
        onClick={handleOpen}
        className={`${
          isChatOpen
            ? "hidden"
            : "fixed right-4 bottom-6 md:bottom-32 z-50 p-3.5 border border-primary-blue rounded-full text-primary-blue bg-white shadow-lg hover:bg-primary-blue hover:text-white transition-all duration-300 flex items-center justify-center group"
        }`}
        aria-label="Open chat"
      >
        {/* Pulse ring */}
        <span className="absolute inline-flex w-14 h-14 rounded-full bg-primary-blue opacity-20 animate-ping" />
        <Bot
          width={28}
          height={28}
          className="group-hover:scale-110 transition-transform relative"
        />
      </button>

      {/* --- Chat Window --- */}
      <div
        className={`bg-white z-[60] w-11/12 h-[75vh] max-w-[400px] max-h-[650px] fixed bottom-8 md:bottom-36 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-10 origin-bottom-right transition-all duration-300 ease-out shadow-2xl rounded-2xl flex flex-col overflow-hidden border border-primary-blue-light ${
          isChatOpen
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-primary-blue p-4 flex justify-between items-center text-white shadow-md z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-full text-primary-blue">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-[15px] leading-tight">
                Chat Support
              </h3>
              <p className="text-xs text-white/80">
                {isReplying ? "Typing…" : "Typically replies in minutes"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsChatOpen(false)}
            className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4">
          {/* Welcome state with quick questions */}
          {!hasMessages && (
            <div className="flex flex-col items-center gap-4 mt-4">
              <div className="bg-primary-blue/10 p-3 rounded-full">
                <Sparkles size={22} className="text-primary-blue" />
              </div>
              <p className="text-[13px] text-gray-500 text-center leading-snug px-2">
                Hi there! 👋 Ask me anything about Marketing Tusk, or pick a
                question below.
              </p>
              <div className="flex flex-col gap-2 w-full">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleQuickQuestion(q)}
                    className="text-left text-[13px] text-primary-blue border border-primary-blue-light bg-white rounded-xl px-4 py-2.5 hover:bg-primary-blue hover:text-white transition-all duration-200 shadow-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] shadow-sm ${
                  message.role === "user"
                    ? "bg-primary-blue text-white rounded-br-sm leading-relaxed"
                    : "bg-white border border-primary-blue-light text-custom-gray rounded-bl-sm"
                }`}
              >
                {message.parts.map((part, i) => {
                  if (part.type !== "text") return null;
                  return message.role === "assistant" ? (
                    <ReactMarkdown
                      key={`${message.id}-${i}`}
                      components={{
                        p: ({ children }) => (
                          <p className="leading-relaxed mb-1">{children}</p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside space-y-1 my-1">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside space-y-1 my-1">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="leading-snug">{children}</li>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold">{children}</strong>
                        ),
                        code: ({ children }) => (
                          <code className="bg-gray-100 text-sm px-1 rounded font-mono">
                            {children}
                          </code>
                        ),
                      }}
                    >
                      {part.text}
                    </ReactMarkdown>
                  ) : (
                    <div key={`${message.id}-${i}`}>{part.text}</div>
                  );
                })}
              </div>
            </div>
          ))}

          {isReplying && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSubmit}
          className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2.5 text-[15px] bg-gray-50 border border-primary-blue-light rounded-full focus:outline-none focus:ring-2 focus:ring-primary-blue focus:bg-white text-custom-gray transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isReplying}
            className="bg-primary-blue text-white p-2.5 rounded-full hover:bg-primary-blue-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm flex items-center justify-center"
          >
            <Send size={18} className="ml-0.5" />
          </button>
        </form>
      </div>
    </>
  );
}
