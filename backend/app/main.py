import os
from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.models.schemas import (
    StartupAnalysisRequest, 
    UnifiedStartupReport, 
    VoiceCommandRequest, 
    VoiceCommandResponse
)
from app.agents.orchestrator import orchestrator
from app.tools.export_engine import generate_pdf_report, generate_pptx_pitch_deck

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Autonomous Multi-Agent Startup Mentor & Regional Arbitrage Intelligence Platform"
)

# CORS middleware for Next.js frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "app": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "features": [
            "Multi-Agent Execution Pipeline",
            "Human-Level Regional Supply Chain & Price Arbitrage",
            "Live Real-World Market News Integration",
            "Native Voice Assistant Controls",
            "Automated PDF Report & PowerPoint Deck Generator"
        ]
    }

@app.post("/api/analyze", response_model=UnifiedStartupReport)
def analyze_startup(request: StartupAnalysisRequest):
    """
    Runs the 8-agent unified pipeline to generate an end-to-end business evaluation.
    """
    if not request.idea or len(request.idea.strip()) < 3:
        raise HTTPException(status_code=400, detail="Please provide a valid startup idea prompt.")
        
    try:
        report = orchestrator.run_full_pipeline(request)
        return report
    except Exception as e:
        print(f"[API Error] Pipeline failure: {e}")
        raise HTTPException(status_code=500, detail=f"Analysis pipeline error: {str(e)}")

@app.post("/api/voice-command", response_model=VoiceCommandResponse)
def handle_voice_command(cmd_req: VoiceCommandRequest):
    """
    Handles natural spoken voice commands from the frontend Voice Assistant.
    """
    command_text = cmd_req.command.lower().strip()
    
    if "analyze" in command_text or "evaluate" in command_text or "start" in command_text:
        return VoiceCommandResponse(
            spoken_reply=f"Understood! Launching our 8 specialized AI agents to analyze your startup idea: '{cmd_req.command}'. Please review the generated dashboard.",
            action_type="ANALYZE",
            payload={"idea": cmd_req.command}
        )
    elif "arbitrage" in command_text or "noida" in command_text or "delhi" in command_text or "location" in command_text:
        return VoiceCommandResponse(
            spoken_reply="Operating out of Noida or regional industrial hubs yields up to 68% lower commercial rent and 26% power savings compared to Delhi, significantly boosting net profit margins.",
            action_type="EXPLAIN_ARBITRAGE"
        )
    elif "pitch" in command_text or "deck" in command_text or "presentation" in command_text:
        return VoiceCommandResponse(
            spoken_reply="Your 8-slide investor pitch deck has been compiled. You can download the formatted PowerPoint presentation and PDF report directly using the buttons below.",
            action_type="GENERATE_DECK"
        )
    else:
        return VoiceCommandResponse(
            spoken_reply=f"I have received your query: '{cmd_req.command}'. I am ready to evaluate your startup, calculate regional price arbitrage, or compile your investor pitch deck.",
            action_type="GENERAL_QA"
        )

@app.post("/api/export/pdf")
def export_pdf(report: UnifiedStartupReport):
    """
    Generates and returns a downloadable PDF report.
    """
    try:
        pdf_bytes = generate_pdf_report(report)
        filename = f"StartupPilot_Report_{report.idea[:15].replace(' ', '_')}.pdf"
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF generation error: {str(e)}")

@app.post("/api/export/pptx")
def export_pptx(report: UnifiedStartupReport):
    """
    Generates and returns a downloadable PowerPoint (.pptx) pitch deck presentation.
    """
    try:
        pptx_bytes = generate_pptx_pitch_deck(report)
        filename = f"StartupPilot_PitchDeck_{report.idea[:15].replace(' ', '_')}.pptx"
        return Response(
            content=pptx_bytes,
            media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PowerPoint generation error: {str(e)}")
