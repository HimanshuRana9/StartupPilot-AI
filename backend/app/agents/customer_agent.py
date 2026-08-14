import json
from typing import Dict, Any
from app.config import get_gemini_client

def analyze_customers(idea_text: str) -> Dict[str, Any]:
    """4. Customer Intelligence Agent: Generates target buyer personas and willingness to pay."""
    client = get_gemini_client()
    if client:
        try:
            prompt = f"""
            You are a Customer Research Specialist. Create customer profiles for: "{idea_text}".

            Return strictly valid JSON with keys:
            - primary_persona: (string, e.g. "Growth-stage SMB Founder & Operations Manager")
            - key_pain_points: (array of strings)
            - buying_triggers: (array of strings)
            - willingness_to_pay: (string, e.g. "High readiness for ₹999/mo - ₹4,999/mo tier")
            - customer_acquisition_channels: (array of strings)
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
            print(f"Customer Agent fallback: {e}")

    return {
        "primary_persona": "Early-stage Founder, MSME Manufacturer, or Regional Retail Business Owner",
        "key_pain_points": [
            "High warehouse lease & commercial rent overheads",
            "Unclear unit economics and break-even timelines",
            "Difficulty creating compelling pitch decks for seed investors"
        ],
        "buying_triggers": [
            "Need to reduce supply chain manufacturing costs",
            "Preparing for investor seed pitch or incubator application",
            "Expanding operations into neighboring industrial hubs"
        ],
        "willingness_to_pay": "High (₹999/mo for Pro SaaS tier, ₹4,999 per custom feasibility report)",
        "customer_acquisition_channels": [
            "LinkedIn & Twitter B2B Founder Outbound",
            "Startup Incubators & MSME Industrial Associations",
            "Google Search Ads targeting 'Regional Business Feasibility Calculator'"
        ]
    }
