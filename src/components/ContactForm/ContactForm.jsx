import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./ContactForm.css";

// Sends the message through EmailJS (public keys: they only allow sending through this template).
function ContactForm() {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (event) => {
    event.preventDefault();
    setStatus("sending");
    emailjs.sendForm("service_2w0tt2a", "template_k8cscfj", form.current, "uI4RZWLdhav0v9t1W")
      .then(() => { form.current.reset(); setStatus("sent"); })
      .catch(() => setStatus("failed"));
  };

  return (
    <div className="contact-form panel">
      <h3>Send us a message</h3>
      <form ref={form} onSubmit={sendEmail}>
        <label>Full name<input type="text" name="text" required autoComplete="name" /></label>
        <label>Email<input type="email" name="email" required autoComplete="email" /></label>
        <label>Message<textarea name="message" rows="6" required /></label>
        <button type="submit" className="site-button" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "sent" && <p className="contact-form__ok">Thank you, your message was sent.</p>}
        {status === "failed" && <p className="contact-form__error">The message could not be sent. Please email us instead.</p>}
      </form>
    </div>
  );
}

export default ContactForm;
