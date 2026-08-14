import json
import re
from typing import Dict, Any, List, Optional
from app.config import get_gemini_client
from app.agents.orchestrator import orchestrator
from app.tools.arbitrage_engine import arbitrage_engine

SYSTEM_PROMPT = """
You are StartupPilot AI, an intelligent, conversational startup mentor and supply-chain advisor.
You interact via voice and text in a natural, human-like manner like Google Gemini.

KEY BEHAVIORAL DIRECTIVES:
1. You are NOT a keyword-matching or command-based script. Understand the true semantic intent of the user even when:
   - Grammar is imperfect or informal slang is used.
   - Sentences are incomplete (e.g. "I want start candy factory and sell Delhi but make Noida what you think?").
   - User refers to previous conversation context (e.g. "Would Noida be cheaper?").
2. For general business / startup questions (e.g. "What is CAC?", "Difference between gross and net margin?"):
   - Answer directly, naturally, and concisely in 2-3 sentences.
3. For location comparison queries (e.g. "Should I manufacture in Noida or Delhi?"):
   - You MUST trigger location comparison tools to retrieve exact dataset math, then explain the result naturally.
4. For full startup feasibility requests (e.g. "Analyze my candy business"):
   - Indicate that you are running the 11-agent pipeline, and summarize the key findings.
5. Return your response in strictly valid JSON format:
   {
     "spoken_reply": "Natural conversational spoken answer here",
     "action_type": "GENERAL_ADVICE" | "LOCATION_ARBITRAGE" | "STARTUP_ANALYSIS" | "PITCH_DECK",
     "data_summary": object or null,
     "follow_up_suggestions": ["Suggested question 1", "Suggested question 2", "Suggested question 3"]
   }
"""

def process_conversational_voice(
    user_query: str,
    conversation_history: Optional[List[Dict[str, str]]] = None
) -> Dict[str, Any]:
    """
    Processes user voice input using Gemini 2.5 Flash for natural semantic understanding,
    context memory, direct Q&A, and dynamic tool orchestration.
    """
    query_clean = user_query.strip()
    history_str = ""
    if conversation_history:
        for turn in conversation_history[-4:]:
            role = "User" if turn.get("sender") == "user" else "Assistant"
            history_str += f"{role}: {turn.get('text', '')}\n"

    client = get_gemini_client()

    # Pre-detect explicit city mentions for location tool calling
    cities = ["noida", "greater noida", "delhi", "mumbai", "pune", "bengaluru", "hosur", "hyderabad", "chennai", "nashik", "sriperumbudur"]
    found_cities = [c.title() for c in cities if c in query_clean.lower()]

    if client:
        try:
            prompt = f"{SYSTEM_PROMPT}\n\nRecent Conversation Context:\n{history_str}\n\nCurrent User Query: \"{query_clean}\"\n\nReturn strictly valid JSON:"
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt
            )
            text = response.text.strip()
            if "```json" in text:
                text = text.split("```json")[1].split("```")[0].strip()
            elif "```" in text:
                text = text.split("```")[1].split("```")[0].strip()
            
            parsed = json.loads(text)

            # If location comparison is requested or cities detected, augment with deterministic engine
            if parsed.get("action_type") == "LOCATION_ARBITRAGE" or len(found_cities) >= 1:
                src = found_cities[0] if len(found_cities) >= 1 else "Greater Noida"
                tgt = found_cities[1] if len(found_cities) >= 2 else ("Delhi" if src != "Delhi" else "Noida")
                arb_res = arbitrage_engine.compare_locations(src, tgt)
                
                parsed["data_summary"] = arb_res
                parsed["action_type"] = "LOCATION_ARBITRAGE"
                parsed["spoken_reply"] = (
                    f"Comparing {arb_res['source_city']} and {arb_res['target_city']}. Manufacturing in {arb_res['source_city']} costs "
                    f"₹{arb_res['source_costs']['total_per_unit']:.2f} per unit versus ₹{arb_res['target_costs']['total_per_unit']:.2f} in {arb_res['target_city']}. "
                    f"That gives you a ₹{arb_res['savings_per_unit']:.2f} unit cost advantage (+{arb_res['savings_percent']}% margin boost)!"
                )

            elif parsed.get("action_type") == "STARTUP_ANALYSIS" or any(w in query_clean.lower() for w in ["analyze", "startup idea", "business plan"]):
                analysis = orchestrator.run_pipeline(query_clean)
                parsed["data_summary"] = analysis
                parsed["action_type"] = "STARTUP_ANALYSIS"
                parsed["spoken_reply"] = (
                    f"I've executed the 11-agent pipeline for '{query_clean}'. Your startup scores {analysis['overall_readiness_score']}/100 with "
                    f"a recommendation to {analysis['final_decision']['recommendation']}. Optimal operating location: {analysis['final_decision']['best_operating_location']}."
                )

            return parsed

        except Exception as e:
            print(f"[VoiceAssistant Service Fallback]: {e}")

    # Heuristic & Fallback logic if LLM is offline
    if len(found_cities) >= 1 or "compare" in query_clean.lower():
        src = found_cities[0] if len(found_cities) >= 1 else "Greater Noida"
        tgt = found_cities[1] if len(found_cities) >= 2 else "Delhi"
        arb_res = arbitrage_engine.compare_locations(src, tgt)
        return {
            "spoken_reply": (
                f"Comparing {arb_res['source_city']} and {arb_res['target_city']}. Manufacturing in {arb_res['source_city']} costs "
                f"₹{arb_res['source_costs']['total_per_unit']:.2f} per unit versus ₹{arb_res['target_costs']['total_per_unit']:.2f} in {arb_res['target_city']}, "
                f"saving ₹{arb_res['savings_per_unit']:.2f} per unit ({arb_res['estimated_profit_margin_boost']} net margin boost)."
            ),
            "action_type": "LOCATION_ARBITRAGE",
            "data_summary": arb_res,
            "follow_up_suggestions": [
                f"Show me detailed rent & power tariffs for {arb_res['source_city']}",
                "What is the break-even volume for this batch?",
                "Generate an 8-slide investor pitch deck"
            ]
        }
    elif any(w in query_clean.lower() for w in ["analyze", "startup", "cafe", "candy", "business"]):
        analysis = orchestrator.run_pipeline(query_clean)
        return {
            "spoken_reply": (
                f"I've analyzed '{query_clean}' across 11 specialized agents. Overall readiness score: {analysis['overall_readiness_score']}/100. "
                f"Recommendation: {analysis['final_decision']['recommendation']}. Best location: {analysis['final_decision']['best_operating_location']}."
            ),
            "action_type": "STARTUP_ANALYSIS",
            "data_summary": analysis,
            "follow_up_suggestions": [
                "Who are my main competitors in this market?",
                "What is my CAC to LTV ratio?",
                "Download PowerPoint pitch deck"
            ]
        }
    else:
        return {
            "spoken_reply": (
                f"That's a great question about '{query_clean}'. StartupPilot evaluates your business feasibility using 11 AI agents "
                f"and real location cost datasets across commercial lease, power tariffs, and freight logistics."
            ),
            "action_type": "GENERAL_ADVICE",
            "data_summary": None,
            "follow_up_suggestions": [
                "Should I manufacture in Noida or Delhi?",
                "Analyze my candy manufacturing business idea",
                "How much initial seed investment do I need?"
            ]
        }
