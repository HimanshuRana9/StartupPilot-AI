import json
import os
try:
    from google import genai
except ImportError:
    genai = None

from app.config import settings
from app.models.schemas import RegionalArbitrageResult, RegionalArbitrageNode, ArbitrageOpportunity, StartupAnalysisRequest
from app.tools.live_data import calculate_regional_arbitrage_data

def run_regional_arbitrage_agent(request: StartupAnalysisRequest) -> RegionalArbitrageResult:
    """
    Agent 4: Human-Level Regional Supply Chain & Price Arbitrage Agent
    Evaluates real-world node pricing differences (e.g. Noida vs Delhi, Hosur vs Bengaluru)
    and formulates exact sourcing/manufacturing vs distribution profit boost advice.
    """
    source_city = "Noida"
    target_city = "Delhi"
    
    if "south" in request.idea.lower() or "bengaluru" in request.idea.lower():
        source_city = "Hosur"
        target_city = "Bengaluru"
        
    calc_data = calculate_regional_arbitrage_data(request.idea, source_city=source_city, target_city=target_city)
    
    api_key = settings.GEMINI_API_KEY or os.getenv("GEMINI_API_KEY", "")
    
    if api_key and genai:
        try:
            client = genai.Client(api_key=api_key)
            prompt = f"""
You are a World-Class Supply Chain Consultant & Regional Cost Arbitrage Specialist.
Analyze the regional operating node & cost arbitrage for startup idea: "{request.idea}".
Source Production/Operating Hub: {source_city}
Target Consumer Sales Hub: {target_city}
Calculated Live Data:
- Rent Saving: {calc_data['rent_saving_percent']}% lower in {source_city} vs {target_city}
- Electricity Tariff Saving: {calc_data['power_saving_percent']}% lower
- Labor Cost Saving: {calc_data['labor_saving_percent']}% lower
- Estimated Net Profit Margin Boost: {calc_data['estimated_net_margin_boost']}

Return ONLY a valid JSON object matching this schema:
{{
  "nodes": [
    {{
      "region_name": "{calc_data['source']['name']}",
      "type": "Sourcing & Operations Node",
      "land_rent_level": "Low (₹35/sqft/mo)",
      "labor_cost_level": "Cost-Effective (₹12,500/mo)",
      "raw_material_cost_estimate": "Wholesale Access / UP MSME Subsidies",
      "key_advantages": ["Lower warehouse tariffs", "Freight corridor access", "UP State MSME Rebate"]
    }},
    {{
      "region_name": "{calc_data['target']['name']}",
      "type": "High-Demand Sales Node",
      "land_rent_level": "High (₹110/sqft/mo)",
      "labor_cost_level": "Premium",
      "raw_material_cost_estimate": "Consumer Retail Price Point",
      "key_advantages": ["High consumer spending density", "Immediate market adoption"]
    }}
  ],
  "arbitrage_opportunities": [
    {{
      "source_location": "{source_city}",
      "target_location": "{target_city}",
      "item_or_category": "Production, Warehouse & Distribution Overhead",
      "cost_difference_percent": "{calc_data['rent_saving_percent']}% Lower Costs in {source_city}",
      "freight_or_logistics_ease": "High Expressway Connectivity (30-45 min transit)",
      "estimated_profit_margin_boost": "{calc_data['estimated_net_margin_boost']}",
      "strategic_advice": "Base your main manufacturing, inventory warehouse, and operational tech team in {source_city} to capture massive rent & power savings, while shipping finished goods / serving customers in {target_city}."
    }}
  ],
  "recommended_setup_location": "{source_city} Industrial Zone",
  "recommended_sales_location": "{target_city} & Surrounding NCR Retail/Online Channels"
}}
Do not include markdown backticks around JSON.
"""
            response = client.models.generate_content(
                model=settings.DEFAULT_MODEL,
                contents=prompt,
            )
            raw_text = response.text.strip().replace("```json", "").replace("```", "").strip()
            data = json.loads(raw_text)
            return RegionalArbitrageResult(**data)
        except Exception as e:
            print(f"[ArbitrageAgent] Gemini API note: {e}")

    # Robust Fallback Engine
    return RegionalArbitrageResult(
        nodes=[
            RegionalArbitrageNode(
                region_name=calc_data["source"]["name"],
                type="Sourcing & Operations Node",
                land_rent_level=f"₹{calc_data['source']['rent_per_sqft']}/sqft/mo ({calc_data['rent_saving_percent']}% cheaper)",
                labor_cost_level="Cost-Effective Regional Wage Pool",
                raw_material_cost_estimate="Industrial Park Discounted Tariff",
                key_advantages=[
                    "Lower lease costs and flexible warehouse expansion",
                    f"Power tariff savings of {calc_data['power_saving_percent']}%",
                    "Government MSME industrial rebates"
                ]
            ),
            RegionalArbitrageNode(
                region_name=calc_data["target"]["name"],
                type="High-Demand Sales & Consumer Node",
                land_rent_level=f"₹{calc_data['target']['rent_per_sqft']}/sqft/mo",
                labor_cost_level="Premium Metro",
                raw_material_cost_estimate="Retail Selling Price Point",
                key_advantages=[
                    "High purchasing power & concentrated customer base",
                    "Brand visibility and fast organic customer referral"
                ]
            )
        ],
        arbitrage_opportunities=[
            ArbitrageOpportunity(
                source_location=source_city,
                target_location=target_city,
                item_or_category="Operational Lease & Regional Labor Arbitrage",
                cost_difference_percent=f"{calc_data['rent_saving_percent']}% lower operating overhead",
                freight_or_logistics_ease="Direct express highway transit (under 45 min)",
                estimated_profit_margin_boost=calc_data['estimated_net_margin_boost'],
                strategic_advice=f"Operate backend operations, production, and storage out of {source_city} while marketing and distributing to high-spending customers in {target_city}. This human-brain style supply chain arbitrage maximizes net profit margins by {calc_data['estimated_net_margin_boost']}."
            )
        ],
        recommended_setup_location=f"{source_city} Industrial/Tech Zone",
        recommended_sales_location=f"{target_city} & Global Digital Channels"
    )
