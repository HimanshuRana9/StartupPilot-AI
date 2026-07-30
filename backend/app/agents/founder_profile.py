from app.models.schemas import FounderFeasibilityResult, SkillGapItem, StartupAnalysisRequest

def run_founder_feasibility(request: StartupAnalysisRequest) -> FounderFeasibilityResult:
    """
    Agent 5: Founder Feasibility & Skill Gap Agent
    Evaluates founder readiness, technical/business alignment, and missing competencies.
    """
    skills = [s.lower() for s in request.founder.technical_skills]
    has_tech = any(s in ["python", "react", "coding", "ai", "engineering", "javascript"] for s in skills)
    
    tech_score = 92.0 if has_tech else 65.0
    biz_score = 70.0 if request.founder.business_experience != "Beginner" else 55.0
    fin_score = 80.0 if (request.founder.available_budget or 0) >= 50000 else 45.0
    
    overall = round((tech_score * 0.4 + biz_score * 0.3 + fin_score * 0.3) / 10, 1)
    
    gaps = [
        SkillGapItem(
            skill="Digital Marketing & Performance Ads",
            importance="High",
            current_status="Gap Identified",
            how_to_acquire="Utilize AI marketing generators or onboard a growth marketer co-founder."
        ),
        SkillGapItem(
            skill="B2B Sales & Enterprise Contracting",
            importance="Medium",
            current_status="Basic Knowledge",
            how_to_acquire="Leverage standard SaaS contract templates and start with warm network intros."
        )
    ]
    
    return FounderFeasibilityResult(
        founder_readiness_score=overall,
        technical_match_percent=tech_score,
        business_match_percent=biz_score,
        financial_match_percent=fin_score,
        skill_gaps=gaps,
        worklife_advice=f"Allocating {request.founder.available_hours_per_week} hours/week allows a strong 4-month MVP launch window. Focus initial energy on building the core product before broad marketing."
    )
