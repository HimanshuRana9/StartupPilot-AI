"use client";

import React, { useState } from "react";
import { Presentation, Download, FileText, ChevronLeft, ChevronRight, CheckCircle, Sparkles } from "lucide-react";
import { InvestorReadinessResult, UnifiedStartupReport } from "../types";

interface PitchDeckViewerProps {
  report: UnifiedStartupReport;
}

export const PitchDeckViewer: React.FC<PitchDeckViewerProps> = ({ report }) => {
  const slides = report.investor_readiness.pitch_slides || [];
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingPptx, setIsExportingPptx] = useState(false);

  const handleNextSlide = () => {
    if (currentSlideIdx < slides.length - 1) {
      setCurrentSlideIdx(currentSlideIdx + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIdx > 0) {
      setCurrentSlideIdx(currentSlideIdx - 1);
    }
  };

  const downloadPdf = async () => {
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
      alert("Error generating PDF file. Please ensure backend is running.");
    } finally {
      setIsExportingPdf(false);
    }
  };

  const downloadPptx = async () => {
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
      alert("Error generating PowerPoint file. Please ensure backend is running.");
    } finally {
      setIsExportingPptx(false);
    }
  };

  if (!slides || slides.length === 0) return null;

  const activeSlide = slides[currentSlideIdx];

  return (
    <div className="glass-card rounded-3xl p-6 border border-indigo-500/20 relative">
      
      {/* Header with Export Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Presentation className="w-5 h-5 text-indigo-400" />
            <h3 className="text-xl font-extrabold text-white">
              Investor Pitch Deck & Export Center
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Auto-Generated 8-Slide Pitch Deck | Investor Readiness Score: {Math.round(report.overall_readiness_score)}/100
          </p>
        </div>

        {/* Download Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={downloadPdf}
            disabled={isExportingPdf}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs transition-all shadow-md"
          >
            <FileText className="w-4 h-4 text-rose-400" />
            <span>{isExportingPdf ? "Generating PDF..." : "Export PDF Report"}</span>
          </button>

          <button
            onClick={downloadPptx}
            disabled={isExportingPptx}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/30"
          >
            <Download className="w-4 h-4 text-cyan-300" />
            <span>{isExportingPptx ? "Generating PowerPoint..." : "Export .PPTX Pitch Deck"}</span>
          </button>
        </div>
      </div>

      {/* Slide Preview Canvas */}
      <div className="my-6 p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-indigo-500/30 relative min-h-[320px] flex flex-col justify-between shadow-2xl">
        
        {/* Top Slide Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold text-xs">
            SLIDE {activeSlide.slide_number} OF {slides.length}
          </span>
          <span className="text-xs text-slate-500 font-medium">StartupPilot AI Pitch Generator</span>
        </div>

        {/* Slide Title */}
        <h4 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-300 mb-4">
          {activeSlide.title}
        </h4>

        {/* Slide Content Bullet Points */}
        <div className="space-y-3 my-2 flex-1">
          {activeSlide.bullet_points.map((pt, idx) => (
            <div key={idx} className="flex items-start gap-3 text-sm text-slate-200">
              <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>{pt}</span>
            </div>
          ))}
        </div>

        {/* Key Takeaway Banner */}
        <div className="mt-6 p-3.5 rounded-xl bg-indigo-950/60 border border-indigo-500/40 text-xs flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
          <p className="text-indigo-200 font-semibold">
            <span className="text-indigo-400 uppercase mr-1">Key Takeaway:</span>
            {activeSlide.key_takeaway}
          </p>
        </div>
      </div>

      {/* Slide Navigation Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevSlide}
          disabled={currentSlideIdx === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold text-slate-300 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous Slide
        </button>

        {/* Indicator dots */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIdx(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === currentSlideIdx ? "bg-indigo-400 w-6" : "bg-slate-700"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNextSlide}
          disabled={currentSlideIdx === slides.length - 1}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold text-slate-300 transition-colors"
        >
          Next Slide
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
