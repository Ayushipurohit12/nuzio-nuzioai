// In-memory mock news catalog.
// In a real system this table would be populated by a scraping/ingestion
// pipeline + an LLM summarizer + a TTS (text-to-speech) job that renders
// `audioUrl` and `durationSeconds` for each story.

export const CATEGORIES = ["All", "AI & Tech", "Markets", "Startups", "Science", "Global"];

export const ARTICLES = [
  {
    id: "a1",
    category: "AI & Tech",
    headline: "Anthropic ships Claude 4.5 with 2M-token memory and native tools.",
    dek: "OpenAI unveils on-device model rivaling GPT-4 as the assistant war escalates further this quarter.",
    source: "The Verge",
    sourceUrl: "https://www.theverge.com",
    readMins: 3,
    durationSeconds: 134,
    publishedAt: "2026-09-14T06:00:00Z"
  },
  {
    id: "a2",
    category: "AI & Tech",
    headline: "India's IT majors race to embed agentic AI into enterprise contracts.",
    dek: "TCS, Infosys and Wipro pitch autonomous coding agents to cut delivery timelines by a third.",
    source: "Economic Times",
    sourceUrl: "https://economictimes.indiatimes.com",
    readMins: 2,
    durationSeconds: 96,
    publishedAt: "2026-09-14T05:10:00Z"
  },
  {
    id: "a3",
    category: "Markets",
    headline: "Nifty holds above 25,000 as FIIs turn net buyers after three weeks.",
    dek: "IT and banking stocks lead gains; analysts flag Q2 earnings season as the next catalyst.",
    source: "Moneycontrol",
    sourceUrl: "https://www.moneycontrol.com",
    readMins: 3,
    durationSeconds: 121,
    publishedAt: "2026-09-14T04:30:00Z"
  },
  {
    id: "a4",
    category: "Markets",
    headline: "Rupee steadies near 83.9/USD as crude prices cool off.",
    dek: "RBI intervention and softer oil prices ease pressure on the currency ahead of the policy review.",
    source: "Business Standard",
    sourceUrl: "https://www.business-standard.com",
    readMins: 2,
    durationSeconds: 88,
    publishedAt: "2026-09-13T23:45:00Z"
  },
  {
    id: "a5",
    category: "Startups",
    headline: "Bengaluru fintech Zolve raises $60M Series C led by Lightspeed.",
    dek: "The credit-building startup for immigrants plans to expand into three new markets by 2027.",
    source: "YourStory",
    sourceUrl: "https://yourstory.com",
    readMins: 2,
    durationSeconds: 102,
    publishedAt: "2026-09-13T18:20:00Z"
  },
  {
    id: "a6",
    category: "Startups",
    headline: "Swiggy Instamart turns EBITDA positive two quarters ahead of guidance.",
    dek: "Faster delivery hubs and ad revenue push the quick-commerce arm into the black for the first time.",
    source: "Entrackr",
    sourceUrl: "https://entrackr.com",
    readMins: 3,
    durationSeconds: 128,
    publishedAt: "2026-09-13T15:00:00Z"
  },
  {
    id: "a7",
    category: "Science",
    headline: "ISRO's Aditya-L2 probe returns first solar wind data from Lagrange point.",
    dek: "Scientists say early readings could improve space-weather forecasts protecting satellites and grids.",
    source: "The Hindu",
    sourceUrl: "https://www.thehindu.com",
    readMins: 3,
    durationSeconds: 141,
    publishedAt: "2026-09-13T09:00:00Z"
  },
  {
    id: "a8",
    category: "Global",
    headline: "EU and India close in on a free-trade deal after a decade of talks.",
    dek: "Negotiators say tariff chapters on autos and dairy are the last sticking points before sign-off.",
    source: "Reuters",
    sourceUrl: "https://www.reuters.com",
    readMins: 4,
    durationSeconds: 156,
    publishedAt: "2026-09-13T07:15:00Z"
  }
];

export function getArticleById(id) {
  return ARTICLES.find((a) => a.id === id) || null;
}
