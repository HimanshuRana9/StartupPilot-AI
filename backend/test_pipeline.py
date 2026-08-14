import sys
import json
from app.agents.orchestrator import orchestrator

print("--- Testing 11-Agent StartupPilot AI Pipeline ---")
result = orchestrator.run_pipeline(
    idea="Eco-friendly Candy & Confectionery Manufacturing and Retailing",
    source_city="Greater Noida",
    target_city="Delhi"
)

print("\n[SUCCESS] Pipeline Execution Successful!")
print(f"Overall Readiness Score: {result['overall_readiness_score']}/100")
print(f"Recommendation: {result['final_decision']['recommendation']}")
print(f"Confidence Score: {result['final_decision']['confidence_score']}%")
print(f"Best Location: {result['final_decision']['best_operating_location']}")
print(f"Unit Cost Advantage: {result['final_decision']['unit_cost_advantage']}")
print(f"Evidence Sources Count: {len(result['final_decision']['evidence_sources'])}")
print("\nSample Evidence Source:", json.dumps(result['final_decision']['evidence_sources'][0], indent=2))
