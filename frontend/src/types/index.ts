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

export interface EvidenceItem {
  source: string;
  type: string;
  timestamp: string;
}

export interface FinalDecisionResult {
  overall_readiness_score: number;
  recommendation: "BUILD MVP" | "BOOTSTRAP & VALIDATE" | "PIVOT MODEL" | string;
  recommendation_detail: string;
  confidence_score: number;
  best_operating_location: string;
  unit_cost_advantage: string;
  key_reasons: string[];
  evidence_sources: EvidenceItem[];
}

export interface IdeaValidationResult {
  problem_statement: string;
  solution_concept: string;
  target_audience: string;
  unique_value_prop: string;
  innovation_index: number;
  execution_complexity: string;
  key_differentiators: string[];
}

export interface MarketResearchResult {
  tam: string;
  sam: string;
  som: string;
  cagr_growth: string;
  market_demand_score: number;
  key_market_trends: string[];
  live_news_references: string[];
}

export interface CompetitorItem {
  name: string;
  pricing_model: string;
  rating: string;
  key_advantages: string[];
  vulnerabilities: string[];
}

export interface CompetitorAnalysisResult {
  competitors: CompetitorItem[];
  market_gap_opportunity: string;
  competitive_moat_strategy: string;
}

export interface CustomerAnalysisResult {
  primary_persona: string;
  key_pain_points: string[];
  buying_triggers: string[];
  willingness_to_pay: string;
  customer_acquisition_channels: string[];
}

export interface RegionalCostBreakdown {
  manufacturing: number;
  warehouse: number;
  electricity: number;
  labor: number;
  tax_benefit: number;
  logistics_freight: number;
  total_per_unit: number;
}

export interface ArbitrageSummary {
  source_city: string;
  source_state: string;
  target_city: string;
  target_state: string;
  distance_km: number;
  source_costs: RegionalCostBreakdown;
  target_costs: RegionalCostBreakdown;
  savings_per_unit: number;
  savings_percent: number;
  estimated_profit_margin_boost: string;
  confidence_score: number;
  recommendation: string;
  evidence: EvidenceItem[];
}

export interface ArbitrageOpportunity {
  sourcing_node: string;
  target_node: string;
  rent_savings_per_sqft: string;
  estimated_profit_margin_boost: string;
  confidence_score: number;
}

export interface RegionalArbitrageResult {
  arbitrage_summary: ArbitrageSummary;
  strategic_explanation: string;
  arbitrage_opportunities: ArbitrageOpportunity[];
}

export interface FinancialAnalysisResult {
  unit_metrics: {
    revenue_per_unit: number;
    cogs_per_unit: number;
    gross_profit_per_unit: number;
    gross_margin_percent: number;
  };
  monthly_totals: {
    revenue: number;
    cogs: number;
    gross_profit: number;
    fixed_operating_costs: number;
    net_profit: number;
    net_margin_percent: number;
  };
  break_even: {
    units_required: number;
    revenue_required: number;
  };
  unit_economics: {
    cac: number;
    ltv: number;
    ltv_cac_ratio: number;
  };
  capital_runway: {
    initial_capital: number;
    monthly_burn: number;
    runway_months: number;
    annualized_roi_percent: number;
  };
}

export interface RiskItem {
  category: string;
  risk_level: string;
  description: string;
  mitigation_strategy: string;
}

export interface RiskAssessmentResult {
  overall_risk_level: string;
  overall_risk_score: number;
  risk_matrix: RiskItem[];
}

export interface PitchSlide {
  slide_number: number;
  title: string;
  bullet_points: string[];
  key_takeaway: string;
}

export interface InvestorReadinessResult {
  investment_thesis: string;
  funding_ask: string;
  use_of_funds_percent: Record<string, number>;
  pitch_slides: PitchSlide[];
}

export interface UnifiedStartupReport {
  idea: string;
  overall_readiness_score: number;
  final_decision: FinalDecisionResult;
  idea_validation: IdeaValidationResult;
  market_research: MarketResearchResult;
  competitor_analysis: CompetitorAnalysisResult;
  customer_analysis: CustomerAnalysisResult;
  regional_arbitrage: RegionalArbitrageResult;
  financial_analysis: FinancialAnalysisResult;
  risk_assessment: RiskAssessmentResult;
  investor_readiness: InvestorReadinessResult;
  cost_estimation?: any;
  funding_advisor?: any;
  roadmap?: any;
}
