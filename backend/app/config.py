import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "StartupPilot AI"
    VERSION: str = "2.0.0"
    API_PREFIX: str = "/api"
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    DEFAULT_MODEL: str = "gemini-2.5-flash"
    DEFAULT_CURRENCY: str = "INR"

settings = Settings()

def get_gemini_client():
    """Initializes and returns Google GenAI client if GEMINI_API_KEY is available."""
    api_key = settings.GEMINI_API_KEY
    if not api_key:
        return None
    try:
        from google import genai
        return genai.Client(api_key=api_key)
    except Exception:
        return None
