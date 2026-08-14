import json
from typing import Dict, Any
from app.config import get_gemini_client

def analyze_marketing(idea_text: str) -> Dict[str, Any]:
    """8. Marketing Agent: Devises positioning, go-to-market channels, and budget allocation."""
    client = get_gemini_client()
    if client:
        try:
            prompt = f"""
            You are a Go-To-Market & Marketing Director.
            Devise a marketing strategy for: "{idea_text}".

            Return strictly valid JSON with keys:
            - positioning_headline: (string)
            - primary_acquisition_channels: (array of strings)
            - budget_allocation_percent: (object with keys: "Digital_Ads", "Content_SEO", "Events_Outreach", "Partner_Affiliates")
            - key_messaging_pillars: (array of strings)
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
            print(f"Marketing Agent fallback: {e}")

    return {
        "positioning_headline": "The Most Cost-Effective, Regional Supply-Chain Optimized Solution",
        "primary_acquisition_channels": [
            "Google Search PPC Ads targeting high-intent industrial keywords",
            "LinkedIn Outbound & Thought Leadership content for B2B founders",
            "Local MSME Chamber of Commerce & Incubator Partnerships"
        ],
        "budget_allocation_percent": {
            "Digital_Ads": 45,
            "Content_SEO": 25,
            "Events_Outreach": 20,
            "Partner_Affiliates": 10
        },
        "key_messaging_pillars": [
            "Evidence-Backed 20%+ Unit Cost Advantage",
            "Zero-Overhead Autonomous Execution",
            "Fast 4-Month Time-to-Market Delivery"
        ]
    }
