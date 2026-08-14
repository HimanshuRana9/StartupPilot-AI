import json
from typing import Dict, Any
from app.config import get_gemini_client

def analyze_competitors(idea_text: str) -> Dict[str, Any]:
    """3. Competitor Intelligence Agent: Generates detailed competitor battlecards."""
    client = get_gemini_client()
    if client:
        try:
            prompt = f"""
            You are a Competitor Intelligence Analyst.
            Analyze key incumbents and direct competitors for: "{idea_text}".

            Return strictly valid JSON with keys:
            - competitors: (array of 3 objects, each with:
                - name: (string)
                - pricing_model: (string)
                - rating: (string, e.g. "4.6/5")
                - key_advantages: (array of strings)
                - vulnerabilities: (array of strings)
              )
            - market_gap_opportunity: (string)
            - competitive_moat_strategy: (string)
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
            print(f"Competitor Agent fallback: {e}")

    return {
        "competitors": [
            {
                "name": "Legacy Enterprise Incumbent",
                "pricing_model": "Expensive Annual Licensing (₹1.5L+/yr)",
                "rating": "4.2/5",
                "key_advantages": ["Established brand", "Wide distributor network"],
                "vulnerabilities": ["Slow delivery turnaround", "High fixed overhead costs", "No regional cost arbitrage intelligence"]
            },
            {
                "name": "Local Tier-2 Regional Player",
                "pricing_model": "Low Margin / Budget Tier",
                "rating": "4.0/5",
                "key_advantages": ["Local presence", "Low initial price"],
                "vulnerabilities": ["Outdated technology", "Inconsistent quality control", "Limited scalability"]
            },
            {
                "name": "Generic Online SaaS Tool",
                "pricing_model": "Monthly Subscription ($49/mo)",
                "rating": "4.4/5",
                "key_advantages": ["Easy web access", "Fast onboarding"],
                "vulnerabilities": ["Generic global data", "Zero hyper-local supply chain knowledge", "No pitch deck exporter"]
            }
        ],
        "market_gap_opportunity": "Combine real-time regional supply chain price arbitrage with automated AI pitch deck generation to lower unit cost by 20%+.",
        "competitive_moat_strategy": "Proprietary regional industrial tariff & warehouse logistics dataset."
    }
