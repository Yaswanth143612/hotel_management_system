import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault(); setError("");
    try { const user = await login(email, password); navigate(user.role === "admin" ? "/admin" : "/"); }
    catch (err) { setError(err.message || "Login failed."); }
  }
  return <section className="auth-section"><form className="auth-card" onSubmit={handleSubmit}>
    <span className="eyebrow">WELCOME BACK</span><h1>Login</h1><p className="muted">Sign in to manage your stay.</p>
    {error && <p className="error">{error}</p>}
    <label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
    <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></label>
    <button className="btn btn-primary btn-full">Login</button>
    <p className="auth-bottom">New to GrandStay? <Link to="/register">Create account</Link></p>
    <small className="muted">Demo admin: admin@grandstay.com / admin123</small>
  </form></section>;
}
