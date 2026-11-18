import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config";
import PageHeader from "../../components/PageHeader/PageHeader";
import "./auth.css";

// The demo admin, shown to every visitor so anyone (an interviewer, say) can open the dashboard.
// The account is created on the server with: node make-demo-admin.js
const DEMO = { email: "admin@example.com", password: "admin123" };

// Sign in. The token and a few details are kept for this browser tab only (sessionStorage),
// so closing the tab signs the user out. Admins go to the dashboard, students to the Math Community.
function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const fillDemo = () => {
    setForm({ ...DEMO });
    setError("");
  };

  const signIn = (event) => {
    event.preventDefault();
    setError("");
    setSending(true);
    axios.post(`${API_URL}/api/user/login`, form)
      .then(({ data }) => {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("id", data._id);
        sessionStorage.setItem("isAdmin", data.isAdmin);
        sessionStorage.setItem("first_name", data.first_name || "");
        sessionStorage.setItem("userImage", data.image || "");
        navigate(data.isAdmin ? "/admin-dashboard" : "/mathcommunity");
      })
      .catch((err) => setError(err.response?.status === 400
        ? "The email or the password is wrong."
        : err.response?.data?.message || "The server could not be reached. Try again in a minute."))
      .finally(() => setSending(false));
  };

  return (
    <>
      <PageHeader title="Sign in" lead="Students sign in to post and reply in the Math Community." />
      <div className="page auth-page">
        <form className="panel auth-form" onSubmit={signIn}>
          <label>Email<input type="email" name="email" value={form.email} onChange={change} required autoComplete="email" autoFocus /></label>
          <label>Password<input type="password" name="password" value={form.password} onChange={change} required autoComplete="current-password" /></label>
          {error && <p className="auth-form__error" role="alert">{error}</p>}
          <button type="submit" className="site-button" disabled={sending}>{sending ? "Signing in…" : "Sign in"}</button>
          <p className="auth-form__switch">No account yet? <Link to="/registerusers">Create a student account</Link></p>

          <div className="auth-demo">
            <p className="auth-demo__title">For dashboard access, sign in as:</p>
            <dl className="auth-demo__list">
              <dt>Email</dt><dd>{DEMO.email}</dd>
              <dt>Password</dt><dd>{DEMO.password}</dd>
            </dl>
            <button type="button" className="auth-demo__fill" onClick={fillDemo}>Fill in the demo login</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignIn;
