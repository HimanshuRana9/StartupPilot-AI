from typing import Dict, Any
from app.tools.financial_calculator import financial_calculator

def analyze_financials(
    revenue_per_unit: float = 250.0,
    cogs_per_unit: float = 110.0,
    monthly_fixed_costs: float = 45000.0,
    monthly_volume: int = 500,
    initial_capital: float = 150000.0
) -> Dict[str, Any]:
    """6. Financial Agent: Performs deterministic financial projections and unit economics."""
    metrics = financial_calculator.calculate_unit_economics(
        revenue_per_unit=revenue_per_unit,
        cogs_per_unit=cogs_per_unit,
        monthly_fixed_costs=monthly_fixed_costs,
        monthly_volume=monthly_volume,
        initial_capital=initial_capital
    )
    return metrics
