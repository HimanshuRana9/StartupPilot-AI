"use client";

import React, { useState } from "react";
import { 
  Rocket, Volume2, Sparkles, Search, Bell, Bot, 
  Compass, LayoutDashboard, MessageSquareText, BarChart3, Presentation 
} from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { LandingSection } from "../components/LandingSection";
import { DashboardView } from "../components/DashboardView";
import { ChatAssistantView } from "../components/ChatAssistantView";
import { AnalyticsView } from "../components/AnalyticsView";
import { PitchDeckStudioView } from "../components/PitchDeckStudioView";
import { VoiceAssistant } from "../components/VoiceAssistant";
import { ActiveView, UnifiedStartupReport, FounderProfileInput } from "../types";

export default function HomePage() {
  const [activeView, setActiveView] = useState<ActiveView>("landing");
  const [report, setReport] = useState<UnifiedStartupReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [founderProfile] = useState<FounderProfileInput>({
    name: "Himanshu",
    location: "Noida / Delhi NCR",
    education: "B.Tech CSE",
    technical_skills: ["Python", "React", "AI Agent Prompting"],
    available_budget: 80000,
    available_hours_per_week: 25,
    has_co_founder: false,
  });

  const handleRunAnalysis = async (promptText: string) => {
    if (!promptText.trim()) return;

    setIsLoading(true);
    // Switch to Chat or Analytics view when analysis runs
    setActiveView("chat");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea: promptText,
          founder: founderProfile,
        }),
      });

      if (!res.ok) throw new Error("Backend server error");

      const data: UnifiedStartupReport = await res.json();
      setReport(data);
    } catch (e) {
      alert("Error connecting to FastAPI backend (http://127.0.0.1:8000). Please ensure backend server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      
      {/* Left Navigation Sidebar */}
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/80 border-b border-indigo-500/20 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          
          {/* Mobile Brand / Current Tab Title */}
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-sm sm:text-base text-white capitalize flex items-center gap-2">
              {activeView === "landing" && <Compass className="w-4 h-4 text-indigo-400" />}
              {activeView === "dashboard" && <LayoutDashboard className="w-4 h-4 text-purple-400" />}
              {activeView === "chat" && <MessageSquareText className="w-4 h-4 text-cyan-400" />}
              {activeView === "analytics" && <BarChart3 className="w-4 h-4 text-emerald-400" />}
              {activeView === "pitch-deck" && <Presentation className="w-4 h-4 text-rose-400" />}
              {activeView.replace("-", " ")}
            </span>
          </div>

          {/* Search Input & Actions */}
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, reports..."
                className="w-full py-2 pl-9 pr-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
              />
            </div>

            {/* Voice Assistant Shortcut */}
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 text-white font-semibold text-xs transition-all shadow-md"
            >
              <Volume2 className="w-4 h-4 text-cyan-300" />
              <span className="hidden sm:inline">Voice Assistant</span>
            </button>

            {/* Notification Badge */}
            <button className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-1.5 right-1.5 animate-ping" />
            </button>
          </div>
        </header>

        {/* View Container */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {activeView === "landing" && (
            <LandingSection onStartAnalysis={handleRunAnalysis} />
          )}

          {activeView === "dashboard" && (
            <DashboardView
              report={report}
              onNavigateToChat={() => setActiveView("chat")}
              onNavigateToAnalytics={() => setActiveView("analytics")}
              onNavigateToPitchDeck={() => setActiveView("pitch-deck")}
            />
          )}

          {activeView === "chat" && (
            <ChatAssistantView
              report={report}
              isLoading={isLoading}
              onSendPrompt={handleRunAnalysis}
              onTriggerVoiceModal={() => setIsVoiceModalOpen(true)}
              onNavigateToPitchDeck={() => setActiveView("pitch-deck")}
            />
          )}

          {activeView === "analytics" && (
            <AnalyticsView report={report} />
          )}

          {activeView === "pitch-deck" && (
            <PitchDeckStudioView report={report} />
          )}
        </main>
      </div>

      {/* Voice Assistant Modal */}
      <VoiceAssistant
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onRunAnalysis={handleRunAnalysis}
      />

    </div>
  );
}
