import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("grandstay_user") || "null");
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("grandstay_user", JSON.stringify(user));
    else localStorage.removeItem("grandstay_user");
  }, [user]);

  async function register(form) {
    const existing = await api.get(`/users?email=${encodeURIComponent(form.email)}`);
    if (existing.data.length) throw new Error("Email already registered.");
    const response = await api.post("/users", { ...form, role: "customer" });
    const safeUser = { id: response.data.id, name: response.data.name, email: response.data.email, role: "customer" };
    setUser(safeUser);
    return safeUser;
  }

  async function login(email, password) {
    const response = await api.get(`/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    if (!response.data.length) throw new Error("Invalid email or password.");
    const found = response.data[0];
    const safeUser = { id: found.id, name: found.name, email: found.email, role: found.role || "customer" };
    setUser(safeUser);
    return safeUser;
  }

  function logout() {
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, register, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
