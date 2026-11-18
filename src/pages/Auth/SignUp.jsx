import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config";
import PageHeader from "../../components/PageHeader/PageHeader";
import "./auth.css";

// A new student account. Teachers are added by an admin, so this page only creates students.
// The backend checks everything again (required fields, password length, email and file number not taken).
const EMPTY = { first_name: "", last_name: "", email: "", file_number: "", phone_number: "", password: "", confirm: "" };

function SignUp() {
  const [form, setForm] = useState(EMPTY);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const signUp = (event) => {
    event.preventDefault();
    if (form.password.length < 8) return setError("The password must have at least 8 characters.");
    if (form.password !== form.confirm) return setError("The two passwords are different.");
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => key !== "confirm" && data.append(key, value));
    if (photo) data.append("image", photo);
    setError("");
    setSending(true);
    return axios.post(`${API_URL}/api/user/register`, data)
      .then(() => setDone(true))
      .catch((err) => setError(err.response?.data?.message || "The server could not be reached. Try again in a minute."))
      .finally(() => setSending(false));
  };

  return (
    <>
      <PageHeader title="Create a student account" lead="With an account you can ask questions and reply in the Math Community." />
      <div className="page auth-page">
        {done ? (
          <div className="panel auth-form">
            <h3>Your account is ready</h3>
            <p>You can sign in now with your email and password.</p>
            <Link to="/login" className="site-button">Sign in</Link>
          </div>
        ) : (
          <form className="panel auth-form" onSubmit={signUp}>
            <div className="auth-form__row">
              <label>First name<input name="first_name" value={form.first_name} onChange={change} required autoComplete="given-name" /></label>
              <label>Last name<input name="last_name" value={form.last_name} onChange={change} required autoComplete="family-name" /></label>
            </div>
            <label>Email<input type="email" name="email" value={form.email} onChange={change} required autoComplete="email" /></label>
            <div className="auth-form__row">
              <label>File number<input name="file_number" inputMode="numeric" pattern="[0-9]+" title="Digits only"
                                       value={form.file_number} onChange={change} required /></label>
              <label>Phone<input type="tel" name="phone_number" value={form.phone_number} onChange={change} required autoComplete="tel" /></label>
            </div>
            <div className="auth-form__row">
              <label>Password <small>(8 characters or more)</small>
                <input type="password" name="password" value={form.password} onChange={change} required minLength={8} autoComplete="new-password" />
              </label>
              <label>Repeat the password
                <input type="password" name="confirm" value={form.confirm} onChange={change} required autoComplete="new-password" />
              </label>
            </div>
            <label>Photo <small>(optional: without one, your initials are used)</small>
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setPhoto(event.target.files[0] || null)} />
            </label>
            {error && <p className="auth-form__error" role="alert">{error}</p>}
            <button type="submit" className="site-button" disabled={sending}>{sending ? "Creating…" : "Create my account"}</button>
            <p className="auth-form__switch">Already have an account? <Link to="/login">Sign in</Link></p>
          </form>
        )}
      </div>
    </>
  );
}

export default SignUp;
