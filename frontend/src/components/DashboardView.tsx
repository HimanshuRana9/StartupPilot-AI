"use client";

import React, { useState } from "react";
import { 
  Rocket, Sparkles, Plus, CheckCircle2, Clock, 
  TrendingUp, FileText, Presentation, Activity, MapPin, 
  ShieldCheck, AlertCircle, ArrowUpRight, Check 
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
      title: report ? report.idea : "Candy Manufacturing & Retail Venture",
      industry: "Consumer Goods / Manufacturing",
      score: report ? Math.round(report.overall_readiness_score) : 81,
      location: report?.final_decision?.best_operating_location || "Greater Noida / Delhi",
      status: "Completed",
      updatedAt: "Just now",
    },
    {
      id: "p2",
      title: "AI Fitness & Health SaaS Platform",
      industry: "Health Tech / Software",
      score: 88,
      location: "Bengaluru / Hosur",
      status: "Completed",
      updatedAt: "2 hours ago",
    },
    {
      id: "p3",
      title: "Eco-Friendly Packaging Hub",
      industry: "Clean Tech / Industrial",
      score: 91,
      location: "Nashik / Mumbai",
      status: "In Progress",
      updatedAt: "Yesterday",
    },
  ]);

  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: "t1", title: "Audit Greater Noida warehouse lease tariffs", dueDate: "Today", completed: true, category: "Validation" },
    { id: "t2", title: "Validate sample batch with 25 pilot buyers", dueDate: "Tomorrow", completed: false, category: "MVP" },
    { id: "t3", title: "Apply for Startup India Seed Fund Scheme (SISFS)", dueDate: "In 3 days", completed: false, category: "Funding" },
    { id: "t4", title: "Export 8-slide investor pitch deck for seed panel", dueDate: "This week", completed: false, category: "Funding" },
  ]);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const decision = report?.final_decision;
  const score = report ? Math.round(report.overall_readiness_score) : 81;

  const categoryMetrics = [
    { label: "Market Demand", value: 86, color: "text-emerald-400 border-emerald-500/40" },
    { label: "Finance & COGS", value: 72, color: "text-indigo-400 border-indigo-500/40" },
    { label: "Competition Moat", value: 74, color: "text-purple-400 border-purple-500/40" },
    { label: "Safety Score", value: 69, color: "text-rose-400 border-rose-500/40" },
    { label: "Execution Feasibility", value: 84, color: "text-cyan-400 border-cyan-500/40" },
    { label: "Location Arbitrage", value: 91, color: "text-amber-400 border-amber-500/40" },
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Founder Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl glass-card-glow border border-indigo-500/30">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-1">
            StartupPilot AI • Evidence-Driven Platform
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Welcome back, Himanshu! 👋
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            11 Autonomous AI agents coordinating real-world market intelligence & regional supply chain arbitrage.
          </p>
        </div>

        <button
          onClick={onNavigateToChat}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:scale-[1.02] shrink-0"
        >
          <Plus className="w-4 h-4 text-cyan-300" />
          <span>New Business Analysis</span>
        </button>
      </div>

      {/* Main AI Decision Recommendation Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-indigo-500/40 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">
              FINAL AI SYNTHESIS & RECOMMENDATION
            </span>
            <h2 className="text-2xl font-black text-white flex items-center gap-2 mt-0.5">
              Recommendation: {decision?.recommendation || "BUILD MVP"}
              <Sparkles className="w-5 h-5 text-amber-300" />
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {decision?.recommendation_detail || "Proceed immediately to Phase 1 setup and pilot manufacturing. High commercial feasibility."}
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs text-slate-400 block font-semibold">STARTUP READINESS SCORE</span>
            <span className="text-4xl font-black text-white">{score}<span className="text-base text-slate-400">/100</span></span>
          </div>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30">
            <span className="text-slate-400 block font-semibold mb-1">OPTIMAL LOCATION NODE</span>
            <div className="flex items-center gap-2 font-bold text-cyan-300 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{decision?.best_operating_location || "Greater Noida Node"}</span>
            </div>
            <span className="text-[11px] text-emerald-400 block mt-1">
              Unit Cost Advantage: {decision?.unit_cost_advantage || "+26.5% Net Boost"}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30">
            <span className="text-slate-400 block font-semibold mb-1">CONFIDENCE SCORE</span>
            <div className="flex items-center gap-2 font-bold text-purple-300 text-sm">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>{decision?.confidence_score || 85.6}% Verified Confidence</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              Based on real lease & electricity tariffs
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30">
            <span className="text-slate-400 block font-semibold mb-1">EVIDENCE CITATIONS</span>
            <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{decision?.evidence_sources?.length || 4} Verified Datasets</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              Real estate, power & freight matrices
            </span>
          </div>
        </div>
      </div>

      {/* 6 Category Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {categoryMetrics.map((m, idx) => (
          <div key={idx} className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{m.label}</span>
            <span className={`text-2xl font-black block ${m.color.split(" ")[0]}`}>{m.value}%</span>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
              <div className={`h-full bg-gradient-to-r from-indigo-500 to-cyan-400`} style={{ width: `${m.value}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Workspace Split: Recent Projects & Today's Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Projects Column (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl glass-card border border-indigo-500/20 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-extrabold text-lg text-white">Active Startup Projects</h3>
            <button onClick={onNavigateToAnalytics} className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              View Market Intelligence <ArrowUpRight className="w-3.5 h-3.5" />
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
                    <span className="text-cyan-300">{p.location}</span>
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

        {/* Today's Tasks Checklist */}
        <div className="p-6 rounded-3xl glass-card border border-purple-500/20 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-extrabold text-lg text-white">Execution Milestones</h3>
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
