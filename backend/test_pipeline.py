import sys
import os

# Ensure backend directory is on sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.models.schemas import StartupAnalysisRequest, FounderProfileInput
from app.agents.orchestrator import orchestrator
from app.tools.export_engine import generate_pdf_report, generate_pptx_pitch_deck

def test_pipeline():
    print("[TEST] Testing StartupPilot AI Multi-Agent Pipeline...")
    req = StartupAnalysisRequest(
        idea="Candy business manufacturing in Noida & retailing in Delhi",
        founder=FounderProfileInput(
            name="Himanshu",
            location="Noida / Delhi NCR",
            available_budget=80000.0,
            technical_skills=["Python", "React"]
        )
    )
    
    report = orchestrator.run_full_pipeline(req)
    print(f"[SUCCESS] Multi-Agent Execution Complete! Overall Score: {report.overall_readiness_score}/10")
    print(f"[LOCATION] Sourcing Node: {report.regional_arbitrage.recommended_setup_location}")
    print(f"[LOCATION] Target Sales Node: {report.regional_arbitrage.recommended_sales_location}")
    print(f"[MARGIN] Net Margin Boost: {report.regional_arbitrage.arbitrage_opportunities[0].estimated_profit_margin_boost}")
    
    # Test PDF export
    pdf_bytes = generate_pdf_report(report)
    print(f"[EXPORT] PDF Report Generated: {len(pdf_bytes)} bytes")
    
    # Test PPTX export
    pptx_bytes = generate_pptx_pitch_deck(report)
    print(f"[EXPORT] PPTX Pitch Deck Generated: {len(pptx_bytes)} bytes")
    
    print("\n[PASSED] ALL BACKEND PIPELINE TESTS PASSED CLEANLY!")

if __name__ == "__main__":
    test_pipeline()
