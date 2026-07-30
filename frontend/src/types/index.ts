export type ActiveView = "landing" | "dashboard" | "chat" | "analytics" | "pitch-deck";

export interface ProjectItem {
  id: string;
  title: string;
  industry: string;
  score: number;
  location: string;
  status: "Completed" | "In Progress" | "Draft";
  updatedAt: string;
}

export interface TaskItem {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  category: "Validation" | "MVP" | "Marketing" | "Funding";
}

export interface FounderProfileInput {
  name?: string;
  location?: string;
  education?: string;
  technical_skills: string[];
  business_experience?: string;
  available_budget?: number;
  available_hours_per_week?: number;
  has_co_founder: boolean;
}

export interface IdeaValidationResult {
  score: number;
  problem_statement: string;
  proposed_solution: string;
  target_audience: string;
  innovation_index: number;
  feasibility_difficulty: string;
  primary_risks: string[];
  initial_recommendation: string;
}

export interface MarketResearchResult {
  market_size_description: string;
  cagr_growth_rate: string;
  top_countries_or_regions: string[];
  emerging_trends: string[];
  live_news_highlights: string[];
}

export interface CompetitorItem {
  name: string;
  pricing_model: string;
  key_advantages: string[];
  vulnerabilities: string[];
}

export interface CompetitorAnalysisResult {
  competitors: CompetitorItem[];
  market_gap: string;
  differentiation_strategy: string;
}

export interface RegionalArbitrageNode {
  region_name: string;
  type: string;
  land_rent_level: string;
  labor_cost_level: string;
  raw_material_cost_estimate: string;
  key_advantages: string[];
}

export interface ArbitrageOpportunity {
  source_location: string;
  target_location: string;
  item_or_category: string;
  cost_difference_percent: string;
  freight_or_logistics_ease: string;
  estimated_profit_margin_boost: string;
  strategic_advice: string;
}

export interface RegionalArbitrageResult {
  nodes: RegionalArbitrageNode[];
  arbitrage_opportunities: ArbitrageOpportunity[];
  recommended_setup_location: string;
  recommended_sales_location: string;
}

export interface SkillGapItem {
  skill: string;
  importance: string;
  current_status: string;
  how_to_acquire: string;
}

export interface FounderFeasibilityResult {
  founder_readiness_score: number;
  technical_match_percent: number;
  business_match_percent: number;
  financial_match_percent: number;
  skill_gaps: SkillGapItem[];
  worklife_advice: string;
}

export interface CostItem {
  category: string;
  estimated_cost: number;
  frequency: string;
  description: string;
}

export interface CostEstimationResult {
  total_initial_budget_required: number;
  monthly_burn_rate: number;
  cost_breakdown: CostItem[];
  budget_gap: number;
  unit_economics_summary: string;
}

export interface FundingOption {
  method: string;
  suitability_score: number;
  why_suitable: string;
  actionable_steps: string[];
}

export interface FundingAdvisorResult {
  primary_recommendation: string;
  bootstrap_feasible: boolean;
  incubator_or_grant_opportunities: string[];
  loan_advisability: string;
  investor_timeline_recommendation: string;
  options: FundingOption[];
}

export interface RoadmapMilestone {
  month: number;
  phase_name: string;
  key_tasks: string[];
  expected_output: string;
  estimated_cost: number;
}

export interface ImplementationRoadmapResult {
  total_months: number;
  milestones: RoadmapMilestone[];
  critical_path_warning: string;
}

export interface PitchSlide {
  slide_number: number;
  title: string;
  bullet_points: string[];
  key_takeaway: string;
}

export interface InvestorReadinessResult {
  investor_readiness_score: number;
  deck_slides: PitchSlide[];
  investor_qa_prep: Record<string, string>;
}

export interface UnifiedStartupReport {
  timestamp: string;
  idea: string;
  overall_readiness_score: number;
  idea_validation: IdeaValidationResult;
  market_research: MarketResearchResult;
  competitor_analysis: CompetitorAnalysisResult;
  regional_arbitrage: RegionalArbitrageResult;
  founder_feasibility: FounderFeasibilityResult;
  cost_estimation: CostEstimationResult;
  funding_advisor: FundingAdvisorResult;
  roadmap: ImplementationRoadmapResult;
  investor_readiness: InvestorReadinessResult;
  live_data_timestamp: string;
}
