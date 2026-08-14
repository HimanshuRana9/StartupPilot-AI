"use client";

import React, { useState } from "react";
import { 
  MapPin, Sparkles, TrendingUp, ShieldCheck, ArrowRight, 
  Building2, Zap, Users, ShieldAlert, CheckCircle2, Clock 
} from "lucide-react";
import { RegionalArbitrageResult } from "../types";

interface ArbitrageCardProps {
  arbitrage: RegionalArbitrageResult;
  onCompareLocations?: (sourceCity: string, targetCity: string) => void;
}

export const ArbitrageCard: React.FC<ArbitrageCardProps> = ({
  arbitrage,
  onCompareLocations,
}) => {
  const summary = arbitrage.arbitrage_summary;
  const [selectedSource, setSelectedSource] = useState(summary.source_city || "Greater Noida");
  const [selectedTarget, setSelectedTarget] = useState(summary.target_city || "Delhi");

  const cityOptions = [
    "Greater Noida", "Noida", "Hosur", "Nashik", "Sriperumbudur", 
    "Delhi", "Bengaluru", "Mumbai", "Pune", "Chennai", "Hyderabad"
  ];

  const handleCompareTrigger = () => {
    if (onCompareLocations) {
      onCompareLocations(selectedSource, selectedTarget);
    }
  };

  return (
    <div className="p-6 rounded-3xl glass-card-glow border border-cyan-500/30 space-y-6">
      
      {/* Header Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block mb-1">
            ⭐ Killer Feature: Deterministic Engine
          </span>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-cyan-400" />
            Regional Supply Chain & Price Arbitrage
          </h3>
          <p className="text-xs text-slate-300">
            Real data comparison across commercial lease, electricity, labor, tax rebates & freight transit.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            Margin Boost: {summary.estimated_profit_margin_boost}
          </span>
          <span className="px-3 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold">
            Confidence: {summary.confidence_score}%
          </span>
        </div>
      </div>

      {/* Interactive Location Selector */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-slate-400 font-semibold">Sourcing Hub:</span>
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="py-1.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-xs focus:outline-none focus:border-cyan-400"
          >
            {cityOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <ArrowRight className="w-4 h-4 text-cyan-400 hidden sm:block" />

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-slate-400 font-semibold">Target Consumer City:</span>
          <select
            value={selectedTarget}
            onChange={(e) => setSelectedTarget(e.target.value)}
            className="py-1.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-xs focus:outline-none focus:border-cyan-400"
          >
            {cityOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCompareTrigger}
          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-all shadow-md shrink-0"
        >
          Recalculate Arbitrage
        </button>
      </div>

      {/* Cost Breakdown Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <th className="py-2.5 px-3">Cost Component</th>
              <th className="py-2.5 px-3 text-cyan-300">{summary.source_city} (Sourcing Node)</th>
              <th className="py-2.5 px-3 text-purple-300">{summary.target_city} (Sales Metro)</th>
              <th className="py-2.5 px-3 text-right">Net Advantage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            <tr>
              <td className="py-2.5 px-3 font-semibold text-white">Industrial Lease / Unit</td>
              <td className="py-2.5 px-3">₹{summary.source_costs.manufacturing.toFixed(2)}</td>
              <td className="py-2.5 px-3">₹{summary.target_costs.manufacturing.toFixed(2)}</td>
              <td className="py-2.5 px-3 text-right font-bold text-emerald-400">
                -₹{(summary.target_costs.manufacturing - summary.source_costs.manufacturing).toFixed(2)}
              </td>
            </tr>

            <tr>
              <td className="py-2.5 px-3 font-semibold text-white">Warehouse Logistics Lease</td>
              <td className="py-2.5 px-3">₹{summary.source_costs.warehouse.toFixed(2)}</td>
              <td className="py-2.5 px-3">₹{summary.target_costs.warehouse.toFixed(2)}</td>
              <td className="py-2.5 px-3 text-right font-bold text-emerald-400">
                -₹{(summary.target_costs.warehouse - summary.source_costs.warehouse).toFixed(2)}
              </td>
            </tr>

            <tr>
              <td className="py-2.5 px-3 font-semibold text-white">Electricity Power Tariff</td>
              <td className="py-2.5 px-3">₹{summary.source_costs.electricity.toFixed(2)}</td>
              <td className="py-2.5 px-3">₹{summary.target_costs.electricity.toFixed(2)}</td>
              <td className="py-2.5 px-3 text-right font-bold text-emerald-400">
                -₹{(summary.target_costs.electricity - summary.source_costs.electricity).toFixed(2)}
              </td>
            </tr>

            <tr>
              <td className="py-2.5 px-3 font-semibold text-white">Labor Hourly Rate / Unit</td>
              <td className="py-2.5 px-3">₹{summary.source_costs.labor.toFixed(2)}</td>
              <td className="py-2.5 px-3">₹{summary.target_costs.labor.toFixed(2)}</td>
              <td className="py-2.5 px-3 text-right font-bold text-emerald-400">
                -₹{(summary.target_costs.labor - summary.source_costs.labor).toFixed(2)}
              </td>
            </tr>

            <tr>
              <td className="py-2.5 px-3 font-semibold text-white">Freight Transit ({summary.distance_km} km)</td>
              <td className="py-2.5 px-3 text-amber-300">+₹{summary.source_costs.logistics_freight.toFixed(2)}</td>
              <td className="py-2.5 px-3 text-slate-500">₹0.00</td>
              <td className="py-2.5 px-3 text-right font-semibold text-amber-300">
                +₹{summary.source_costs.logistics_freight.toFixed(2)} freight
              </td>
            </tr>

            <tr className="bg-indigo-950/40 font-bold border-t-2 border-indigo-500/40">
              <td className="py-3 px-3 text-white">TOTAL COST PER UNIT</td>
              <td className="py-3 px-3 text-cyan-300 text-sm">₹{summary.source_costs.total_per_unit.toFixed(2)}</td>
              <td className="py-3 px-3 text-purple-300 text-sm">₹{summary.target_costs.total_per_unit.toFixed(2)}</td>
              <td className="py-3 px-3 text-right text-emerald-400 text-sm">
                Save ₹{summary.savings_per_unit.toFixed(2)} / unit ({summary.savings_percent}%)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* AI Strategic Synthesis & Evidence Sources */}
      <div className="space-y-3">
        <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200">
          <span className="text-cyan-300 font-bold uppercase mr-1.5">Strategic AI Reasoning:</span>
          {arbitrage.strategic_explanation}
        </div>

        {/* Evidence Tracking Badges */}
        <div className="pt-2 border-t border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
            Verified Evidence & Data Citations:
          </span>
          <div className="flex flex-wrap gap-2 text-[11px]">
            {summary.evidence.map((ev, idx) => (
              <div key={idx} className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{ev.source}</span>
                <span className="text-slate-500">• {ev.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
