"use client";

import React, { useState, useEffect } from "react";
import { Mic, MicOff, Volume2, X, Sparkles, Bot, CheckCircle2, AlertCircle } from "lucide-react";

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
  const [transcript, setTranscript] = useState("");
  const [assistantReply, setAssistantReply] = useState(
    "Hello! I am your AI Startup Mentor. Click the microphone to speak, or select a quick voice command below!"
  );
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [micSupported, setMicSupported] = useState(true);

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
        };

        reco.onerror = (event: any) => {
          console.warn("Speech error:", event.error);
          setIsListening(false);
          if (event.error === "not-allowed") {
            setAssistantReply("Microphone access blocked. Please enable mic permissions in your browser URL bar.");
          } else if (event.error === "no-speech") {
            setAssistantReply("No speech detected. Please click the mic button and try speaking again.");
          }
        };

        reco.onend = () => {
          setIsListening(false);
        };

        setRecognition(reco);
      } else {
        setMicSupported(false);
      }
    }
  }, []);

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (!recognition) {
      setAssistantReply("Speech recognition is not supported in this browser. You can type or select a command below.");
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      try {
        setTranscript("");
        setAssistantReply("Listening... Speak your startup idea now!");
        recognition.start();
        setIsListening(true);
      } catch (err) {
        console.error("Mic start error:", err);
        setIsListening(false);
      }
    }
  };

  const handleSendVoiceCommand = async (commandOverride?: string) => {
    const textToSend = commandOverride || transcript;
    if (!textToSend.trim()) return;

    setAssistantReply(`Executing voice command: "${textToSend}"...`);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/voice-command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: textToSend }),
      });
      const data = await res.json();

      setAssistantReply(data.spoken_reply);
      speakText(data.spoken_reply);

      if (data.action_type === "ANALYZE") {
        onRunAnalysis(textToSend);
        setTimeout(() => onClose(), 2000);
      }
    } catch (e) {
      const fallbackMsg = `Analyzing startup idea: ${textToSend}`;
      setAssistantReply(fallbackMsg);
      speakText(fallbackMsg);
      onRunAnalysis(textToSend);
      setTimeout(() => onClose(), 2000);
    }
  };

  const quickCommands = [
    "I want to open a Cafe in Delhi",
    "Candy manufacturing in Noida & retailing in Delhi",
    "AI Fitness App for College Students",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg p-6 glass-card-glow rounded-3xl overflow-hidden border border-indigo-500/40">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-600/30 text-cyan-300 border border-indigo-500/30">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                Voice Assistant Agent
                <Sparkles className="w-4 h-4 text-amber-300" />
              </h3>
              <p className="text-xs text-slate-400">Interactive Voice & Spoken Feedback Controls</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visualizer Soundwave */}
        <div className="py-6 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-1.5 h-12 mb-4">
            <span className={`w-1.5 rounded-full bg-cyan-400 ${isListening || isSpeaking ? "animate-voice-bar-1" : "h-3"}`} />
            <span className={`w-1.5 rounded-full bg-indigo-400 ${isListening || isSpeaking ? "animate-voice-bar-2" : "h-5"}`} />
            <span className={`w-1.5 rounded-full bg-purple-400 ${isListening || isSpeaking ? "animate-voice-bar-3" : "h-8"}`} />
            <span className={`w-1.5 rounded-full bg-cyan-400 ${isListening || isSpeaking ? "animate-voice-bar-4" : "h-4"}`} />
            <span className={`w-1.5 rounded-full bg-indigo-400 ${isListening || isSpeaking ? "animate-voice-bar-5" : "h-2"}`} />
          </div>

          <button
            onClick={toggleListening}
            className={`relative p-6 rounded-full transition-all duration-300 ${
              isListening
                ? "bg-rose-500 text-white shadow-xl shadow-rose-500/50 scale-110"
                : "bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-xl shadow-indigo-600/40 hover:scale-105"
            }`}
          >
            {isListening ? (
              <MicOff className="w-8 h-8 animate-bounce" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </button>
          <p className="mt-3 text-xs text-slate-400 font-medium">
            {isListening ? "Listening... Speak now" : "Click mic to speak voice command"}
          </p>
        </div>

        {/* Quick Voice Command Chips */}
        <div className="mb-4 space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Quick Voice Commands:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickCommands.map((cmd, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTranscript(cmd);
                  handleSendVoiceCommand(cmd);
                }}
                className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-indigo-900/40 border border-slate-800 text-[11px] text-indigo-300 transition-colors"
              >
                "{cmd}"
              </button>
            ))}
          </div>
        </div>

        {/* Editable Transcript Input Box */}
        <div className="mb-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
          <span className="text-slate-500 font-semibold block">VOICE TRANSCRIPT / PROMPT:</span>
          <input
            type="text"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Spoken text appears here, or type your prompt..."
            className="w-full bg-transparent text-slate-100 focus:outline-none"
          />
        </div>

        {/* Voice Assistant Speech Reply Box */}
        <div className="mb-6 p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs flex items-start gap-2">
          <Volume2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-indigo-200">{assistantReply}</p>
        </div>

        {/* Action Submit Button */}
        <div className="flex gap-3">
          <button
            onClick={() => handleSendVoiceCommand()}
            disabled={!transcript.trim()}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            Submit Voice Command
          </button>
        </div>

      </div>
    </div>
  );
};
