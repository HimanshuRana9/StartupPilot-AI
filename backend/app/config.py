import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "StartupPilot AI"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    DEFAULT_MODEL: str = "gemini-2.5-flash"
    
    # Regional Arbitrage Defaults (INR / Global fallback benchmarks)
    DEFAULT_CURRENCY: str = "INR"
    
settings = Settings()
