"use client";

import React, { useState } from "react";
import { 
  Rocket, Sparkles, Plus, CheckCircle2, Clock, 
  TrendingUp, FileText, Presentation, Activity, AlertCircle, ArrowUpRight 
} from "lucide-react";
import { UnifiedStartupReport, ProjectItem, TaskItem } from "../types";

interface DashboardViewProps {
  report: UnifiedStartupReport | null;
  onNavigateToChat: () => void;
  onNavigateToAnalytics: () => void;
  onNavigateToPitchDeck: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  report,
  onNavigateToChat,
  onNavigateToAnalytics,
  onNavigateToPitchDeck,
}) => {
  const [projects] = useState<ProjectItem[]>([
    {
      id: "p1",
      title: report ? report.idea : "Cafe & Specialty Coffee Hub",
      industry: report ? report.idea_validation.target_audience : "Food & Beverage",
      score: report ? report.overall_readiness_score * 10 : 89,
      location: "Delhi NCR",
      status: "Completed",
      updatedAt: "Just now",
    },
    {
      id: "p2",
      title: "Candy Sourcing in Noida & Delhi Retailing",
      industry: "Consumer Goods / Manufacturing",
      score: 86,
      location: "Noida / Delhi",
      status: "Completed",
      updatedAt: "2 hours ago",
    },
    {
      id: "p3",
      title: "AI Fitness App for College Students",
      industry: "Health Tech / SaaS",
      score: 91,
      location: "Bengaluru / Remote",
      status: "In Progress",
      updatedAt: "Yesterday",
    },
  ]);

  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: "t1", title: "Review Noida regional warehouse lease rates", dueDate: "Today", completed: true, category: "Validation" },
    { id: "t2", title: "Validate MVP prototype with 25 target pilot users", dueDate: "Tomorrow", completed: false, category: "MVP" },
    { id: "t3", title: "Apply for Startup India Seed Fund Scheme (SISFS)", dueDate: "In 3 days", completed: false, category: "Funding" },
    { id: "t4", title: "Export 8-slide investor pitch deck for incubation panel", dueDate: "This week", completed: false, category: "Funding" },
  ]);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Welcome Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl glass-card-glow border border-indigo-500/30">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-1">
            Founder Workspace
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Welcome back, Himanshu! 👋
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Your multi-agent AI system is monitoring active market trends and regional cost arbitrage.
          </p>
        </div>

        <button
          onClick={onNavigateToChat}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:scale-[1.02] shrink-0"
        >
          <Plus className="w-4 h-4 text-cyan-300" />
          <span>New AI Business Analysis</span>
        </button>
      </div>

      {/* KPI Stats Grid (Image 5 Style: Revenue, Customers, Tasks, KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl glass-card border border-indigo-500/30 relative">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>BUSINESS HEALTH SCORE</span>
            <Activity className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-white">
            {report ? (report.overall_readiness_score * 10).toFixed(0) : "89"} <span className="text-sm font-normal text-slate-400">/ 100</span>
          </div>
          <p className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> High Commercial Probability
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-purple-500/30 relative">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>ACTIVE PROJECTS</span>
            <Rocket className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-white">3</div>
          <p className="text-[11px] text-purple-300 mt-1">2 Reports Exported</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-cyan-500/30 relative">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>REGIONAL MARGIN BOOST</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-cyan-300">
            {report ? report.regional_arbitrage.arbitrage_opportunities[0]?.estimated_profit_margin_boost || "+26.5%" : "+26.5%"}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Sourcing in Noida Node</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-emerald-500/30 relative">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>FUNDING GRANTS DISCOVERED</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">₹10 Lakhs</div>
          <p className="text-[11px] text-emerald-300/80 mt-1">Startup India SISFS Grant</p>
        </div>
      </div>

      {/* Main Workspace Split: Recent Projects & Today's Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Projects Column (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl glass-card border border-indigo-500/20 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-extrabold text-lg text-white">Recent Startup Projects</h3>
            <button onClick={onNavigateToAnalytics} className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              View Analytics <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {projects.map((p) => (
              <div
                key={p.id}
                onClick={onNavigateToAnalytics}
                className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/40 transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-white">{p.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{p.industry}</span>
                    <span>•</span>
                    <span className="text-indigo-300">{p.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="text-sm font-black text-emerald-400">{p.score}/100</span>
                    <span className="block text-[10px] text-slate-500">{p.updatedAt}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Execution Tasks Checklist (Image 2 style) */}
        <div className="p-6 rounded-3xl glass-card border border-purple-500/20 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-extrabold text-lg text-white">Today's Startup Tasks</h3>
            <span className="text-xs text-slate-400">{tasks.filter(t => t.completed).length}/{tasks.length} Completed</span>
          </div>

          <div className="space-y-2.5">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-start gap-3 ${
                  task.completed
                    ? "bg-slate-950/40 border-slate-800 text-slate-500 line-through"
                    : "bg-slate-900/90 border-slate-800 text-slate-200 hover:border-indigo-500/40"
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {}}
                  className="mt-0.5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <div className="flex-1">
                  <p className="font-medium leading-tight">{task.title}</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">Due: {task.dueDate}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action Export Center Button */}
          <button
            onClick={onNavigateToPitchDeck}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-indigo-300 font-semibold text-xs transition-all flex items-center justify-center gap-2"
          >
            <Presentation className="w-4 h-4 text-purple-400" />
            <span>Open Pitch Deck Studio</span>
          </button>
        </div>

      </div>

    </div>
  );
};
