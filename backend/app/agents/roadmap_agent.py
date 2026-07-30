from app.models.schemas import ImplementationRoadmapResult, RoadmapMilestone, StartupAnalysisRequest

def run_implementation_roadmap_agent(request: StartupAnalysisRequest) -> ImplementationRoadmapResult:
    """
    Agent 7: Implementation Roadmap Agent
    Generates a structured month-by-month execution milestone plan.
    """
    milestones = [
        RoadmapMilestone(
            month=1,
            phase_name="Idea Validation & Regional Supply Chain Setup",
            key_tasks=[
                "Finalize core feature specs and complete competitor benchmarking.",
                "Establish regional supplier contacts & inspect Noida/regional hub warehouse costs.",
                "Interview 25 target customers to validate core value proposition."
            ],
            expected_output="Validated Product Requirement Doc (PRD) & Initial Supplier Agreement",
            estimated_cost=15000.0
        ),
        RoadmapMilestone(
            month=2,
            phase_name="MVP Development & Glassmorphic UI Prototype",
            key_tasks=[
                "Build core web application / MVP service architecture.",
                "Integrate real-time tracking, payments, and voice control features.",
                "Conduct internal closed beta testing with 15 pilot users."
            ],
            expected_output="Functional MVP deployed on staging server",
            estimated_cost=25000.0
        ),
        RoadmapMilestone(
            month=3,
            phase_name="Public Beta & Initial Customer Acquisition",
            key_tasks=[
                "Launch public beta and execute targeted digital marketing campaign.",
                "Establish campus ambassador program & referral incentives.",
                "Gather customer feedback & optimize conversion funnel."
            ],
            expected_output="100 Active Users / Initial Revenue Traction",
            estimated_cost=20000.0
        ),
        RoadmapMilestone(
            month=4,
            phase_name="Monetization & Scaled Operations",
            key_tasks=[
                "Roll out premium subscription pricing models.",
                "Optimize regional supply chain to reduce unit cost by 15%.",
                "Apply to incubator programs and present investor pitch deck."
            ],
            expected_output="Repeat Revenue & Investor Pitch Deck Presentation",
            estimated_cost=15000.0
        )
    ]
    
    return ImplementationRoadmapResult(
        total_months=4,
        milestones=milestones,
        critical_path_warning="Ensure MVP testing is completed in Month 2 to prevent marketing budget burn before product-market fit."
    )
