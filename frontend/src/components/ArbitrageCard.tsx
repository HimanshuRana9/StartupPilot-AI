"use client";

import React from "react";
import { MapPin, ArrowRight, Zap, TrendingUp, DollarSign, Building2, CheckCircle } from "lucide-react";
import { RegionalArbitrageResult } from "../types";

interface ArbitrageCardProps {
  arbitrage: RegionalArbitrageResult;
}

export const ArbitrageCard: React.FC<ArbitrageCardProps> = ({ arbitrage }) => {
  return (
    <div className="glass-card-glow rounded-3xl p-6 border border-indigo-500/30 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              Human-Brain Reasoning
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
              Supply Chain Arbitrage
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            Regional Cost & Location Arbitrage Analysis
          </h3>
          <p className="text-xs text-slate-400">
            Maximizing Profit Margins by Sourcing & Operating in Low-Cost Hubs
          </p>
        </div>

        {/* Profit Boost Badge */}
        {arbitrage.arbitrage_opportunities.length > 0 && (
          <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-600/30 to-teal-600/30 border border-emerald-500/40 text-emerald-300 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-emerald-400 animate-bounce" />
            <div>
              <span className="text-[10px] text-emerald-200/80 uppercase font-semibold block">
                NET PROFIT MARGIN BOOST
              </span>
              <span className="text-lg font-black text-white">
                {arbitrage.arbitrage_opportunities[0].estimated_profit_margin_boost}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Nodes Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        
        {/* Source Production Node */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-indigo-500/30 relative">
          <div className="flex items-center justify-between mb-3">
            <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-xs flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-indigo-400" />
              SOURCING / OPERATIONS NODE
            </span>
            <MapPin className="w-4 h-4 text-cyan-400" />
          </div>

          <h4 className="text-lg font-bold text-white mb-2">
            {arbitrage.recommended_setup_location}
          </h4>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Commercial Rent:</span>
              <span className="font-semibold text-emerald-400">
                {arbitrage.nodes[0]?.land_rent_level || "68% Cheaper than Metro"}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Labor Wages:</span>
              <span className="font-semibold text-cyan-300">
                {arbitrage.nodes[0]?.labor_cost_level || "Cost-Effective Regional Pool"}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">MSME Subsidy Status:</span>
              <span className="font-semibold text-indigo-300">Active State Industrial Rebates</span>
            </div>
          </div>
        </div>

        {/* Target Sales Node */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-purple-500/30 relative">
          <div className="flex items-center justify-between mb-3">
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-purple-400" />
              HIGH-DEMAND CONSUMER MARKET
            </span>
            <MapPin className="w-4 h-4 text-purple-400" />
          </div>

          <h4 className="text-lg font-bold text-white mb-2">
            {arbitrage.recommended_sales_location}
          </h4>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Customer Purchasing Power:</span>
              <span className="font-semibold text-purple-300">High Tier-1 / Metro Density</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Retail Selling Price Point:</span>
              <span className="font-semibold text-white">Full Value Premium Pricing</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Transit Logistics:</span>
              <span className="font-semibold text-cyan-300">Direct Express Corridor (30-45 min)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Advice Highlight */}
      {arbitrage.arbitrage_opportunities.length > 0 && (
        <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-3">
          <Zap className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
          <div>
            <h5 className="font-bold text-xs text-indigo-200 uppercase tracking-wide mb-1">
              Human-Brain Arbitrage Strategy:
            </h5>
            <p className="text-xs text-slate-200 leading-relaxed">
              {arbitrage.arbitrage_opportunities[0].strategic_advice}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
