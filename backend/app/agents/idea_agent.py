import json
from typing import Dict, Any
from app.config import get_gemini_client

def analyze_idea(idea_text: str) -> Dict[str, Any]:
    """1. Idea Analyst Agent: Decomposes a raw prompt into a structured business model."""
    client = get_gemini_client()
    if client:
        try:
            prompt = f"""
            You are an elite Startup Idea Analyst.
            Decompose the following startup concept into a structured business model analysis:
            "{idea_text}"

            Return strictly valid JSON with keys:
            - problem_statement: (string)
            - solution_concept: (string)
            - target_audience: (string)
            - unique_value_prop: (string)
            - innovation_index: (number 1-10)
            - execution_complexity: (string "Low", "Medium", "High")
            - key_differentiators: (array of strings)
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
            print(f"Idea Agent fallback triggered: {e}")

    # Fallback response
    return {
        "problem_statement": f"Lack of automated, high-efficiency solutions in the domain of: {idea_text}.",
        "solution_concept": f"AI-driven platform optimizing operations for {idea_text}.",
        "target_audience": "SMBs, enterprise operators, and tech-savvy consumers",
        "unique_value_prop": "Data-backed regional cost advantage and autonomous multi-agent execution.",
        "innovation_index": 8.5,
        "execution_complexity": "Medium",
        "key_differentiators": [
            "Deterministic regional supply chain arbitrage",
            "Autonomous multi-agent execution pipeline",
            "Evidence-backed unit economics calculations"
        ]
    }
