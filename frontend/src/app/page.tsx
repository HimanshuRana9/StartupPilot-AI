"use client";

import React, { useState } from "react";
import { 
  Rocket, Sparkles, Bot, ArrowRight, ShieldCheck, 
  TrendingUp, Users, DollarSign, Calendar, Layers, 
  FileCheck, AlertCircle, RefreshCw, CheckCircle2 
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { RealTimeTicker } from "../components/RealTimeTicker";
import { VoiceAssistant } from "../components/VoiceAssistant";
import { ArbitrageCard } from "../components/ArbitrageCard";
import { PitchDeckViewer } from "../components/PitchDeckViewer";
import { UnifiedStartupReport, FounderProfileInput } from "../types";

export default function HomePage() {
  const [ideaPrompt, setIdeaPrompt] = useState("");
  const [founderProfile, setFounderProfile] = useState<FounderProfileInput>({
    name: "Himanshu",
    location: "Noida / Delhi NCR",
    education: "B.Tech CSE",
    technical_skills: ["Python", "React", "AI Agent Prompting"],
    available_budget: 80000,
    available_hours_per_week: 25,
    has_co_founder: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<UnifiedStartupReport | null>(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  const samplePrompts = [
    "Candy Business Sourcing in Noida & Retailing in Delhi",
    "AI Fitness App for College Students with Gamified Workouts",
    "SaaS Placement Preparation Mentor Agent for Engineers",
    "Cloud Kitchen Food Delivery Hub with Regional Supply Arbitrage",
  ];

  const handleRunAnalysis = async (customPrompt?: string) => {
    const promptToSubmit = customPrompt || ideaPrompt;
    if (!promptToSubmit.trim()) {
      alert("Please enter a startup idea or select a sample prompt.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea: promptToSubmit,
          founder: founderProfile,
        }),
      });

      if (!res.ok) throw new Error("Backend server error");

      const data: UnifiedStartupReport = await res.json();
      setReport(data);
    } catch (e) {
      alert("Error connecting to FastAPI backend (http://127.0.0.1:8000). Ensure the backend server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      
      {/* Navbar */}
      <Navbar onTriggerVoiceModal={() => setIsVoiceModalOpen(true)} />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Hero Banner */}
        <div className="relative rounded-3xl p-8 sm:p-12 glass-card-glow overflow-hidden border border-indigo-500/30">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Multi-Agent Autonomous Startup Mentor</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Transform Your Business Idea Into An{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300">
                Execution-Ready Startup
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Unlike generic chatbots, StartupPilot AI deploys 8 specialized agents to analyze live market data, discover human-level regional supply chain & price arbitrage (e.g. Noida vs Delhi), evaluate founder readiness, and build your investor pitch deck.
            </p>

            {/* Prompt Input Box */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={ideaPrompt}
                  onChange={(e) => setIdeaPrompt(e.target.value)}
                  placeholder="e.g. Candy business manufacturing in Noida & selling in Delhi..."
                  className="w-full py-4 pl-4 pr-12 rounded-2xl bg-slate-900/90 border border-indigo-500/40 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-400 shadow-inner"
                  onKeyDown={(e) => e.key === "Enter" && handleRunAnalysis()}
                />
              </div>

              <button
                onClick={() => handleRunAnalysis()}
                disabled={isLoading}
                className="py-4 px-8 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:opacity-95 text-white font-bold text-sm transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 shrink-0 hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Deploying Agents...</span>
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4 text-cyan-300" />
                    <span>Run Multi-Agent Analysis</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </div>

            {/* Sample Prompts */}
            <div className="pt-2 flex flex-wrap gap-2 items-center text-xs">
              <span className="text-slate-400 font-semibold">Try sample idea:</span>
              {samplePrompts.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIdeaPrompt(sample);
                    handleRunAnalysis(sample);
                  }}
                  className="px-3 py-1 rounded-xl bg-slate-800/80 hover:bg-indigo-900/40 border border-slate-700 text-slate-300 hover:text-indigo-200 transition-colors"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-Time Live Ticker */}
        <RealTimeTicker
          news={report ? report.market_research.live_news_highlights : []}
          timestamp={report ? report.live_data_timestamp : undefined}
        />

        {/* Loading Indicator / Agent Step Pipeline */}
        {isLoading && (
          <div className="p-8 rounded-3xl glass-card border border-indigo-500/30 text-center space-y-4 animate-pulse">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-600/30 flex items-center justify-center text-cyan-400">
              <Bot className="w-6 h-6 animate-bounce" />
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Deploying 8 Specialized AI Agents...
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-xs text-slate-300 pt-2">
              <div className="p-2 rounded-xl bg-slate-900 border border-indigo-500/30">1. Idea Validation Agent</div>
              <div className="p-2 rounded-xl bg-slate-900 border border-indigo-500/30">2. Live Market Researcher</div>
              <div className="p-2 rounded-xl bg-slate-900 border border-indigo-500/30">3. Competitor Intelligence</div>
              <div className="p-2 rounded-xl bg-slate-900 border border-indigo-500/30">4. Regional Arbitrage Agent</div>
              <div className="p-2 rounded-xl bg-slate-900 border border-indigo-500/30">5. Founder Feasibility</div>
              <div className="p-2 rounded-xl bg-slate-900 border border-indigo-500/30">6. Cost & Funding Advisor</div>
              <div className="p-2 rounded-xl bg-slate-900 border border-indigo-500/30">7. Roadmap Generator</div>
              <div className="p-2 rounded-xl bg-slate-900 border border-indigo-500/30">8. Pitch Deck Exporter</div>
            </div>
          </div>
        )}

        {/* Generated Report Dashboard */}
        {report && !isLoading && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Top Score Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Overall Score */}
              <div className="p-5 rounded-2xl glass-card border border-indigo-500/30 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>OVERALL READINESS</span>
                  <Rocket className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-3xl font-black text-white mb-1">
                  {report.overall_readiness_score} <span className="text-sm font-normal text-slate-400">/ 10</span>
                </div>
                <p className="text-xs text-emerald-400 font-semibold">
                  High Commercial Viability
                </p>
              </div>

              {/* Idea Score */}
              <div className="p-5 rounded-2xl glass-card border border-purple-500/30 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>INNOVATION SCORE</span>
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-3xl font-black text-white mb-1">
                  {report.idea_validation.innovation_index} <span className="text-sm font-normal text-slate-400">/ 10</span>
                </div>
                <p className="text-xs text-purple-300">
                  {report.idea_validation.feasibility_difficulty} Execution Difficulty
                </p>
              </div>

              {/* Founder Readiness */}
              <div className="p-5 rounded-2xl glass-card border border-cyan-500/30 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>FOUNDER FEASIBILITY</span>
                  <Users className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-black text-white mb-1">
                  {report.founder_feasibility.founder_readiness_score} <span className="text-sm font-normal text-slate-400">/ 10</span>
                </div>
                <p className="text-xs text-cyan-300">
                  Tech Match: {report.founder_feasibility.technical_match_percent}%
                </p>
              </div>

              {/* Capital Needed */}
              <div className="p-5 rounded-2xl glass-card border border-emerald-500/30 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>INITIAL CAPITAL REQ.</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-white mb-1">
                  ₹{report.cost_estimation.total_initial_budget_required.toLocaleString()}
                </div>
                <p className="text-xs text-emerald-400 font-semibold">
                  {report.funding_advisor.bootstrap_feasible ? "Bootstrap Feasible" : "Grant / Seed Funded"}
                </p>
              </div>
            </div>

            {/* Human-Level Regional Supply Chain & Price Arbitrage Card */}
            <ArbitrageCard arbitrage={report.regional_arbitrage} />

            {/* Market Research & Competitor Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Market Research */}
              <div className="p-6 rounded-3xl glass-card border border-indigo-500/20 space-y-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-lg font-extrabold text-white">Live Market Analysis</h3>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/90 text-xs space-y-2">
                  <p className="text-slate-300 leading-relaxed">
                    <b>Market Valuation:</b> {report.market_research.market_size_description}
                  </p>
                  <p className="text-emerald-400 font-semibold">
                    <b>Growth Rate:</b> {report.market_research.cagr_growth_rate}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Emerging Industry Trends:</h4>
                  <div className="flex flex-wrap gap-2">
                    {report.market_research.emerging_trends.map((trend, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-200 text-xs font-medium">
                        {trend}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Competitor Matrix */}
              <div className="p-6 rounded-3xl glass-card border border-purple-500/20 space-y-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-extrabold text-white">Competitor Landscape</h3>
                </div>

                <div className="space-y-3">
                  {report.competitor_analysis.competitors.map((comp, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
                      <div className="flex justify-between font-bold text-white">
                        <span>{comp.name}</span>
                        <span className="text-purple-300 font-normal">{comp.pricing_model}</span>
                      </div>
                      <p className="text-rose-400 text-[11px]">
                        <b>Vulnerability:</b> {comp.vulnerabilities.join(", ")}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200">
                  <b>Unaddressed Market Gap:</b> {report.competitor_analysis.market_gap}
                </div>
              </div>
            </div>

            {/* Implementation Roadmap */}
            <div className="p-6 rounded-3xl glass-card border border-indigo-500/20 space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-extrabold text-white">Execution Roadmap</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {report.roadmap.milestones.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/30 space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-[10px]">
                      MONTH {m.month}
                    </span>
                    <h4 className="font-bold text-sm text-white">{m.phase_name}</h4>
                    <p className="text-xs text-slate-400">{m.expected_output}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Investor Pitch Deck & Export Center */}
            <PitchDeckViewer report={report} />

          </div>
        )}

      </main>

      {/* Voice Assistant Modal */}
      <VoiceAssistant
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onRunAnalysis={(prompt) => {
          setIdeaPrompt(prompt);
          handleRunAnalysis(prompt);
        }}
      />

    </div>
  );
}
