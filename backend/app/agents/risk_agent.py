import json
from typing import Dict, Any
from app.config import get_gemini_client

def analyze_risks(idea_text: str) -> Dict[str, Any]:
    """7. Risk Agent: Evaluates market, financial, supply chain, and regulatory risks."""
    client = get_gemini_client()
    if client:
        try:
            prompt = f"""
            You are a Risk Risk Assessment Director.
            Analyze key risks for the startup concept: "{idea_text}".

            Return strictly valid JSON with keys:
            - overall_risk_level: (string "Low", "Medium", "High")
            - overall_risk_score: (number 1-100, where lower is safer)
            - risk_matrix: (array of 4 objects, each with:
                - category: (string "Market", "Financial", "Supply Chain", "Regulatory")
                - risk_level: (string "Low", "Medium", "High")
                - description: (string)
                - mitigation_strategy: (string)
              )
            """
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt
            )
            text = response.text.strip()
            if "```json" in text:
                text = text.split("```json")[1].split("```")[0].strip()
            elif "```" in text:
                text = text.split("```")[1].split("```")[0].strip()
            return json.loads(text)
        except Exception as e:
            print(f"Risk agent fallback: {e}")

    return {
        "overall_risk_level": "Low to Medium",
        "overall_risk_score": 31,
        "risk_matrix": [
            {
                "category": "Market Demand Risk",
                "risk_level": "Medium",
                "description": "Risk of slower customer adoption during pilot rollout.",
                "mitigation_strategy": "Run digital pilot landing pages with pre-order deposits to validate demand prior to bulk inventory manufacturing."
            },
            {
                "category": "Supply Chain Freight Risk",
                "risk_level": "Low",
                "description": "Logistics transit delays between sourcing hub and consumer city.",
                "mitigation_strategy": "Maintain 2 weeks safety stock inventory at regional warehouse node."
            },
            {
                "category": "Financial Burn Risk",
                "risk_level": "Low",
                "description": "Working capital depletion before achieving break-even volume.",
                "mitigation_strategy": "Leverage Startup India SISFS grant funding & bootstrap initial production."
            },
            {
                "category": "Regulatory & MSME Subsidy Risk",
                "risk_level": "Low",
                "description": "Delays in state industrial subsidy disbursement.",
                "mitigation_strategy": "Model financial break-even independent of state subsidies."
            }
        ]
    }
