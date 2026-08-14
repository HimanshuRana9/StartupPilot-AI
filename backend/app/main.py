import os
import io
from typing import Optional, Dict, Any
from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.agents.orchestrator import orchestrator
from app.tools.arbitrage_engine import arbitrage_engine
from app.tools.export_engine import generate_pdf_report, generate_pptx_pitch_deck
from app.tools.live_data import check_live_sources_health, fetch_live_news

app = FastAPI(
    title="StartupPilot AI API",
    description="Evidence-driven Multi-Agent Startup Feasibility & Regional Arbitrage Platform",
    version="2.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    idea: str
    source_city: Optional[str] = "Greater Noida"
    target_city: Optional[str] = "Delhi"
    founder: Optional[Dict[str, Any]] = None

class ArbitrageCompareRequest(BaseModel):
    source_city: str
    target_city: str
    monthly_volume: Optional[float] = 2000.0

class VoiceCommandRequest(BaseModel):
    command: str

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "StartupPilot AI Multi-Agent Intelligence Engine",
        "version": "2.0.0",
        "agents_active": 11,
        "live_sources_compliant": True
    }

@app.get("/api/live-data/status")
def get_live_data_status():
    """Returns up-to-the-second real-time source health, legal compliance, and latency metrics."""
    return check_live_sources_health()

@app.post("/api/analyze")
def analyze_startup(req: AnalyzeRequest):
    """Executes the full 11-agent business intelligence & regional arbitrage pipeline."""
    if not req.idea.strip():
        raise HTTPException(status_code=400, detail="Idea prompt cannot be empty.")
    
    try:
        report = orchestrator.run_pipeline(
            idea=req.idea,
            source_city=req.source_city or "Greater Noida",
            target_city=req.target_city or "Delhi"
        )
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error executing agent pipeline: {str(e)}")

@app.post("/api/arbitrage/compare")
def compare_locations(req: ArbitrageCompareRequest):
    """Compares supply chain, manufacturing, warehouse, and logistics costs between two cities."""
    try:
        result = arbitrage_engine.compare_locations(
            source_city=req.source_city,
            target_city=req.target_city,
            monthly_volume=req.monthly_volume or 2000.0
        )
        return {"status": "success", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error comparing locations: {str(e)}")

@app.post("/api/voice-command")
@app.post("/api/voice")
def process_voice_command(req: VoiceCommandRequest):
    """Processes interactive voice commands and returns spoken audio text & action intent."""
    cmd = req.command.lower().strip()
    
    if "compare" in cmd or "noida" in cmd or "mumbai" in cmd or "bengaluru" in cmd:
        res = arbitrage_engine.compare_locations("Greater Noida", "Delhi")
        reply = (
            f"Comparing Greater Noida and Delhi. Sourcing in Greater Noida costs ₹{res['source_costs']['total_per_unit']:.2f} "
            f"per unit, compared to ₹{res['target_costs']['total_per_unit']:.2f} in Delhi, yielding a "
            f"₹{res['savings_per_unit']:.2f} unit cost advantage."
        )
        return {"spoken_reply": reply, "action_type": "ARBITRAGE", "data": res}
    
    elif "pitch" in cmd or "deck" in cmd or "presentation" in cmd:
        reply = "Preparing your 8-slide investor pitch deck with financial projections and market size metrics."
        return {"spoken_reply": reply, "action_type": "PITCH_DECK"}
    
    else:
        reply = f"Analyzing your startup idea: '{req.command}'. Triggering 11 specialized agents now."
        return {"spoken_reply": reply, "action_type": "ANALYZE"}

@app.post("/api/export/pdf")
def export_pdf(report: Dict[str, Any]):
    """Generates an executive PDF report."""
    try:
        pdf_bytes = generate_pdf_report(report)
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=StartupPilot_Report.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF Export Error: {str(e)}")

@app.post("/api/export/pptx")
def export_pptx(report: Dict[str, Any]):
    """Generates an 8-slide PowerPoint investor presentation."""
    try:
        pptx_bytes = generate_pptx_pitch_deck(report)
        return Response(
            content=pptx_bytes,
            media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
            headers={"Content-Disposition": "attachment; filename=StartupPilot_PitchDeck.pptx"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PPTX Export Error: {str(e)}")
