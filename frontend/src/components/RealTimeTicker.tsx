"use client";

import React from "react";
import { Activity, Globe, TrendingUp, Radio } from "lucide-react";

interface RealTimeTickerProps {
  news: string[];
  timestamp?: string;
}

export const RealTimeTicker: React.FC<RealTimeTickerProps> = ({ news, timestamp }) => {
  return (
    <div className="w-full py-2.5 px-4 rounded-2xl glass-card border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
      
      {/* Live Indicator Badge */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-ping" />
          LIVE REAL-WORLD INTELLIGENCE
        </span>
        <span className="text-slate-400 hidden lg:inline">|</span>
        <span className="text-slate-400 text-[11px] hidden lg:inline">
          Fetched: {timestamp || "Live Updates Active"}
        </span>
      </div>

      {/* Marquee Ticker */}
      <div className="flex-1 overflow-hidden relative w-full">
        <div className="flex items-center gap-6 whitespace-nowrap animate-marquee">
          {news && news.length > 0 ? (
            news.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-300">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>{item}</span>
                <span className="text-slate-600 ml-4">•</span>
              </div>
            ))
          ) : (
            <div className="flex items-center gap-2 text-slate-300">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Real-time news & market indexes actively monitoring global startup trends...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
