const API_URL = (
  import.meta.env.VITE_API_URL || "https://nuzio-nuzio-ai.onrender.com/api"
).replace(/\/$/, "");

function getToken() {
  return localStorage.getItem("nuzio_token");
}

async function request(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export const api = {
  loginWithGoogle: (credential) =>
    request("/auth/google", {
      method: "POST",
      body: { credential },
      auth: false,
    }),
  loginDemo: () => request("/auth/demo", { method: "POST", auth: false }),
  me: () => request("/auth/me"),
  getBrief: (category = "All") =>
    request(`/news/brief?category=${encodeURIComponent(category)}`),
  toggleSave: (id) => request(`/news/${id}/save`, { method: "POST" }),
  getSaved: () => request("/news/saved"),
  updatePreferences: (prefs) =>
    request("/news/preferences", { method: "PATCH", body: prefs }),
};

export function setToken(token) {
  localStorage.setItem("nuzio_token", token);
}

export function clearToken() {
  localStorage.removeItem("nuzio_token");
}

export function hasToken() {
  return Boolean(getToken());
}
