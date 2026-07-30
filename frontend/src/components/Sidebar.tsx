"use client";

import React from "react";
import { 
  LayoutDashboard, MessageSquareText, BarChart3, Presentation, 
  Sparkles, Rocket, Compass, Layers, UserCheck 
} from "lucide-react";
import { ActiveView } from "../types";

interface SidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: "landing", label: "Landing & Overview", icon: Compass, badge: "Home" },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, badge: "Main" },
    { id: "chat", label: "AI Business Chat", icon: MessageSquareText, badge: "Agent Flow" },
    { id: "analytics", label: "Market Analytics", icon: BarChart3, badge: "Deep Insights" },
    { id: "pitch-deck", label: "Pitch Deck Studio", icon: Presentation, badge: "Export" },
  ];

  return (
    <aside className="w-64 bg-slate-900/95 backdrop-blur-2xl border-r border-indigo-500/20 flex flex-col justify-between shrink-0 hidden md:flex min-h-screen">
      
      {/* Top Brand Section */}
      <div className="p-5">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Rocket className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <div>
            <span className="font-black text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent block">
              StartupPilot
            </span>
            <span className="text-[10px] font-semibold text-cyan-400 tracking-wide uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" /> Multi-Agent Platform
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="pt-6 space-y-1.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 block mb-2">
            Main Navigation
          </span>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as ActiveView)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white shadow-lg shadow-indigo-600/25 font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-cyan-300" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-800 text-slate-500"
                }`}>
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5">
            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-xs font-black text-indigo-300">
              HR
            </div>
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-white truncate">Himanshu Rana</h4>
            <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Founder Access
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
