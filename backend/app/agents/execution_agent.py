import json
from typing import Dict, Any
from app.config import get_gemini_client

def analyze_execution(idea_text: str) -> Dict[str, Any]:
    """9. Execution Agent: Generates step-by-step milestone execution roadmap."""
    client = get_gemini_client()
    if client:
        try:
            prompt = f"""
            You are a Startup Operations & Program Manager.
            Create a 4-month milestone execution roadmap for: "{idea_text}".

            Return strictly valid JSON with keys:
            - total_months: (number 4)
            - phases: (array of 4 objects, each with:
                - month: (number 1-4)
                - phase_name: (string)
                - deliverables: (array of strings)
                - milestone_goal: (string)
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
            print(f"Execution Agent fallback: {e}")

    return {
        "total_months": 4,
        "phases": [
            {
                "month": 1,
                "phase_name": "Phase 1: Idea Validation & Regional Setup",
                "deliverables": [
                    "Finalize regional warehouse lease in Noida node",
                    "Complete competitor pricing & raw material supplier audit",
                    "Incorporate business entity & open MSME bank account"
                ],
                "milestone_goal": "Supplier contracts & regional hub secured."
            },
            {
                "month": 2,
                "phase_name": "Phase 2: MVP & Sample Pilot Batch",
                "deliverables": [
                    "Produce initial 200-unit pilot batch",
                    "Deploy digital landing page & brand identity",
                    "Conduct pilot feedback with 25 target buyers"
                ],
                "milestone_goal": "Validated MVP sample batch & pilot feedback."
            },
            {
                "month": 3,
                "phase_name": "Phase 3: Digital Marketing & B2B Distribution",
                "deliverables": [
                    "Launch Google Ads & LinkedIn Outbound campaign",
                    "Onboard 5 regional retail distribution partners",
                    "Apply for Startup India Seed Fund Scheme grant"
                ],
                "milestone_goal": "First 100 paying customers & grant submission."
            },
            {
                "month": 4,
                "phase_name": "Phase 4: Commercial Scale & Investor Presentation",
                "deliverables": [
                    "Scale production volume to 1,000 units/mo",
                    "Achieve monthly gross break-even milestone",
                    "Present 8-slide pitch deck to seed investors"
                ],
                "milestone_goal": "Commercial break-even & seed fund pitch."
            }
        ]
    }
