"use client";

import React, { useState } from "react";
import { 
  Rocket, Sparkles, Bot, ArrowRight, ShieldCheck, 
  Search, Wand2, BarChart2, MessageSquare, CheckCircle2, 
  Layers, MapPin, TrendingUp, Cpu
} from "lucide-react";

interface LandingSectionProps {
  onStartAnalysis: (prompt: string) => void;
}

export const LandingSection: React.FC<LandingSectionProps> = ({ onStartAnalysis }) => {
  const [prompt, setPrompt] = useState("");

  const sampleIdeas = [
    "Cafe & Specialty Coffee Hub in Delhi NCR",
    "Candy Business Sourcing in Noida & Retailing in Delhi",
    "AI SaaS Placement Preparation Mentor for Engineers",
    "Cloud Kitchen Food Delivery with Regional Supply Arbitrage",
  ];

  const agentNodes = [
    { title: "Idea Validation", desc: "Analyzes feasibility & innovation score", icon: ShieldCheck, color: "from-indigo-500 to-blue-500" },
    { title: "Market Research", desc: "Fetches live news & industry CAGR", icon: TrendingUp, color: "from-cyan-500 to-teal-500" },
    { title: "Competitor Intelligence", desc: "Maps battlecards & vulnerabilities", icon: Layers, color: "from-purple-500 to-indigo-500" },
    { title: "Regional Price Arbitrage", desc: "Compares Noida vs Delhi overhead", icon: MapPin, color: "from-emerald-500 to-green-500" },
    { title: "Budget & Unit Economics", desc: "Estimates burn rate & contribution margins", icon: Cpu, color: "from-amber-500 to-orange-500" },
    { title: "Investor Pitch Deck", desc: "Generates .PPTX slides & PDF reports", icon: Wand2, color: "from-rose-500 to-purple-500" },
  ];

  return (
    <div className="space-y-12 pb-12">
      
      {/* Hero Header Section (Notion AI Style) */}
      <div className="relative rounded-3xl p-8 sm:p-14 glass-card-glow border border-indigo-500/30 overflow-hidden text-center sm:text-left">
        <div className="max-w-4xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Meet the Next-Gen StartupPilot AI</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Build Your Startup With{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300">
              Autonomous AI Agents
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            One platform that does it all. Search live market trends, discover human-level regional cost arbitrage, evaluate founder readiness, and compile investor pitch decks—right inside your workspace.
          </p>

          {/* Hero Prompt Box */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-2xl">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your startup idea (e.g. Cafe in Delhi, Candy business in Noida)..."
              className="flex-1 py-4 px-5 rounded-2xl bg-slate-900/90 border border-indigo-500/40 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-400 shadow-inner"
              onKeyDown={(e) => e.key === "Enter" && prompt.trim() && onStartAnalysis(prompt)}
            />
            <button
              onClick={() => prompt.trim() && onStartAnalysis(prompt)}
              className="py-4 px-8 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:opacity-95 text-white font-bold text-sm transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 shrink-0 hover:scale-[1.02]"
            >
              <Rocket className="w-4 h-4 text-cyan-300" />
              <span>Generate Business Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Sample Prompts Ticker */}
          <div className="flex flex-wrap gap-2 items-center text-xs pt-1">
            <span className="text-slate-400 font-semibold">Try sample concept:</span>
            {sampleIdeas.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPrompt(sample);
                  onStartAnalysis(sample);
                }}
                className="px-3 py-1 rounded-xl bg-slate-800/80 hover:bg-indigo-900/40 border border-slate-700 text-slate-300 hover:text-indigo-200 transition-colors"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Pillar Cards (Notion AI 4-Grid Style: Search, Generate, Analyze, Chat) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl glass-card border border-indigo-500/20 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">Live Search</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Scrapes up-to-the-second news, industry trends, and macro-economic data points.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-card border border-purple-500/20 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Wand2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">Generate Decks</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Auto-compiles 8-slide PowerPoint presentation decks (.pptx) & executive PDF reports.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-card border border-cyan-500/20 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <BarChart2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">Regional Arbitrage</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Discovers location price arbitrage (e.g. Sourcing in Noida vs Retailing in Delhi to boost profit margins).
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-card border border-emerald-500/20 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">Voice Assistant</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Native Web Speech API for hands-free spoken queries and audio speech synthesis.
          </p>
        </div>
      </div>

      {/* Visual AI Agent Workflow Node Graph (Image 4 Style) */}
      <div className="p-8 rounded-3xl glass-card border border-indigo-500/20 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block">
              Multi-Agent Architecture
            </span>
            <h2 className="text-xl font-extrabold text-white">End-to-End AI Agent Pipeline</h2>
          </div>
          <span className="text-xs text-slate-400">8 Autonomous Nodes Cooperating Sequentially</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agentNodes.map((node, idx) => {
            const Icon = node.icon;
            return (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3.5 hover:border-indigo-500/40 transition-all">
                <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${node.color} text-white shrink-0 shadow-md`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{node.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{node.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
