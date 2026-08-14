from typing import Dict, Any

class FinancialCalculator:
    """
    Deterministic Unit Economics & Financial Calculator.
    Computes exact financial metrics, break-even volumes, and cash runway projections.
    """
    def calculate_unit_economics(
        self,
        revenue_per_unit: float = 250.0,
        cogs_per_unit: float = 110.0,
        monthly_fixed_costs: float = 45000.0,
        monthly_volume: int = 500,
        initial_capital: float = 150000.0
    ) -> Dict[str, Any]:
        
        rev = max(1.0, revenue_per_unit)
        cogs = max(0.0, cogs_per_unit)
        vol = max(1, monthly_volume)
        fixed = max(0.0, monthly_fixed_costs)
        capital = max(1000.0, initial_capital)

        # Per Unit Economics
        gross_profit_per_unit = round(rev - cogs, 2)
        gross_margin_pct = round((gross_profit_per_unit / rev) * 100, 1)

        # Monthly Projections
        monthly_revenue = round(rev * vol, 2)
        monthly_cogs = round(cogs * vol, 2)
        monthly_gross_profit = round(monthly_revenue - monthly_cogs, 2)
        monthly_net_profit = round(monthly_gross_profit - fixed, 2)
        net_margin_pct = round((monthly_net_profit / monthly_revenue) * 100, 1) if monthly_revenue > 0 else 0.0

        # Break-Even Calculations
        break_even_units = int(fixed / gross_profit_per_unit) if gross_profit_per_unit > 0 else 999999
        break_even_revenue = round(break_even_units * rev, 2)

        # CAC & LTV Projections
        estimated_cac = round(rev * 0.25, 2)  # ~25% of ARPU
        estimated_ltv = round(rev * 3.5, 2)    # ~3.5x customer lifespan multiplier
        ltv_cac_ratio = round(estimated_ltv / estimated_cac, 2) if estimated_cac > 0 else 3.5

        # Runway & ROI
        monthly_burn = fixed if monthly_net_profit < 0 else 0.0
        runway_months = round(capital / monthly_burn, 1) if monthly_burn > 0 else 24.0
        annual_profit = monthly_net_profit * 12.0
        annual_roi_pct = round((annual_profit / capital) * 100, 1) if capital > 0 else 0.0

        return {
            "unit_metrics": {
                "revenue_per_unit": rev,
                "cogs_per_unit": cogs,
                "gross_profit_per_unit": gross_profit_per_unit,
                "gross_margin_percent": gross_margin_pct
            },
            "monthly_totals": {
                "revenue": monthly_revenue,
                "cogs": monthly_cogs,
                "gross_profit": monthly_gross_profit,
                "fixed_operating_costs": fixed,
                "net_profit": monthly_net_profit,
                "net_margin_percent": net_margin_pct
            },
            "break_even": {
                "units_required": break_even_units,
                "revenue_required": break_even_revenue
            },
            "unit_economics": {
                "cac": estimated_cac,
                "ltv": estimated_ltv,
                "ltv_cac_ratio": ltv_cac_ratio
            },
            "capital_runway": {
                "initial_capital": capital,
                "monthly_burn": monthly_burn,
                "runway_months": runway_months,
                "annualized_roi_percent": annual_roi_pct
            }
        }

financial_calculator = FinancialCalculator()
