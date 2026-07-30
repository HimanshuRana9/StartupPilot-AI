# StartupPilot AI — Autonomous Multi-Agent Startup Mentor & Regional Arbitrage Platform

> **StartupPilot AI** is an end-to-end, multi-agent AI application designed to evaluate, plan, and guide startup ideas from concept to investor readiness.

---

## 🌟 Why StartupPilot AI is Different from ChatGPT / Gemini

| Feature | ChatGPT / Gemini | **StartupPilot AI** |
| :--- | :--- | :--- |
| **Workflow** | Single conversational response | **Decomposes business into 8 specialized agent steps** |
| **Regional Arbitrage** | Generic location advice | **Human-level supply chain cost arbitrage (e.g. Noida vs Delhi)** |
| **Real-Time Data** | Static training context | **Live real-world news & market index scanner** |
| **Voice Interface** | Text-based prompt focus | **Hands-free Web Speech Voice Assistant with audio feedback** |
| **Deliverables** | Copy-paste text snippets | **Auto-generated PowerPoint (.pptx) & PDF Reports** |

---

## 🏗 System Architecture

```
StartupPilot-AI/
├── backend/                      # FastAPI Python Multi-Agent Backend
│   ├── app/
│   │   ├── main.py               # REST API & Voice Command endpoints
│   │   ├── agents/               # 8 Specialized Agents (Idea, Market, Competitor, Arbitrage, Founder, Funding, Roadmap, Pitch)
│   │   ├── tools/                # Live news scraper, yfinance, regional cost calculator, ReportLab PDF & python-pptx engines
│   │   └── models/               # Pydantic schemas
│   └── start.py                  # Backend server launcher
│
├── frontend/                     # Next.js 14 Glassmorphism Web App
│   ├── src/
│   │   ├── app/                  # Next.js pages & dashboard
│   │   ├── components/           # VoiceAssistant, ArbitrageCard, PitchDeckViewer, RealTimeTicker, Navbar
│   │   └── types/                # TypeScript interface definitions
│   └── tailwind.config.js
```

---

## 🚀 Quickstart Guide

### 1. Backend Setup (FastAPI Python)
```bash
cd backend
pip install -r requirements.txt
python start.py
```
*Backend runs on `http://127.0.0.1:8000`*

### 2. Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:3000`*

---

## 🤖 The 8 Specialized Agents

1. **Idea Validation Agent**: Analyzes core problem, proposed solution, innovation index, and execution risks.
2. **Live Market Research Agent**: Scrapes up-to-the-second Google News RSS feeds & calculates market CAGR growth.
3. **Competitor Intelligence Agent**: Identifies incumbents, pricing vulnerabilities, and unserved market gaps.
4. **Regional Supply Chain & Price Arbitrage Agent**: Evaluates real-world node cost differences (e.g., Sourcing in Noida with 68% lower rent & 26% lower power tariffs vs Retailing in Delhi to boost net margins by 26%+).
5. **Founder Feasibility Agent**: Evaluates founder readiness, technical/business skill gaps, and time commitment.
6. **Cost & Funding Advisor Agent**: Calculates unit economics, monthly burn rate, budget gap, and non-dilutive grant / bootstrap pathways.
7. **Implementation Roadmap Agent**: Generates a 4-month milestone execution timeline.
8. **Investor Readiness & Pitch Deck Agent**: Compiles an 8-slide PowerPoint presentation (`.pptx`) and PDF report.
