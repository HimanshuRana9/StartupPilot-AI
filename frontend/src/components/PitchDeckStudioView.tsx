"use client";

import React, { useState } from "react";
import { 
  Presentation, Download, FileText, ChevronLeft, ChevronRight, 
  Sparkles, CheckCircle, Plus, Eye, Layers 
} from "lucide-react";
import { UnifiedStartupReport, PitchSlide } from "../types";

interface PitchDeckStudioViewProps {
  report: UnifiedStartupReport | null;
}

export const PitchDeckStudioView: React.FC<PitchDeckStudioViewProps> = ({ report }) => {
  const defaultSlides: PitchSlide[] = report?.investor_readiness?.pitch_slides || [
    { slide_number: 1, title: "The Problem", bullet_points: ["High operational overhead in traditional business setup", "Lack of real-time regional cost arbitrage insights"], key_takeaway: "Clear market pain point for automated AI execution." },
    { slide_number: 2, title: "The Solution", bullet_points: ["Autonomous Multi-Agent AI platform for founders", "Human-level supply chain price arbitrage (Noida vs Delhi)"], key_takeaway: "Rapid, cost-effective startup execution." },
    { slide_number: 3, title: "Market Opportunity", bullet_points: ["$14.8B Global Market with 21.4% CAGR", "Immediate focus on Tier-1 & Tier-2 regional hubs"], key_takeaway: "High-growth sector with expanding purchasing power." },
    { slide_number: 4, title: "Business & Revenue Model", bullet_points: ["Unit ARPU: ₹250 | COGS: ₹110", "Gross Margin: 56.0%"], key_takeaway: "High contribution margins & recurring cash flow." },
  ];

  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingPptx, setIsExportingPptx] = useState(false);

  const activeSlide = defaultSlides[activeSlideIdx] || defaultSlides[0];

  const downloadPdf = async () => {
    if (!report) return alert("Please run an AI analysis first to generate custom report data.");
    setIsExportingPdf(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/export/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(report),
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `StartupPilot_Report_${report.idea.slice(0, 15).replace(/\s+/g, "_")}.pdf`;
      a.click();
    } catch (e) {
      alert("Error exporting PDF report. Please ensure backend is running.");
    } finally {
      setIsExportingPdf(false);
    }
  };

  const downloadPptx = async () => {
    if (!report) return alert("Please run an AI analysis first to generate custom pitch deck data.");
    setIsExportingPptx(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/export/pptx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(report),
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `StartupPilot_PitchDeck_${report.idea.slice(0, 15).replace(/\s+/g, "_")}.pptx`;
      a.click();
    } catch (e) {
      alert("Error exporting PowerPoint file. Please ensure backend is running.");
    } finally {
      setIsExportingPptx(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Studio Header (Image 10 Style: apitch.com Studio Topbar) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl glass-card border border-indigo-500/20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-600/30 text-purple-300 border border-purple-500/30">
            <Presentation className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
              Investor Pitch Deck Studio
              <Sparkles className="w-4 h-4 text-amber-300" />
            </h1>
            <p className="text-xs text-slate-400">
              Auto-Generated Presentation Deck | Readiness Score: {report ? Math.round(report.overall_readiness_score) : "88"}/100
            </p>
          </div>
        </div>

        {/* Action Export Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={downloadPdf}
            disabled={isExportingPdf}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs transition-all shadow-md"
          >
            <FileText className="w-4 h-4 text-rose-400" />
            <span>{isExportingPdf ? "Exporting PDF..." : "Download PDF Report"}</span>
          </button>

          <button
            onClick={downloadPptx}
            disabled={isExportingPptx}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:opacity-95 text-white font-semibold text-xs transition-all shadow-lg shadow-indigo-600/30"
          >
            <Download className="w-4 h-4 text-cyan-300" />
            <span>{isExportingPptx ? "Exporting PPTX..." : "Download .PPTX Pitch Deck"}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Studio Workspace (Image 10 Layout: Center Slide Canvas + Right Thumbnail Strip) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Slide Canvas Editor / Previewer (3 cols) */}
        <div className="lg:col-span-3 p-8 rounded-3xl bg-slate-950 border border-indigo-500/30 min-h-[420px] flex flex-col justify-between shadow-2xl relative">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
            <span className="px-3 py-1 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold text-xs">
              SLIDE {activeSlide.slide_number} OF {defaultSlides.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">StartupPilot Presentation Engine</span>
          </div>

          <div className="my-6 space-y-4">
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-300">
              {activeSlide.title}
            </h2>

            <div className="space-y-3">
              {activeSlide.bullet_points.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <p className="text-indigo-200 font-semibold">
              <span className="text-indigo-400 uppercase mr-1">Key Takeaway:</span>
              {activeSlide.key_takeaway}
            </p>
          </div>
        </div>

        {/* Right Slide Thumbnail Strip (Image 10 Style) */}
        <div className="p-4 rounded-3xl glass-card border border-indigo-500/20 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase">Slide Outline</span>
            <span className="text-[10px] text-indigo-400 font-bold">{defaultSlides.length} Slides</span>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {defaultSlides.map((slide, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlideIdx(idx)}
                className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  idx === activeSlideIdx
                    ? "bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border-indigo-500 text-white font-bold shadow-md"
                    : "bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="overflow-hidden">
                  <span className="text-[10px] text-indigo-300 block font-semibold">Slide {slide.slide_number}</span>
                  <p className="text-xs truncate">{slide.title}</p>
                </div>
                <Eye className={`w-3.5 h-3.5 ${idx === activeSlideIdx ? "text-cyan-300" : "text-slate-600"}`} />
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
