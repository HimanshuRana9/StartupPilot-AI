"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, X, Sparkles, Bot, CheckCircle2, Send, RefreshCw, ArrowRight } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  action_type?: string;
  data?: any;
}

interface VoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onRunAnalysis: (prompt: string) => void;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  isOpen,
  onClose,
  onRunAnalysis,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m0",
      sender: "assistant",
      text: "Hello Himanshu! I am your conversational StartupPilot AI mentor. Ask me anything about business feasibility, location comparison, or financial projections!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([
    "Should I manufacture in Noida or Delhi for my candy business?",
    "Analyze my startup idea",
    "What is the break-even volume for my batch?"
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const reco = new SpeechRecognition();
        reco.continuous = false;
        reco.interimResults = true;
        reco.lang = "en-US";

        reco.onresult = (event: any) => {
          const current = event.resultIndex;
          const text = event.results[current][0].transcript;
          setTranscript(text);
          if (event.results[current].isFinal) {
            handleSendQuery(text);
          }
        };

        reco.onerror = (event: any) => {
          console.warn("Speech error:", event.error);
          setIsListening(false);
        };

        reco.onend = () => {
          setIsListening(false);
        };

        setRecognition(reco);
      }
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (!recognition) {
      alert("Speech recognition is not supported in this browser. Please try Chrome or Edge.");
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      try {
        setTranscript("");
        recognition.start();
        setIsListening(true);
      } catch (err) {
        console.error("Mic start error:", err);
        setIsListening(false);
      }
    }
  };

  const handleSendQuery = async (queryOverride?: string) => {
    const textToSend = queryOverride || transcript;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setTranscript("");
    setIsThinking(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          command: textToSend,
          history: messages.map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });
      const data = await res.json();

      const replyText = data.spoken_reply || "I've analyzed your question.";
      const assistantMsg: Message = {
        id: `a_${Date.now()}`,
        sender: "assistant",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action_type: data.action_type,
        data: data.data_summary,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      speakText(replyText);

      if (data.follow_up_suggestions && data.follow_up_suggestions.length > 0) {
        setSuggestions(data.follow_up_suggestions);
      }

      if (data.action_type === "STARTUP_ANALYSIS") {
        onRunAnalysis(textToSend);
      }
    } catch (e) {
      const fallbackReply = `Analyzing business prompt: "${textToSend}"...`;
      setMessages((prev) => [
        ...prev,
        {
          id: `a_${Date.now()}`,
          sender: "assistant",
          text: fallbackReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      speakText(fallbackReply);
      onRunAnalysis(textToSend);
    } finally {
      setIsThinking(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl p-6 glass-card-glow rounded-3xl overflow-hidden border border-indigo-500/40 flex flex-col h-[580px] max-h-[90vh] shadow-2xl">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-600/30 text-cyan-300 border border-indigo-500/30">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                Gemini Conversational AI Mentor
                <Sparkles className="w-4 h-4 text-amber-300" />
              </h3>
              <p className="text-xs text-slate-400">
                {isListening ? "🎙 Listening... Speak naturally" : isSpeaking ? "🔊 Speaking..." : "Ask anything in natural speech"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conversation Thread History (Notion AI / Gemini Style) */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.sender === "user"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none shadow-md"
                    : "bg-slate-900/90 border border-indigo-500/30 text-slate-200 rounded-bl-none shadow-lg"
                }`}
              >
                <div className="flex items-center justify-between mb-1 gap-2 text-[10px] opacity-70">
                  <span className="font-bold uppercase">{m.sender === "user" ? "You" : "StartupPilot AI"}</span>
                  <span>{m.timestamp}</span>
                </div>
                <p>{m.text}</p>

                {/* Additional Data Cards */}
                {m.action_type === "LOCATION_ARBITRAGE" && m.data && (
                  <div className="mt-2 p-2.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-[11px] space-y-1">
                    <span className="text-cyan-300 font-bold block">
                      Arbitrage Result: {m.data.source_city} vs {m.data.target_city}
                    </span>
                    <span className="text-emerald-400 font-bold block">
                      Save ₹{m.data.savings_per_unit}/unit ({m.data.estimated_profit_margin_boost} margin boost)
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex justify-start">
              <div className="p-3 rounded-2xl bg-slate-900 border border-indigo-500/30 text-xs text-indigo-300 flex items-center gap-2 animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                <span>Thinking & reasoning with StartupPilot intelligence tools...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Dynamic AI Follow-up Suggestion Chips */}
        <div className="py-2 shrink-0 border-t border-slate-800/80">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Suggested Follow-up Questions:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSendQuery(s)}
                className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-indigo-900/40 border border-slate-800 text-[11px] text-indigo-300 hover:text-white transition-colors flex items-center gap-1"
              >
                <span>"{s}"</span>
                <ArrowRight className="w-3 h-3 text-cyan-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Soundwave Mic & Input Control Bar */}
        <div className="pt-3 border-t border-slate-800 flex items-center gap-2 shrink-0">
          
          {/* Animated Soundwave Visualizer Bar */}
          <div className="flex items-center gap-1 px-2">
            <span className={`w-1 rounded-full bg-cyan-400 transition-all ${isListening || isSpeaking ? "animate-voice-bar-1 h-6" : "h-3"}`} />
            <span className={`w-1 rounded-full bg-indigo-400 transition-all ${isListening || isSpeaking ? "animate-voice-bar-2 h-8" : "h-4"}`} />
            <span className={`w-1 rounded-full bg-purple-400 transition-all ${isListening || isSpeaking ? "animate-voice-bar-3 h-5" : "h-2"}`} />
          </div>

          <button
            onClick={toggleListening}
            className={`p-3 rounded-2xl transition-all ${
              isListening
                ? "bg-rose-500 text-white shadow-lg shadow-rose-500/50 scale-105 animate-pulse"
                : "bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white hover:scale-105"
            }`}
            title={isListening ? "Stop Listening" : "Start Voice Input"}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder={isListening ? "Listening... Speak now" : "Type or speak your startup query..."}
            className="flex-1 py-2.5 px-4 rounded-2xl bg-slate-950 border border-indigo-500/30 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-400"
            onKeyDown={(e) => e.key === "Enter" && handleSendQuery()}
          />

          <button
            onClick={() => handleSendQuery()}
            disabled={!transcript.trim() || isThinking}
            className="p-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 disabled:opacity-40 transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
