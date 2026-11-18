import React, { useState } from "react";
import axios from "axios";
import API_URL from "../../config";
import "./ContactForm.css";

// Saves the message in the database; the admin reads it in the dashboard (Messages) and replies by email.
// "website" is a hidden trap field: people never see it, spam robots fill it in and are ignored.
const EMPTY = { name: "", email: "", message: "", website: "" };

function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const send = (event) => {
    event.preventDefault();
    setStatus("sending");
    axios.post(`${API_URL}/api/messages`, form)
      .then(() => { setForm(EMPTY); setStatus("sent"); })
      .catch((err) => { setError(err.response?.data?.message || "The message could not be sent. Please email us instead."); setStatus("failed"); });
  };

  return (
    <div className="contact-form panel">
      <h3>Send us a message</h3>
      <form onSubmit={send}>
        <label>Full name<input name="name" value={form.name} onChange={change} required maxLength={100} autoComplete="name" /></label>
        <label>Email<input type="email" name="email" value={form.email} onChange={change} required autoComplete="email" /></label>
        <label>Message<textarea name="message" rows="6" value={form.message} onChange={change} required maxLength={5000} /></label>
        <label className="contact-form__trap" aria-hidden="true">Website
          <input name="website" value={form.website} onChange={change} tabIndex={-1} autoComplete="off" />
        </label>
        <button type="submit" className="site-button" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "sent" && <p className="contact-form__ok">Thank you, your message was sent. We reply by email.</p>}
        {status === "failed" && <p className="contact-form__error">{error}</p>}
      </form>
    </div>
  );
}

export default ContactForm;
