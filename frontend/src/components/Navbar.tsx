"use client";

import React from "react";
import { Rocket, Bot, Volume2, Sparkles, ShieldCheck } from "lucide-react";

interface NavbarProps {
  onTriggerVoiceModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onTriggerVoiceModal }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-indigo-500/20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Rocket className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                StartupPilot AI
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 rounded-full">
                Multi-Agent v1.0
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Autonomous Startup Mentor & Regional Arbitrage Platform
            </p>
          </div>
        </div>

        {/* Live Status & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>8 AI Agents Active</span>
          </div>

          <button
            onClick={onTriggerVoiceModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-xs sm:text-sm transition-all shadow-md shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Volume2 className="w-4 h-4 text-cyan-300" />
            <span>Voice Assistant</span>
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 ml-0.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
