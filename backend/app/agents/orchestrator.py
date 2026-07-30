import datetime
from app.models.schemas import StartupAnalysisRequest, UnifiedStartupReport
from app.agents.idea_validator import run_idea_validator
from app.agents.market_research import run_market_research
from app.agents.competitor_analysis import run_competitor_analysis
from app.agents.arbitrage_agent import run_regional_arbitrage_agent
from app.agents.founder_profile import run_founder_feasibility
from app.agents.funding_advisor import run_cost_and_funding_advisor
from app.agents.roadmap_agent import run_implementation_roadmap_agent
from app.agents.pitch_deck import run_pitch_deck_agent

class MultiAgentOrchestrator:
    """
    Unified Orchestrator: Coordinates execution of all 8 specialized agents to generate a full Startup Evaluation.
    """
    def run_full_pipeline(self, request: StartupAnalysisRequest) -> UnifiedStartupReport:
        print(f"[Orchestrator] Starting Multi-Agent pipeline for idea: '{request.idea}'")
        
        # Step 1: Idea Validation Agent
        idea_val = run_idea_validator(request)
        
        # Step 2: Market Research Agent (with Live News)
        mkt_res = run_market_research(request)
        
        # Step 3: Competitor Analysis Agent
        comp_res = run_competitor_analysis(request)
        
        # Step 4: Human-Level Regional Supply Chain & Price Arbitrage Agent
        arbitrage_res = run_regional_arbitrage_agent(request)
        
        # Step 5: Founder Feasibility Agent
        founder_res = run_founder_feasibility(request)
        
        # Step 6: Cost Estimation & Funding Advisor Agent
        cost_res, funding_res = run_cost_and_funding_advisor(request)
        
        # Step 7: Implementation Roadmap Agent
        roadmap_res = run_implementation_roadmap_agent(request)
        
        # Calculate Overall Readiness Score (Weighted composite)
        overall_score = round(
            (idea_val.score * 0.25) +
            (founder_res.founder_readiness_score * 0.25) +
            (8.5 * 0.20) + # Market potential
            (9.0 if funding_res.bootstrap_feasible else 7.2) * 0.30,
            1
        )
        
        # Step 8: Pitch Deck & Investor Readiness Agent
        investor_res = run_pitch_deck_agent(request, overall_score=overall_score)
        
        now_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        return UnifiedStartupReport(
            timestamp=now_str,
            idea=request.idea,
            overall_readiness_score=overall_score,
            idea_validation=idea_val,
            market_research=mkt_res,
            competitor_analysis=comp_res,
            regional_arbitrage=arbitrage_res,
            founder_feasibility=founder_res,
            cost_estimation=cost_res,
            funding_advisor=funding_res,
            roadmap=roadmap_res,
            investor_readiness=investor_res,
            live_data_timestamp=now_str
        )

orchestrator = MultiAgentOrchestrator()
