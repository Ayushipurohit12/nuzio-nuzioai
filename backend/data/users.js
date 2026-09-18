
const usersByEmail = new Map();

export function findOrCreateUser({ email, name, picture, googleId }) {
  let user = usersByEmail.get(email);
  if (!user) {
    user = {
      id: googleId || email,
      email,
      name: name || email.split("@")[0],
      picture: picture || null,
      preferences: {
        niches: ["AI & Tech", "Markets", "Startups"],
        voice: "Aria",
        briefLength: "10 min"
      },
      savedArticleIds: [],
      createdAt: new Date().toISOString()
    };
    usersByEmail.set(email, user);
  }
  return user;
}

export function getUserByEmail(email) {
  return usersByEmail.get(email) || null;
}

export function updateUserPreferences(email, preferences) {
  const user = usersByEmail.get(email);
  if (!user) return null;
  user.preferences = { ...user.preferences, ...preferences };
  return user;
}

export function toggleSavedArticle(email, articleId) {
  const user = usersByEmail.get(email);
  if (!user) return null;
  const idx = user.savedArticleIds.indexOf(articleId);
  if (idx >= 0) {
    user.savedArticleIds.splice(idx, 1);
  } else {
    user.savedArticleIds.push(articleId);
  }
  return user;
}
