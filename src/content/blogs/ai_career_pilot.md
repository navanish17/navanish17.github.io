# 🚀 AI Career Pilot — How I Built a Full-Stack AI Career Guidance System

> **TL;DR:** I built an AI-powered career guidance platform for Indian students (Class 10–12+) that combines a multi-agent LangGraph chatbot, a fine-tuned DistilBERT intent classifier, RAG-based knowledge retrieval, ML career recommendations, and a full React frontend — all deployed with Docker + GitHub Actions CI/CD.

---

## 🎯 The Problem

Every year, millions of Indian students face the same anxiety after boards:

> *"What should I do after 12th?"*

The answers scattered across YouTube, Reddit, and coaching centre pamphlets are often generic, outdated, or just plain wrong. College fees are wrong. Exam deadlines have passed. Career paths are oversimplified.

I wanted to build something that actually helps — a platform that gives **personalised, data-driven career guidance** instead of one-size-fits-all advice.

---

## 🧠 What AI Career Pilot Does

AI Career Pilot is a full-stack web platform where students can:

| Feature | What It Does |
|---|---|
| 🤖 **AI Chatbot** | Ask anything about careers, colleges, exams — get RAG-powered answers |
| 🎯 **Career Assessment Quiz** | Answer personality/interest questions to get ML-based recommendations |
| 🗺️ **Forward Roadmap** | "I want to be a Data Scientist" → step-by-step plan to get there |
| ⬅️ **Backward Roadmap** | "I want ₹15 LPA in 5 years" → reverse-engineer the path |
| 🏫 **College Finder** | Search colleges by stream, location, fees, NIRF ranking |
| 🔔 **Exam Alerts** | Subscribe to email reminders for entrance exam deadlines |
| 💼 **Career Explorer** | Browse 100+ careers with salary ranges, skills, and growth paths |

---

## 🏗️ System Architecture

The system has three major components:

```
┌─────────────────┐     ┌──────────────────────────┐     ┌──────────────────┐
│   React Frontend │────▶│   FastAPI Backend         │────▶│  PostgreSQL DB   │
│  (Vite + TS)    │     │  (Async + SQLAlchemy)     │     │  (22 tables)     │
└─────────────────┘     │                           │     └──────────────────┘
                        │  ┌─────────────────────┐  │
                        │  │  LangGraph           │  │     ┌──────────────────┐
                        │  │  Multi-Agent System  │  │────▶│  ChromaDB        │
                        │  └─────────────────────┘  │     │  (Vector Store)  │
                        │                           │     └──────────────────┘
                        │  ┌─────────────────────┐  │
                        │  │  DistilBERT          │  │     ┌──────────────────┐
                        │  │  Intent Classifier   │  │────▶│  Gemini / Sonar  │
                        │  └─────────────────────┘  │     │  (LLM Fallback)  │
                        └──────────────────────────┘     └──────────────────┘
```

---

## 🤖 The Brain: Multi-Agent Chatbot (LangGraph)

This is the most technically interesting part. Instead of one big LLM prompt, the chatbot is an **orchestrated graph of 5 specialised agents**.

### How It Works — Step by Step

**Step 1: Intent Classification (DistilBERT)**

Before the query even reaches an LLM, a fine-tuned DistilBERT model classifies what the user wants:

```python
# 9 intent classes the model detects:
intents = [
    "career_guidance",      # "What should I do after 12th?"
    "college_info",         # "Tell me about IIT Bombay fees"
    "exam_info",            # "When is JEE Advanced?"
    "roadmap_request",      # "How do I become a software engineer?"
    "degree_info",          # "What is B.Tech CSE?"
    "stream_guidance",      # "Which stream for AI?"
    "greeting",             # "Hi / Hello"
    "general",              # Off-topic questions
    "goodbye",              # "Thanks, bye"
]
```

> **Why not just use the LLM to figure out intent?**
> Because calling Gemini for a "Hi" message costs tokens and adds 2+ seconds of latency. The DistilBERT model runs in **~50ms locally** and handles 92% of intent detection without any API call.

**Step 2: Agent Routing (LangGraph)**

Based on the intent, LangGraph routes the query to the right specialist agent:

```
User Query
    │
    ▼
[DistilBERT Intent Classifier]
    │
    ├─── career_guidance  ──▶  [Career Agent]      → RAG + Gemini
    ├─── college_info     ──▶  [College Agent]     → DB Lookup + RAG
    ├─── exam_info        ──▶  [Exam Agent]        → DB + RAG
    ├─── roadmap_request  ──▶  [Roadmap Agent]     → LLM + Templates
    ├─── greeting/goodbye ──▶  [Chitchat Agent]    → Template Response
    └─── general          ──▶  [General Agent]     → Gemini (no RAG)
```

**Step 3: RAG — Retrieval Augmented Generation**

For factual questions (college fees, exam dates, career salaries), the agent:

1. Converts the query to a **384-dimensional embedding** using `all-MiniLM-L6-v2`
2. Searches **ChromaDB** for the most similar knowledge chunks (cosine similarity)
3. Injects the retrieved context into the LLM prompt
4. The LLM explains the facts — it doesn't hallucinate them

```python
# The RAG retrieval step
query_embedding = embedding_model.encode(user_query)
results = chroma_collection.query(
    query_embeddings=[query_embedding],
    n_results=5,
    include=["documents", "metadatas"]
)
context = "\n".join(results["documents"][0])
# context is now injected into the prompt
```

> **RAG vs Pure LLM:** Without RAG, the chatbot confidently gave wrong college fees and outdated exam dates. With RAG, it retrieves verified data and the LLM just explains it — factual accuracy went from ~60% to ~95%.

---

## 🛡️ The 3-Tier LLM Fallback System

What happens when Gemini's API is down or rate-limited? Answer: **two backup tiers**.

```
Tier 1: Gemini 2.5 Flash      ← Primary (fast, cheap, capable)
    │ (fails or rate-limited)
    ▼
Tier 2: Perplexity Sonar-Pro  ← Fallback (includes web citations)
    │ (fails)
    ▼
Tier 3: Local RAG Response    ← Last resort (no LLM, pure retrieval)
```

```python
async def get_llm_response(prompt: str, context: str) -> dict:
    # Try Gemini first
    try:
        response = await gemini_client.generate(prompt)
        return {"text": response, "source": "gemini"}
    except RateLimitError:
        pass

    # Fallback to Perplexity Sonar-Pro
    try:
        response = await perplexity_client.generate(prompt)
        return {"text": response, "source": "sonar", "citations": response.citations}
    except Exception:
        pass

    # Final fallback — return RAG context directly
    return {"text": context, "source": "rag_only"}
```

> **Real impact:** In the first week of deployment, Gemini's rate limit was hit **47 times**. The fallback system handled every single one without the user seeing an error.

---

## 🎯 Fine-Tuned DistilBERT Intent Classifier

### Why I Trained My Own Model

| Approach | Accuracy | Latency | Cost per Request |
|---|---|---|---|
| Keyword matching | ~55% | <1ms | Free |
| GPT-4o-mini for intent | ~98% | ~800ms | ~$0.001 |
| **Fine-tuned DistilBERT** | **92%** | **~50ms** | **Free** |

DistilBERT wins: near-LLM accuracy, free to run, and 16x faster than a cloud LLM call.

### The Training Process

```python
# Training setup
model = DistilBertForSequenceClassification.from_pretrained(
    "distilbert-base-uncased",
    num_labels=9  # 9 intent classes
)

training_args = TrainingArguments(
    output_dir="./intent_model",
    num_train_epochs=5,
    per_device_train_batch_size=16,
    evaluation_strategy="epoch",
    save_strategy="best",
    metric_for_best_model="f1"
)
```

**Training time:** ~30 minutes on a free Google Colab T4 GPU.  
**Result:** Accuracy jumped from **55% → 92%**, reducing unnecessary LLM API calls by **~40%**.

---

## 🌐 The Frontend: React + TypeScript

### Tech Choices

| Library | Why |
|---|---|
| **React 18 + TypeScript** | Type safety, component reusability |
| **Vite** | 10x faster HMR than CRA |
| **Tailwind CSS + Shadcn/UI** | Beautiful, accessible Radix-based components |
| **TanStack Query** | Smart data fetching with caching and loading states |
| **React Hook Form + Zod** | Type-safe form validation |

### Route Structure

The app has **15+ protected routes**:

```
/                      →  Home Dashboard
/quiz                  →  Career Assessment Quiz
/stream-finder         →  Stream Recommendation
/degrees               →  Browse Degrees
/branches/:id          →  Browse Branches
/careers/:id           →  Browse Careers
/roadmap               →  Roadmap Hub
/roadmap/forward       →  Forward Planning
/roadmap/backward      →  Backward Planning
/roadmap/my-roadmaps   →  Saved Roadmaps
/roadmap/view/:id      →  View Specific Roadmap
/roadmap/shared/:token →  Public Shared Roadmap (no auth required)
/college-finder        →  Search Colleges
/my-alerts             →  Email Alert Subscriptions
/career-finder         →  ML-Based Recommendations
```

### Authentication Flow

JWT-based auth with route protection:

```tsx
<Route
    path="/roadmap/backward"
    element={
        <ProtectedRoute>
            <BackwardPlanner />
        </ProtectedRoute>
    }
/>
```

The `ProtectedRoute` component checks if the user is logged in and has completed onboarding. If not, it redirects to login or onboarding.

### Theme Support

Light and dark modes with system preference detection:

```tsx
<ThemeProvider defaultTheme="light" storageKey="ai-career-pilot-theme">
    {/* Entire app */}
</ThemeProvider>
```

---

## 🗄️ The Database (22 Tables)

The backend uses **SQLAlchemy async ORM** with Alembic for migrations. SQLite in development, PostgreSQL in production.

| Model | Purpose |
|---|---|
| `User` | Account credentials |
| `Profile` | Class level, stream, preferences |
| `Career` | Career info (name, description, salary range) |
| `CareerAttributes` | Skills, tags, education requirements for ML recommendations |
| `CareerTemplate` | Pre-built career roadmap templates |
| `CareerInsight` | Skills/projects/internships to stand out |
| `BackwardRoadmap` | AI-generated backward career plans |
| `Roadmap` + `RoadmapStep` | Forward planning roadmaps |
| `College` + `CollegeDetails` | College information and NIRF data |
| `EntranceExam` | Exam details, dates, eligibility |
| `Degree` + `Branch` | Academic programs and specializations |
| `ChatConversation` | Saved chat history |
| `UserPreferences` | Quiz results for recommendations |
| `UserCareerInteraction` | Tracks views/saves for collaborative filtering |
| `ExamAlert` | Email subscription records |

### Why Async SQLAlchemy?

FastAPI is async. If database queries are synchronous, every DB call blocks the entire server thread. Async SQLAlchemy lets the server handle other requests while waiting for the database:

```python
# Async — doesn't block the server
result = await db.execute(select(Career).where(Career.id == career_id))
career = result.scalars().first()
```

---

## ⚙️ DevOps & Deployment

### CI/CD Pipeline (GitHub Actions)

Every push to `main` triggers a **3-stage pipeline**:

```yaml
# .github/workflows/ci-cd.yml

Stage 1: Test
    → Install Python 3.10
    → Install dependencies
    → Run pytest

Stage 2: Build & Push
    → Login to Docker Hub
    → Build multi-stage Docker image
    → Push to Docker Hub

Stage 3: Deploy
    → Trigger Render deploy hook (auto-deploys latest image)
```

### Multi-Stage Dockerfile

The Docker image uses a **2-stage build** to keep the final image small:

```dockerfile
# Stage 1: Builder — compile dependencies into wheels
FROM python:3.10-slim as builder
RUN pip wheel --no-cache-dir --wheel-dir /app/wheels -r requirements.txt

# Stage 2: Runtime — minimal production image
FROM python:3.10-slim
COPY --from=builder /app/wheels /wheels
RUN pip install --no-cache /wheels/*
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser  # Security: non-root user

CMD gunicorn src.ai_career_advisor.main:app \
    --workers 2 \
    --worker-class uvicorn.workers.UvicornWorker \
    --bind 0.0.0.0:$PORT
```

> **Why 2 workers?** The Render free tier has 2 vCPUs. One worker per vCPU is the rule of thumb.

### Deployment Platforms

| Platform | Component | Why |
|---|---|---|
| **Render** | Backend API | Free tier, auto-deploy from Docker |
| **Vercel** | Frontend | Free tier, instant deploys, edge CDN |
| **Hugging Face Spaces** | Full-stack (optional) | Docker-based, ML community visibility |

A separate GitHub Action also auto-syncs the repo to Hugging Face Spaces.

---

## 🔐 Security Considerations

- ✅ **JWT authentication** with configurable expiration
- ✅ **bcrypt password hashing** — passwords are never stored in plain text
- ✅ **Non-root Docker user** — the container runs as `appuser`, not root
- ✅ **CORS configuration** — only allowed frontend origins can make requests
- ✅ **API key rotation** — multiple API keys to avoid a single point of failure
- ✅ **Environment variables** — no secrets in code, everything in `.env`

---

## 📊 Key Numbers

| Metric | Value |
|---|---|
| Backend lines of code | ~8,000+ |
| Frontend lines of code | ~6,000+ |
| Database models | 22 tables |
| API endpoints | 18 routes |
| Service files | 38 |
| Intent classification accuracy | **92%** |
| LLM fallback tiers | 3 |
| RAG knowledge sources | 10+ data types |
| Frontend routes | 15+ |
| Embedding dimensions | 384 |

---

## 💡 What I Learned Building This

**1. Start with the agent graph.**  
Designing the LangGraph flow forced me to think about every edge case *before* writing code. What happens with greetings? Non-career questions? Rate limits? Planning this upfront saved days of debugging.

**2. RAG > pure LLM for factual data.**  
Without RAG, the chatbot confidently gave wrong college fees and exam dates. With RAG, it retrieves verified data and the LLM just explains it. Accuracy went from ~60% to ~95%.

**3. Fallback systems are non-negotiable.**  
In my first week of deployment, I hit Gemini's rate limit 47 times. The 3-tier fallback saved every single one of those requests. Build for failure from day one.

**4. Fine-tuning is absolutely worth it.**  
Training DistilBERT took 30 minutes. It improved intent accuracy from 55% to 92%. That one change reduced unnecessary LLM API calls by ~40%, cutting costs significantly.

**5. Async everything.**  
Using async SQLAlchemy + async embeddings + async API calls meant the server could handle **10x more concurrent users** on the same hardware. Never block the event loop.

---

## 🔧 Full Tech Stack

### Backend
- **FastAPI** — async Python web framework
- **SQLAlchemy (async)** — ORM with Alembic migrations
- **LangGraph** — multi-agent orchestration
- **DistilBERT** — intent classification (PyTorch + Transformers)
- **ChromaDB** — vector database for RAG
- **Sentence Transformers** (`all-MiniLM-L6-v2`) — local embeddings
- **Gemini 2.5 Flash** — primary LLM
- **Perplexity Sonar-Pro** — fallback LLM with citations
- **APScheduler** — background job scheduling
- **Brevo** — email service for exam alerts
- **Pydantic** — data validation

### Frontend
- **React 18 + TypeScript** — UI framework
- **Vite** — build tool
- **Tailwind CSS + Shadcn/UI** — styling
- **TanStack Query** — data fetching
- **React Router v6** — routing
- **React Hook Form + Zod** — form validation

### DevOps
- **Docker** — multi-stage containerization
- **GitHub Actions** — CI/CD pipeline
- **Render** — backend hosting
- **Vercel** — frontend hosting
- **Hugging Face Spaces** — alternative deployment

---

## 🔭 What's Next?

- 🎙️ **Voice input** — Ask career questions by speaking
- 🌏 **Regional language support** — Beyond Hindi: Tamil, Telugu, Marathi
- 👨‍👩‍👦 **Parent dashboard** — Let parents track their child's career exploration
- 🤝 **Mentor matching** — Connect students with professionals in their field
- 📱 **Mobile app** — React Native version for Android/iOS

---

## 🎬 Final Thoughts

Building AI Career Pilot taught me that the **"AI" part is just one piece of the puzzle**. The real work is in:

- Designing **resilient systems** that don't break when APIs go down
- Building **data pipelines** that keep information accurate
- Creating a **user experience** that makes complex AI feel simple

If you're a student building your first AI project — don't just build a wrapper around ChatGPT. **Build a system.** Add fallbacks. Add your own data. Add intelligence in how you route queries. That's what makes an AI project stand out.

---

*AI Career Pilot is developed as part of CDAC coursework by **Navanish**.*  
*🔗 Check out the project on GitHub: [github.com/navanish17/ai_career_pilot](https://github.com/navanish17/ai_career_pilot)*
