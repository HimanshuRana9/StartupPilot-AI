"use client";

import React from "react";
import { 
  BarChart3, TrendingUp, Layers, MapPin, 
  DollarSign, ShieldAlert, PieChart, Activity 
} from "lucide-react";
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart as RePieChart, Pie 
} from "recharts";
import { ArbitrageCard } from "./ArbitrageCard";
import { UnifiedStartupReport } from "../types";

interface AnalyticsViewProps {
  report: UnifiedStartupReport | null;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ report }) => {
  const chartData = [
    { name: "Validation", score: report ? report.idea_validation.innovation_index * 10 : 88 },
    { name: "Market Size", score: 92 },
    { name: "Competitors", score: 78 },
    { name: "Founder Match", score: report ? report.founder_feasibility.founder_readiness_score * 10 : 85 },
    { name: "Funding", score: report ? (report.funding_advisor.bootstrap_feasible ? 90 : 70) : 85 },
  ];

  const pieData = [
    { name: "MVP Software & Tech", value: 35, color: "#6366f1" },
    { name: "Regional Warehouse & Ops", value: 40, color: "#06b6d4" },
    { name: "Digital Growth Ads", value: 25, color: "#a855f7" },
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-card border border-indigo-500/20">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">
            Deep Business Intelligence
          </span>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            Market Analytics & Competitive Intelligence
          </h1>
          <p className="text-xs text-slate-300">
            Real-world statistics, regional price arbitrage, and competitor battlecards.
          </p>
        </div>
      </div>

      {/* Visual Analytics Charts Grid (Image 7 Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Readiness Bar Chart */}
        <div className="p-6 rounded-3xl glass-card border border-indigo-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-400" />
              Category Score Breakdown
            </h3>
            <span className="text-xs text-slate-400">100 Benchmark Scale</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#6366f1", borderRadius: "12px", fontSize: "12px" }}
                />
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#6366f1" : "#06b6d4"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost Distribution Donut Chart */}
        <div className="p-6 rounded-3xl glass-card border border-purple-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-400" />
              Capital Budget Allocation
            </h3>
            <span className="text-xs text-slate-400">Estimated Cost Share</span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#a855f7", borderRadius: "12px", fontSize: "12px" }}
                />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Human-Level Regional Supply Chain & Price Arbitrage Card */}
      {report && <ArbitrageCard arbitrage={report.regional_arbitrage} />}

      {/* Competitor Battlecards Table (Image 8 Style: Kompyte / Competitor Intelligence) */}
      <div className="p-6 rounded-3xl glass-card border border-indigo-500/20 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="font-extrabold text-lg text-white">Competitor Battlecard Matrix</h3>
            <p className="text-xs text-slate-400">Comparing Incumbents, Pricing Vulnerabilities, and Unaddressed Gaps</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Competitor Name</th>
                <th className="py-3 px-4">Pricing Model</th>
                <th className="py-3 px-4">Key Advantage</th>
                <th className="py-3 px-4">Vulnerability / Weakness</th>
                <th className="py-3 px-4 text-right">Opportunity Gap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {report ? (
                report.competitor_analysis.competitors.map((comp, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">{comp.name}</td>
                    <td className="py-3.5 px-4 text-purple-300">{comp.pricing_model}</td>
                    <td className="py-3.5 px-4">{comp.key_advantages.join(", ")}</td>
                    <td className="py-3.5 px-4 text-rose-400 font-medium">{comp.vulnerabilities.join(", ")}</td>
                    <td className="py-3.5 px-4 text-right font-semibold text-emerald-400">High Arbitrage Potential</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-slate-500">
                    Run an AI analysis to populate competitor battlecards...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
