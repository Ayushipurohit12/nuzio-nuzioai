import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { ARTICLES, CATEGORIES, getArticleById } from "../data/news.js";
import { findOrCreateUser, toggleSavedArticle, updateUserPreferences } from "../data/users.js";

const router = Router();

function firstName(name = "") {
  return name.split(" ")[0] || name;
}

function formatDuration(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
function personalize(user, categoryFilter) {
  const preferred = new Set(user.preferences.niches);

  let pool = ARTICLES;
  if (categoryFilter && categoryFilter !== "All") {
    pool = pool.filter((a) => a.category === categoryFilter);
  }

  const sorted = [...pool].sort((a, b) => {
    const aPref = preferred.has(a.category) ? 0 : 1;
    const bPref = preferred.has(b.category) ? 0 : 1;
    if (aPref !== bPref) return aPref - bPref;
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });

  return sorted;
}

/**
 * GET /api/news/categories
 */
router.get("/categories", (req, res) => {
  res.json({ categories: CATEGORIES });
});

/**
 * GET /api/news/brief?category=All
 * Returns the personalized "Morning Brief" payload the BriefScreen renders:
 * greeting, story count, total runtime, and the ordered story list with a
 * "now playing" pointer on the first (highest-ranked) story.
 */
router.get("/brief", requireAuth, (req, res) => {
  const user = findOrCreateUser({ email: req.user.email, name: req.user.name, picture: req.user.picture });
  const category = req.query.category || "All";

  const stories = personalize(user, category).map((a, idx) => ({
    ...a,
    position: idx + 1,
    saved: user.savedArticleIds.includes(a.id)
  }));

  const totalSeconds = stories.reduce((sum, s) => sum + s.durationSeconds, 0);

  res.json({
    greetingName: firstName(user.name),
    date: new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }),
    voice: user.preferences.voice,
    category,
    categories: CATEGORIES,
    storyCount: stories.length,
    totalDuration: formatDuration(totalSeconds),
    nowPlayingIndex: 0,
    stories: stories.map((s) => ({
      ...s,
      durationLabel: formatDuration(s.durationSeconds)
    }))
  });
});

/**
 * POST /api/news/:id/save
 * Toggles whether a story is in the user's saved list.
 */
router.post("/:id/save", requireAuth, (req, res) => {
  const article = getArticleById(req.params.id);
  if (!article) return res.status(404).json({ error: "Story not found" });

  const user = toggleSavedArticle(req.user.email, req.params.id);
  res.json({ savedArticleIds: user.savedArticleIds });
});

/**
 * GET /api/news/saved
 */
router.get("/saved", requireAuth, (req, res) => {
  const user = findOrCreateUser({ email: req.user.email, name: req.user.name, picture: req.user.picture });
  const saved = ARTICLES.filter((a) => user.savedArticleIds.includes(a.id));
  res.json({ stories: saved });
});

/**
 * PATCH /api/news/preferences
 * Body: { niches?: string[], voice?: string, briefLength?: string }
 * Lets the client update onboarding preferences that drive personalization.
 */
router.patch("/preferences", requireAuth, (req, res) => {
  const user = updateUserPreferences(req.user.email, req.body || {});
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ preferences: user.preferences });
});

export default router;
