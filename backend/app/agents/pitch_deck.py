from app.models.schemas import InvestorReadinessResult, PitchSlide, StartupAnalysisRequest

def run_pitch_deck_agent(request: StartupAnalysisRequest, overall_score: float) -> InvestorReadinessResult:
    """
    Agent 8: Investor Readiness & Pitch Deck Generator Agent
    Generates 8 presentation slides and investor Q&A defense points.
    """
    slides = [
        PitchSlide(
            slide_number=1,
            title="The Problem",
            bullet_points=[
                f"Existing options in the {request.idea} space are expensive, slow, and lack hyper-local efficiency.",
                "Founders and regional buyers face high operational overhead and fragmented supply chains.",
                "Lack of automated multi-agent AI tools for end-to-end execution."
            ],
            key_takeaway="A massive market pain point waiting for automated, regional cost-optimized innovation."
        ),
        PitchSlide(
            slide_number=2,
            title="The Solution & Value Proposition",
            bullet_points=[
                f"An autonomous platform for {request.idea} leveraging AI agents and real-world price arbitrage.",
                "Voice assistant interface for hands-free interactive decision making.",
                "Reduces operational costs by up to 35% through human-level regional supply chain optimization."
            ],
            key_takeaway="Superior speed, lower cost, and unprecedented founder-friendly execution."
        ),
        PitchSlide(
            slide_number=3,
            title="Market Opportunity & TAM",
            bullet_points=[
                "Global Market Size: $8.4B+ with 21.4% annual CAGR growth.",
                "Immediate Addressable Market: Tier-1 & Tier-2 metro regional hubs (Delhi NCR, Noida, Bengaluru).",
                "Favorable demographic shift towards automated D2C and SaaS workflows."
            ],
            key_takeaway="High-growth sector with expanding regional spending power."
        ),
        PitchSlide(
            slide_number=4,
            title="Competitive Edge & Arbitrage Advantage",
            bullet_points=[
                "Unlocks location price arbitrage (e.g. Sourcing in Noida vs Selling in Delhi).",
                "AI Multi-Agent orchestrator replaces expensive human consulting teams.",
                "Integrated pitch deck, financial forecasting, and voice assistant UI."
            ],
            key_takeaway="Unmatched cost structure and rapid market entry advantage."
        ),
        PitchSlide(
            slide_number=5,
            title="Business & Revenue Model",
            bullet_points=[
                "Freemium Core: Free initial validation report and basic roadmap.",
                "Pro Subscription: ₹999/month for full multi-agent analytics & PPT/PDF export.",
                "Enterprise/Regional Licensing: B2B regional partnerships & customized supply chain workflows."
            ],
            key_takeaway="Predictable high-margin recurring SaaS & transactional revenue."
        ),
        PitchSlide(
            slide_number=6,
            title="Financial Projections & Unit Economics",
            bullet_points=[
                "Unit Cost: ₹42 | Selling Price: ₹120 | Gross Margin: ~65%.",
                "Year 1 Revenue Target: ₹45 Lakhs with 1,200 paying subscribers.",
                "Break-even Horizon: Month 5 post MVP launch."
            ],
            key_takeaway="Strong unit economics and rapid path to profitability."
        ),
        PitchSlide(
            slide_number=7,
            title="Execution Roadmap",
            bullet_points=[
                "Month 1: Idea Validation & Supplier Agreements.",
                "Month 2: MVP Development & Closed Beta.",
                "Month 3: Public Launch & Campus Ambassador Network.",
                "Month 4+: Revenue Scaling & Investor Pre-Seed Funding."
            ],
            key_takeaway="Disciplined 4-month milestone path to market dominance."
        ),
        PitchSlide(
            slide_number=8,
            title="The Ask & Funding Use",
            bullet_points=[
                "Seeking Pre-Seed Funding / Incubation Support of ₹15 - ₹25 Lakhs.",
                "50% Product & AI Infrastructure, 35% Customer Acquisition, 15% Regional Operations.",
                "Targeting 10x ROI for early seed partners within 24 months."
            ],
            key_takeaway="Partner with us to transform regional business execution."
        )
    ]
    
    qa_prep = {
        "What is your moat against ChatGPT or generic LLMs?": "Our system is a multi-agent orchestrator with live real-world news integration, regional cost arbitrage data (Noida vs Delhi tariffs), automated pitch deck generators, and a voice assistant UI. ChatGPT is a general text box; StartupPilot AI is an execution platform.",
        "How do you optimize your customer acquisition cost (CAC)?": "We leverage campus ambassador networks, localized organic SEO, and hyper-targeted digital channels, keeping CAC under ₹150 per user.",
        "Why operate out of regional nodes like Noida or Hosur?": "Operating out of Noida provides 68% lower commercial rent and 26% lower power tariffs compared to Delhi, directly boosting net profit margins."
    }
    
    return InvestorReadinessResult(
        investor_readiness_score=round(overall_score * 9.2, 1),
        deck_slides=slides,
        investor_qa_prep=qa_prep
    )
