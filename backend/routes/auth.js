import { Router } from "express";
import { OAuth2Client } from "google-auth-library";
import { signSession, requireAuth } from "../middleware/auth.js";
import { findOrCreateUser } from "../data/users.js";

const router = Router();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const googleClient = GOOGLE_CLIENT_ID ? new OAuth2Client(GOOGLE_CLIENT_ID) : null;

router.post("/google", async (req, res) => {
  const { credential } = req.body || {};

  if (!credential) {
    return res.status(400).json({ error: "Missing 'credential' in request body" });
  }

  if (!googleClient) {
    return res.status(501).json({
      error:
        "GOOGLE_CLIENT_ID is not configured on the server. Set it in backend/.env, or use POST /api/auth/demo while developing."
    });
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();

    const user = findOrCreateUser({
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      googleId: payload.sub
    });

    const token = signSession(user);
    res.json({ token, user: publicUser(user) });
  } catch (err) {
    console.error("Google token verification failed:", err.message);
    res.status(401).json({ error: "Could not verify Google credential" });
  }
});

/**
 * POST /api/auth/demo
 * No body required. Logs in as a fixture "Aarav" account so the app is
 * fully runnable without setting up real Google OAuth credentials.
 */
router.post("/demo", (req, res) => {
  const user = findOrCreateUser({
    email: "aarav.mehta@example.com",
    name: "Aarav Mehta",
    picture: null,
    googleId: "demo-user-aarav"
  });
  const token = signSession(user);
  res.json({ token, user: publicUser(user) });
});

/**
 * GET /api/auth/me
 * Returns the currently authenticated user (used to keep sessions alive
 * across page refreshes).
 */
router.get("/me", requireAuth, (req, res) => {
  const user = findOrCreateUser({ email: req.user.email, name: req.user.name, picture: req.user.picture });
  res.json({ user: publicUser(user) });
});

function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    picture: user.picture,
    preferences: user.preferences
  };
}

export default router;
