import pandas as pd
from typing import Dict, Any, List

LOCATION_PROFILES: List[Dict[str, Any]] = [
    {
        "city": "Delhi",
        "state": "Delhi NCR",
        "industrial_rent": 35.0,     # INR/sqft/month
        "warehouse_rent": 28.0,      # INR/sqft/month
        "electricity": 8.50,         # INR/kWh
        "labor_cost": 450.0,         # INR/day
        "tax_rebate": 0.0,           # % subsidy
        "raw_material_access": 85.0, # Index /100
        "cluster_type": "High-Demand Consumer Hub"
    },
    {
        "city": "Noida",
        "state": "Uttar Pradesh",
        "industrial_rent": 22.0,
        "warehouse_rent": 15.0,
        "electricity": 6.20,
        "labor_cost": 320.0,
        "tax_rebate": 15.0,
        "raw_material_access": 90.0,
        "cluster_type": "Electronics & Light Mfg Hub"
    },
    {
        "city": "Greater Noida",
        "state": "Uttar Pradesh",
        "industrial_rent": 18.0,
        "warehouse_rent": 12.0,
        "electricity": 5.80,
        "labor_cost": 280.0,
        "tax_rebate": 20.0,
        "raw_material_access": 85.0,
        "cluster_type": "Heavy Industrial & Logistics Park"
    },
    {
        "city": "Gurugram",
        "state": "Haryana",
        "industrial_rent": 38.0,
        "warehouse_rent": 30.0,
        "electricity": 8.00,
        "labor_cost": 470.0,
        "tax_rebate": 0.0,
        "raw_material_access": 85.0,
        "cluster_type": "Corporate & Tech Hardware Hub"
    },
    {
        "city": "Mumbai",
        "state": "Maharashtra",
        "industrial_rent": 45.0,
        "warehouse_rent": 38.0,
        "electricity": 9.00,
        "labor_cost": 500.0,
        "tax_rebate": 0.0,
        "raw_material_access": 95.0,
        "cluster_type": "Financial & Metro Consumer Center"
    },
    {
        "city": "Pune",
        "state": "Maharashtra",
        "industrial_rent": 28.0,
        "warehouse_rent": 22.0,
        "electricity": 7.00,
        "labor_cost": 380.0,
        "tax_rebate": 10.0,
        "raw_material_access": 85.0,
        "cluster_type": "Automotive & Engineering Cluster"
    },
    {
        "city": "Nashik",
        "state": "Maharashtra",
        "industrial_rent": 16.0,
        "warehouse_rent": 11.0,
        "electricity": 5.50,
        "labor_cost": 260.0,
        "tax_rebate": 18.0,
        "raw_material_access": 80.0,
        "cluster_type": "Agri-Processing & Industrial Hub"
    },
    {
        "city": "Bengaluru",
        "state": "Karnataka",
        "industrial_rent": 40.0,
        "warehouse_rent": 32.0,
        "electricity": 8.00,
        "labor_cost": 480.0,
        "tax_rebate": 5.0,
        "raw_material_access": 80.0,
        "cluster_type": "Tech SaaS & Hardware R&D Hub"
    },
    {
        "city": "Hosur",
        "state": "Tamil Nadu",
        "industrial_rent": 20.0,
        "warehouse_rent": 14.0,
        "electricity": 6.10,
        "labor_cost": 290.0,
        "tax_rebate": 20.0,
        "raw_material_access": 85.0,
        "cluster_type": "SIPCOT Industrial Manufacturing Park"
    },
    {
        "city": "Hyderabad",
        "state": "Telangana",
        "industrial_rent": 30.0,
        "warehouse_rent": 24.0,
        "electricity": 7.50,
        "labor_cost": 400.0,
        "tax_rebate": 10.0,
        "raw_material_access": 80.0,
        "cluster_type": "Pharma & Tech Cluster"
    },
    {
        "city": "Chennai",
        "state": "Tamil Nadu",
        "industrial_rent": 32.0,
        "warehouse_rent": 26.0,
        "electricity": 7.80,
        "labor_cost": 420.0,
        "tax_rebate": 5.0,
        "raw_material_access": 85.0,
        "cluster_type": "Port Logistics & Auto Hub"
    },
    {
        "city": "Sriperumbudur",
        "state": "Tamil Nadu",
        "industrial_rent": 19.0,
        "warehouse_rent": 13.0,
        "electricity": 6.00,
        "labor_cost": 285.0,
        "tax_rebate": 18.0,
        "raw_material_access": 85.0,
        "cluster_type": "Electronics & Industrial Corridor"
    },
    {
        "city": "Ahmedabad",
        "state": "Gujarat",
        "industrial_rent": 20.0,
        "warehouse_rent": 16.0,
        "electricity": 6.00,
        "labor_cost": 300.0,
        "tax_rebate": 15.0,
        "raw_material_access": 90.0,
        "cluster_type": "Textile & Chemicals Hub"
    }
]

# Simplified distance matrix (in km) between key pairs
DISTANCE_MATRIX: Dict[tuple, float] = {
    ("Delhi", "Noida"): 25.0,
    ("Delhi", "Greater Noida"): 42.0,
    ("Delhi", "Gurugram"): 30.0,
    ("Mumbai", "Pune"): 148.0,
    ("Mumbai", "Nashik"): 166.0,
    ("Bengaluru", "Hosur"): 38.0,
    ("Chennai", "Sriperumbudur"): 40.0,
    ("Hyderabad", "Secunderabad"): 12.0,
    ("Ahmedabad", "Surat"): 260.0
}

def get_location_dataframe() -> pd.DataFrame:
    """Returns the regional location profiles as a pandas DataFrame."""
    return pd.DataFrame(LOCATION_PROFILES)

def get_distance_km(city1: str, city2: str) -> float:
    """Gets distance in kilometers between two cities."""
    key = (city1, city2)
    reverse_key = (city2, city1)
    if key in DISTANCE_MATRIX:
        return DISTANCE_MATRIX[key]
    if reverse_key in DISTANCE_MATRIX:
        return DISTANCE_MATRIX[reverse_key]
    if city1.lower() == city2.lower():
        return 5.0
    return 120.0  # Default average regional transport distance
