import asyncio
from typing import Dict, Any

from app.agents.idea_agent import analyze_idea
from app.agents.market_agent import analyze_market
from app.agents.competitor_agent import analyze_competitors
from app.agents.customer_agent import analyze_customers
from app.agents.arbitrage_agent import analyze_arbitrage
from app.agents.financial_agent import analyze_financials
from app.agents.risk_agent import analyze_risks
from app.agents.marketing_agent import analyze_marketing
from app.agents.execution_agent import analyze_execution
from app.agents.investor_agent import analyze_investor_prep
from app.agents.decision_agent import synthesize_final_decision

class StartupPilotOrchestrator:
    """
    Central Multi-Agent System Orchestrator.
    Coordinating 11 specialized agent roles in a stateful workflow.
    """
    def run_pipeline(
        self,
        idea: str,
        source_city: str = "Greater Noida",
        target_city: str = "Delhi"
    ) -> Dict[str, Any]:
        
        # Step 1: Idea Analyst Agent
        idea_val = analyze_idea(idea)

        # Step 2: Market Research Agent
        market_res = analyze_market(idea)

        # Step 3: Competitor Intelligence Agent
        competitor_res = analyze_competitors(idea)

        # Step 4: Customer Intelligence Agent
        customer_res = analyze_customers(idea)

        # Step 5: Regional Arbitrage Agent (Deterministic + LLM)
        arbitrage_res = analyze_arbitrage(idea, source_city=source_city, target_city=target_city)

        # Step 6: Financial Agent (Deterministic Calculator)
        financial_res = analyze_financials(
            revenue_per_unit=250.0,
            cogs_per_unit=110.0,
            monthly_fixed_costs=45000.0,
            monthly_volume=500,
            initial_capital=150000.0
        )

        # Step 7: Risk Agent
        risk_res = analyze_risks(idea)

        # Step 8: Marketing Agent
        marketing_res = analyze_marketing(idea)

        # Step 9: Execution Agent
        roadmap_res = analyze_execution(idea)

        # Step 10: Investor Agent
        investor_res = analyze_investor_prep(idea)

        # State bundle for final decision synthesis
        state_bundle = {
            "idea": idea,
            "idea_validation": idea_val,
            "market_research": market_res,
            "competitor_analysis": competitor_res,
            "customer_analysis": customer_res,
            "regional_arbitrage": arbitrage_res,
            "financial_analysis": financial_res,
            "risk_assessment": risk_res,
            "marketing_strategy": marketing_res,
            "roadmap": roadmap_res,
            "investor_readiness": investor_res,
        }

        # Step 11: Final Decision & Synthesis Agent
        decision_res = synthesize_final_decision(state_bundle)
        state_bundle["final_decision"] = decision_res
        state_bundle["overall_readiness_score"] = decision_res["overall_readiness_score"]

        # Backwards compatibility key mapping for legacy views
        state_bundle["cost_estimation"] = {
            "total_initial_budget_required": financial_res["capital_runway"]["initial_capital"],
            "monthly_operating_burn": financial_res["capital_runway"]["monthly_burn"],
            "cogs_per_unit": financial_res["unit_metrics"]["cogs_per_unit"],
            "breakeven_months": 4,
            "cost_breakdown": [
                {"category": "Product Manufacturing & Raw Materials", "amount": 60000, "percentage": 40.0},
                {"category": "Regional Warehouse & Logistics Hub", "amount": 37500, "percentage": 25.0},
                {"category": "Marketing & Customer Acquisition", "amount": 30000, "percentage": 20.0},
                {"category": "Working Capital Reserve", "amount": 22500, "percentage": 15.0}
            ]
        }
        state_bundle["funding_advisor"] = {
            "bootstrap_feasible": True,
            "recommended_funding_stage": "Bootstrapped Seed",
            "government_grants_available": ["Startup India Seed Fund Scheme (SISFS)", "UP MSME Industrial Tariff Rebate"],
            "primary_recommendation": f"Manufacture in {arbitrage_res['arbitrage_summary']['source_city']} to lower unit cost by {arbitrage_res['arbitrage_summary']['estimated_profit_margin_boost']}."
        }

        return state_bundle

orchestrator = StartupPilotOrchestrator()
