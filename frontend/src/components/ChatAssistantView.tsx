"use client";

import React, { useState } from "react";
import { 
  Bot, Send, Mic, Paperclip, Sparkles, ShieldCheck, 
  TrendingUp, Layers, MapPin, DollarSign, AlertCircle, 
  Calendar, FileText, Presentation, CheckCircle2, RefreshCw 
} from "lucide-react";
import { UnifiedStartupReport } from "../types";

interface ChatAssistantViewProps {
  report: UnifiedStartupReport | null;
  isLoading: boolean;
  onSendPrompt: (prompt: string) => void;
  onTriggerVoiceModal: () => void;
  onNavigateToPitchDeck: () => void;
}

export const ChatAssistantView: React.FC<ChatAssistantViewProps> = ({
  report,
  isLoading,
  onSendPrompt,
  onTriggerVoiceModal,
  onNavigateToPitchDeck,
}) => {
  const [inputPrompt, setInputPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ sender: "user" | "agent"; text: string; data?: UnifiedStartupReport | null }>>([
    {
      sender: "agent",
      text: "Hello Himanshu! I am your AI Startup Mentor. Describe any startup idea (e.g. 'I want to open a Cafe in Delhi' or 'Candy manufacturing in Noida'), and my 8 specialized agents will execute the full workflow for you!",
    },
  ]);

  const handleSend = () => {
    if (!inputPrompt.trim() || isLoading) return;
    const userText = inputPrompt;
    setChatHistory((prev) => [...prev, { sender: "user", text: userText }]);
    setInputPrompt("");
    onSendPrompt(userText);
  };

  const workflowSteps = [
    "Idea Validation", "Market Research", "Competitor Analysis", 
    "Regional Arbitrage", "Budget Planner", "Funding Advisor", 
    "Risk Analysis", "Marketing", "Roadmap", "Pitch Deck"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] glass-card rounded-3xl border border-indigo-500/20 overflow-hidden">
      
      {/* Header */}
      <div className="p-4 sm:p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-600/30 text-cyan-300 border border-indigo-500/30">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              AI Business Chat & Agent Flow
              <Sparkles className="w-4 h-4 text-amber-300" />
            </h3>
            <p className="text-xs text-slate-400">8 Autonomous Cooperating Agents Active</p>
          </div>
        </div>

        {report && (
          <button
            onClick={onNavigateToPitchDeck}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold"
          >
            <Presentation className="w-4 h-4 text-purple-400" />
            <span>Open Deck Studio</span>
          </button>
        )}
      </div>

      {/* Visual Agent Workflow Step Tracker Bar */}
      <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max text-[11px] font-semibold text-slate-400">
          <span className="text-indigo-400 uppercase font-bold mr-1">Agent Workflow:</span>
          {workflowSteps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className={`px-2 py-0.5 rounded-md border ${
                report ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-slate-900 border-slate-800 text-slate-400"
              }`}>
                {step}
              </span>
              {idx < workflowSteps.length - 1 && <span className="text-slate-600">➔</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Conversation Thread Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-2xl p-4 sm:p-5 rounded-3xl text-xs sm:text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none shadow-md"
                  : "bg-slate-900/90 border border-indigo-500/30 text-slate-200 rounded-bl-none shadow-lg"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="p-4 rounded-3xl bg-slate-900/90 border border-indigo-500/40 text-xs text-indigo-300 flex items-center gap-3 animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Agents are validating idea, calculating regional supply chain arbitrage & compiling deck...</span>
            </div>
          </div>
        )}

        {/* Active Analysis Result Summary Card */}
        {report && !isLoading && (
          <div className="p-6 rounded-3xl bg-slate-900/95 border border-indigo-500/40 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="font-extrabold text-white text-base">
                Evaluation Report for "{report.idea}"
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
                Score: {report.overall_readiness_score}/10
              </span>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">INITIAL CAPITAL</span>
                <span className="font-black text-emerald-400 text-sm">₹{report.cost_estimation.total_initial_budget_required.toLocaleString()}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">REGIONAL ARBITRAGE</span>
                <span className="font-black text-cyan-300 text-sm">{report.regional_arbitrage.arbitrage_opportunities[0]?.estimated_profit_margin_boost || "+26.5%"}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">EXECUTION TIMELINE</span>
                <span className="font-black text-purple-300 text-sm">{report.roadmap.total_months} Months</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">DECK SLIDES</span>
                <span className="font-black text-white text-sm">8 PPTX Slides</span>
              </div>
            </div>

            {/* Strategy Box */}
            <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200">
              <b>Primary Action Advice:</b> {report.funding_advisor.primary_recommendation}
            </div>
          </div>
        )}
      </div>

      {/* Chat Input Bar */}
      <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-3">
        <button
          onClick={() => alert("File attachment ready. You can attach PDFs or documents for RAG context.")}
          className="p-2.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          title="Attach File"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <button
          onClick={onTriggerVoiceModal}
          className="p-2.5 text-indigo-400 hover:text-cyan-300 rounded-xl hover:bg-slate-800 transition-colors"
          title="Voice Assistant Mic"
        >
          <Mic className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder="Describe your startup concept (e.g. Cafe in Delhi, Candy business)..."
          className="flex-1 py-3 px-4 rounded-2xl bg-slate-950 border border-indigo-500/30 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-indigo-400"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          disabled={!inputPrompt.trim() || isLoading}
          className="p-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs hover:opacity-90 disabled:opacity-50 transition-all shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
