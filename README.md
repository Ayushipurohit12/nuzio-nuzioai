# Nuzio — Login + Personalized Morning Brief

A working React (Vite) + Node.js (Express) implementation of the two core
screens from the Figma file: **02 Login** and **09 Morning Brief**
(personalized audio news).

## Structure

```
nuzio-app/
  backend/     Express API: auth (Google OAuth + demo mode), personalized news brief
  frontend/    React (Vite) app: Login screen, Morning Brief screen
```

## 1. Run the backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev        # http://localhost:4000
```

By default `GOOGLE_CLIENT_ID` is empty, so the API runs in **demo mode**:
`POST /api/auth/demo` logs you in as a fixture user ("Aarav Mehta") with no
external setup required.

2. Add `http://localhost:5173` as an authorized JavaScript origin.
3. Put the client ID in `backend/.env` as `GOOGLE_CLIENT_ID` and in
   `frontend/.env` as `VITE_GOOGLE_CLIENT_ID`.

## 2. Run the frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev         # http://localhost:5173
```

Open http://localhost:5173 — you'll land on the Login screen. Click
"Continue with Google" (demo mode) to sign in and go straight to the
personalized Morning Brief.

## API summary

| Method | Path                    | Auth | Description                                  |
|--------|--------------------------|------|-----------------------------------------------|
| POST   | /api/auth/google          | no   | Verify a Google ID token, mint session JWT   |
| POST   | /api/auth/demo             | no   | Demo login (no Google account needed)        |
| GET    | /api/auth/me                | yes  | Current user                                  |
| GET    | /api/news/categories     | no   | List of niches                                |
| GET    | /api/news/brief?category= | yes  | Personalized brief (stories ranked by niche) |
| POST   | /api/news/:id/save          | yes  | Toggle save on a story                       |
| GET    | /api/news/saved             | yes  | Saved stories                                |
| PATCH  | /api/news/preferences     | yes  | Update niches / voice / brief length         |

## Notes / what's simulated vs. real

- **Real**: JWT session auth, Google ID token verification (when configured),
  REST API, category filtering, save/unsave, personalization ranking based on
  user's preferred niches.
- **Simulated (for demo purposes)**: story audio playback is a client-side
  timer against each story's `durationSeconds` rather than real streamed
  audio/TTS — wire `currentStory.audioUrl` to a real `<audio>` element once a
  TTS pipeline is producing files.
- User data is stored in memory on the backend (resets on server restart);
  swap `backend/data/users.js` for a real database in production.
