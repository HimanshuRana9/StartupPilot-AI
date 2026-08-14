import json
from typing import Dict, Any
from app.tools.arbitrage_engine import arbitrage_engine
from app.config import get_gemini_client

def analyze_arbitrage(idea_text: str, source_city: str = "Greater Noida", target_city: str = "Delhi") -> Dict[str, Any]:
    """
    5. Regional Arbitrage Agent ⭐ (Killer Feature)
    Combines real dataset calculations with LLM strategic explanation.
    """
    # 1. Deterministic calculation
    calc_res = arbitrage_engine.compare_locations(
        source_city=source_city,
        target_city=target_city,
        monthly_volume=2000.0
    )

    client = get_gemini_client()
    strategic_insight = calc_res["recommendation"]

    if client:
        try:
            prompt = f"""
            You are a Senior Regional Supply Chain Strategist.
            The deterministic calculation engine produced the following location comparison data for a startup concept ("{idea_text}"):

            Sourcing Node ({calc_res['source_city']}): Total Cost per unit = ₹{calc_res['source_costs']['total_per_unit']}
            Target Demand Node ({calc_res['target_city']}): Total Cost per unit = ₹{calc_res['target_costs']['total_per_unit']}
            Net Unit Savings: ₹{calc_res['savings_per_unit']}/unit ({calc_res['savings_percent']}%)
            Distance Freight: {calc_res['distance_km']} km transit

            Write a concise 2-sentence executive explanation for the founder explaining why operating in {calc_res['source_city']} and shipping to {calc_res['target_city']} yields a competitive advantage.
            Return ONLY the explanation string.
            """
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt
            )
            if response and response.text:
                strategic_insight = response.text.strip()
        except Exception as e:
            print(f"Arbitrage agent LLM synthesis fallback: {e}")

    return {
        "arbitrage_summary": calc_res,
        "strategic_explanation": strategic_insight,
        "arbitrage_opportunities": [
            {
                "sourcing_node": calc_res['source_city'],
                "target_node": calc_res['target_city'],
                "rent_savings_per_sqft": f"₹{calc_res['source_costs']['manufacturing'] - calc_res['target_costs']['manufacturing']:.2f}",
                "estimated_profit_margin_boost": calc_res['estimated_profit_margin_boost'],
                "confidence_score": calc_res['confidence_score']
            }
        ]
    }
