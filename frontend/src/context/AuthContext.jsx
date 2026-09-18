import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api, setToken, clearToken, hasToken } from "../api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!hasToken()) {
        setLoading(false);
        return;
      }
      try {
        const { user } = await api.me();
        setUser(user);
      } catch {
        clearToken();
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const loginWithGoogle = useCallback(async (credential) => {
    const { token, user } = await api.loginWithGoogle(credential);
    setToken(token);
    setUser(user);
  }, []);

  const loginDemo = useCallback(async () => {
    const { token, user } = await api.loginDemo();
    setToken(token);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, loginDemo, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
