import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  function change(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
  async function submit(e) {
    e.preventDefault(); setError("");
    try { await register(form); navigate("/"); }
    catch (err) { setError(err.message || "Registration failed."); }
  }
  return <section className="auth-section"><form className="auth-card" onSubmit={submit}>
    <span className="eyebrow">JOIN GRANDSTAY</span><h1>Create account</h1><p className="muted">Create an account to manage your bookings.</p>
    {error && <p className="error">{error}</p>}
    <label>Full name<input name="name" value={form.name} onChange={change} required /></label>
    <label>Email<input name="email" type="email" value={form.email} onChange={change} required /></label>
    <label>Password<input name="password" type="password" minLength="5" value={form.password} onChange={change} required /></label>
    <button className="btn btn-primary btn-full">Register</button>
    <p className="auth-bottom">Already registered? <Link to="/login">Login</Link></p>
  </form></section>;
}
