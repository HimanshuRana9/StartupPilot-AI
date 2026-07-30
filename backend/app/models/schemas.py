from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class FounderProfileInput(BaseModel):
    name: Optional[str] = "Founder"
    location: Optional[str] = "Delhi NCR / Noida"
    education: Optional[str] = "Engineering / Business Student"
    technical_skills: List[str] = Field(default_factory=lambda: ["Python", "React", "AI Prompting"])
    business_experience: Optional[str] = "Beginner / Intermediate"
    available_budget: Optional[float] = 100000.0  # in INR or currency
    available_hours_per_week: Optional[int] = 25
    has_co_founder: bool = False

class StartupAnalysisRequest(BaseModel):
    idea: str = Field(..., description="Startup idea or business prompt")
    industry: Optional[str] = None
    founder: FounderProfileInput = Field(default_factory=FounderProfileInput)

class IdeaValidationResult(BaseModel):
    score: float = 8.5
    problem_statement: str
    proposed_solution: str
    target_audience: str
    innovation_index: float
    feasibility_difficulty: str
    primary_risks: List[str]
    initial_recommendation: str

class MarketResearchResult(BaseModel):
    market_size_description: str
    cagr_growth_rate: str
    top_countries_or_regions: List[str]
    emerging_trends: List[str]
    live_news_highlights: List[str]

class CompetitorItem(BaseModel):
    name: str
    pricing_model: str
    key_advantages: List[str]
    vulnerabilities: List[str]

class CompetitorAnalysisResult(BaseModel):
    competitors: List[CompetitorItem]
    market_gap: str
    differentiation_strategy: str

class RegionalArbitrageNode(BaseModel):
    region_name: str
    type: str  # "Sourcing/Manufacturing Node" or "Sales/Distribution Node"
    land_rent_level: str
    labor_cost_level: str
    raw_material_cost_estimate: str
    key_advantages: List[str]

class ArbitrageOpportunity(BaseModel):
    source_location: str
    target_location: str
    item_or_category: str
    cost_difference_percent: str
    freight_or_logistics_ease: str
    estimated_profit_margin_boost: str
    strategic_advice: str

class RegionalArbitrageResult(BaseModel):
    nodes: List[RegionalArbitrageNode]
    arbitrage_opportunities: List[ArbitrageOpportunity]
    recommended_setup_location: str
    recommended_sales_location: str

class SkillGapItem(BaseModel):
    skill: str
    importance: str
    current_status: str
    how_to_acquire: str

class FounderFeasibilityResult(BaseModel):
    founder_readiness_score: float
    technical_match_percent: float
    business_match_percent: float
    financial_match_percent: float
    skill_gaps: List[SkillGapItem]
    worklife_advice: str

class CostItem(BaseModel):
    category: str
    estimated_cost: float
    frequency: str  # "one-time", "monthly", "yearly"
    description: str

class CostEstimationResult(BaseModel):
    total_initial_budget_required: float
    monthly_burn_rate: float
    cost_breakdown: List[CostItem]
    budget_gap: float
    unit_economics_summary: str

class FundingOption(BaseModel):
    method: str
    suitability_score: float
    why_suitable: str
    actionable_steps: List[str]

class FundingAdvisorResult(BaseModel):
    primary_recommendation: str
    bootstrap_feasible: bool
    incubator_or_grant_opportunities: List[str]
    loan_advisability: str
    investor_timeline_recommendation: str
    options: List[FundingOption]

class RoadmapMilestone(BaseModel):
    month: int
    phase_name: str
    key_tasks: List[str]
    expected_output: str
    estimated_cost: float

class ImplementationRoadmapResult(BaseModel):
    total_months: int
    milestones: List[RoadmapMilestone]
    critical_path_warning: str

class PitchSlide(BaseModel):
    slide_number: int
    title: str
    bullet_points: List[str]
    key_takeaway: str

class InvestorReadinessResult(BaseModel):
    investor_readiness_score: float
    deck_slides: List[PitchSlide]
    investor_qa_prep: Dict[str, str]

class UnifiedStartupReport(BaseModel):
    timestamp: str
    idea: str
    overall_readiness_score: float
    idea_validation: IdeaValidationResult
    market_research: MarketResearchResult
    competitor_analysis: CompetitorAnalysisResult
    regional_arbitrage: RegionalArbitrageResult
    founder_feasibility: FounderFeasibilityResult
    cost_estimation: CostEstimationResult
    funding_advisor: FundingAdvisorResult
    roadmap: ImplementationRoadmapResult
    investor_readiness: InvestorReadinessResult
    live_data_timestamp: str

class VoiceCommandRequest(BaseModel):
    command: str
    current_state: Optional[Dict[str, Any]] = None

class VoiceCommandResponse(BaseModel):
    spoken_reply: str
    action_type: str  # "ANALYZE", "EXPLAIN_ARBITRAGE", "GENERATE_DECK", "GENERAL_QA"
    payload: Optional[Dict[str, Any]] = None
