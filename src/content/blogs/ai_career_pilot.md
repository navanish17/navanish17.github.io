# AI Career Pilot — What I Built, How It Works, and What I Learned

Every year, millions of Indian students face the same overwhelming question after boards: "What should I do after 12th?" The answers they find are scattered, generic, and often outdated. Wrong college fees. Expired exam deadlines. Career paths reduced to "do engineering or medicine."

I wanted to build something that actually helps. So I built AI Career Pilot — a full-stack career guidance platform for students, powered by a multi-agent AI backend.

This post is about how it works under the hood.

[Watch the live demo →](https://www.linkedin.com/posts/navanish_cdac-activity-7427166398705045504-9Nlg?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAACiEyEEB1c79atMF9F0FVLvN6iW6INSxX8U)

---

## The Problem With Most AI Career Tools

Most "AI career guidance" tools are just a wrapper around ChatGPT with a nice UI. You ask a question, it hallucinates an answer, and you leave more confused than before.

The real problem is factual accuracy. Which colleges offer B.Tech in AI? What are the actual fees at VIT Vellore? When does JEE Advanced registration open? A general-purpose LLM doesn't know these things reliably — it guesses, and it sounds confident doing it.

I needed a system that retrieves real data, not one that makes it up.

---

## What the App Does

At a high level, students can:

- Ask career questions through an AI chatbot
- Take a personality/interest quiz to get ML-based career recommendations
- Build a forward roadmap ("I want to be a Data Scientist — what's the path?")
- Build a backward roadmap ("I want ₹15 LPA in 5 years — how do I get there?")
- Search colleges by stream, fees, NIRF ranking, and location
- Subscribe to email reminders for entrance exam deadlines
- Browse 100+ careers with salary ranges, required skills, and growth paths

---

## The AI Architecture

### Multi-Agent System with LangGraph

Instead of one big LLM prompt that tries to handle everything, the chatbot is an orchestrated graph of five specialized agents — one for career guidance, one for college info, one for exam details, one for roadmaps, and one for general chitchat.

LangGraph handles the orchestration. Each agent only runs when its specific intent is detected.

### Intent Classification with DistilBERT

Before anything reaches an LLM, a fine-tuned DistilBERT model classifies what the user actually wants. Is this a career question? A college query? A greeting? A roadmap request?

This matters for two reasons. First, routing the query to the right agent gives better answers. Second, not every query needs a $0.001 LLM API call — a "Hi" message should be handled locally in milliseconds.

I trained the model on labeled examples across 9 intent classes. Training took about 30 minutes on a free Colab T4 GPU. The result was 92% accuracy, up from around 55% with the keyword matching I had before. More importantly, it cut unnecessary API calls by roughly 40%.

```python
intents = [
    "career_guidance",
    "college_info",
    "exam_info",
    "roadmap_request",
    "degree_info",
    "stream_guidance",
    "greeting",
    "general",
    "goodbye",
]
```

### RAG for Factual Accuracy

For factual questions — college fees, exam dates, career salaries — each agent pulls relevant context from ChromaDB before calling the LLM.

The flow is straightforward:

1. Convert the query into a 384-dimensional embedding using `all-MiniLM-L6-v2`
2. Search ChromaDB for the most similar knowledge chunks
3. Inject those chunks into the LLM prompt as context
4. Let the LLM explain the facts rather than invent them

```python
query_embedding = embedding_model.encode(user_query)
results = chroma_collection.query(
    query_embeddings=[query_embedding],
    n_results=5,
    include=["documents", "metadatas"]
)
context = "\n".join(results["documents"][0])
# context is injected into the prompt
```

Before adding RAG, the chatbot would give wrong college fees and outdated exam schedules. Confidently. After RAG, factual accuracy went from around 60% to around 95%. The LLM still formats and explains the answer — it just isn't making up the data anymore.

### 3-Tier LLM Fallback

What happens when Gemini's rate limit kicks in? The first week of deployment, it hit 47 times.

I built a three-tier fallback:

1. **Gemini 2.5 Flash** — primary. Fast and cheap.
2. **Perplexity Sonar-Pro** — used when Gemini is unavailable. Returns web citations alongside the answer.
3. **Pure RAG response** — last resort. Returns the retrieved context directly with no LLM call at all.

Every one of those 47 rate limit hits was handled without the user seeing an error.

---

## The Database

The backend uses async SQLAlchemy with PostgreSQL in production and SQLite in development. Alembic handles migrations.

There are 22 tables in total. The key ones:

| Model | Purpose |
|---|---|
| User, Profile | Authentication and onboarding data |
| Career, CareerAttributes | Career info and skills for ML recommendations |
| CareerTemplate, CareerInsight | Pre-built roadmap templates and standing-out advice |
| College, CollegeDetails | College data including NIRF rankings |
| EntranceExam | Exam details, eligibility, important dates |
| Roadmap, RoadmapStep | Forward career plans |
| BackwardRoadmap | AI-generated backward plans |
| ChatConversation | Saved chat history |
| UserPreferences | Quiz results used for recommendations |
| ExamAlert | Email subscription records |

Everything is async. FastAPI is async by design, and if database queries are synchronous, each one blocks the server thread. Async SQLAlchemy lets the server handle other requests while waiting on the database.

```python
# doesn't block the server thread
result = await db.execute(select(Career).where(Career.id == career_id))
career = result.scalars().first()
```

---

## The Frontend

The frontend is React 18 with TypeScript, built with Vite, styled using Tailwind CSS and Shadcn/UI components. TanStack Query handles data fetching with caching and background refetching. Forms use React Hook Form with Zod validation.

There are 15+ routes, most of them protected by JWT authentication. A `ProtectedRoute` component checks both login status and onboarding completion before rendering a page.

---

## DevOps

Every push to `main` goes through a three-stage GitHub Actions pipeline:

1. Run pytest
2. Build a multi-stage Docker image and push to Docker Hub
3. Trigger the Render deploy hook

The Dockerfile uses a two-stage build — a builder stage that compiles Python wheels, and a minimal runtime stage that only copies those wheels. The container runs as a non-root user.

The backend is deployed on Render. The frontend is on Vercel. There's also a separate Action that syncs the repo to Hugging Face Spaces.

---

## Numbers

| What | How much |
|---|---|
| Backend code | ~8,000 lines |
| Frontend code | ~6,000 lines |
| Database tables | 22 |
| API endpoints | 18 |
| Service files | 38 |
| Intent classification accuracy | 92% |
| LLM fallback tiers | 3 |
| Frontend routes | 15+ |

---

## What I Actually Learned

**Design the agent graph before writing any code.** I sketched out every node and edge in LangGraph before touching the Python. What happens with greetings? Off-topic questions? When the intent classifier is uncertain? Thinking through these edge cases upfront saved a lot of debugging later.

**RAG is not optional if accuracy matters.** I originally thought I'd use a fine-tuned LLM for career queries. Switched to RAG early on and it was the right call — retrieval gives you explainability and accuracy that a general LLM just can't match for specific factual domains.

**Fallbacks are infrastructure, not polish.** I added the three-tier fallback after hitting a rate limit in production on day one. It should have been there from the start. Any production AI system that doesn't handle API failures will fail publicly.

**Fine-tuning a small model is worth it.** DistilBERT went from 55% to 92% accuracy with 30 minutes of training. It runs locally in ~50ms and costs nothing per request. Sometimes a small specialized model beats sending everything to a big expensive one.

**Async pays off.** Making the database layer, embeddings, and API calls all async meant the server handled far more concurrent users on the same hardware. It's a bit more complex to write, but on free-tier infrastructure the difference is significant.

---

## What's Next

- Voice input for the chatbot
- Support for more regional languages (Tamil, Telugu, Marathi)
- A parent dashboard so parents can follow along with their child's career exploration
- A mobile app

---

## Final Thought

The actual "AI" in this project — the LangGraph agents, the DistilBERT model, the RAG pipeline — is maybe 30% of the codebase. The rest is the data layer, the fallback systems, the authentication, the API design, the deployment pipeline.

If you're building your first AI project: don't just build a ChatGPT wrapper. Build a system. Handle failures. Use real data. Think about what happens when the API you depend on goes down at 2am. That's the stuff that actually teaches you production engineering.

---

*Built as part of CDAC coursework. GitHub: [github.com/navanish17/ai_career_pilot](https://github.com/navanish17/ai_career_pilot)*
