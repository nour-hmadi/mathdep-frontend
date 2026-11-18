import React, { useState } from "react";
import axios from "axios";
import API_URL from "../../config";
import "./NewsLetter.css";

// Saves the email in the database; the admin sees the list in the dashboard (Newsletter).
// "website" is the same hidden trap field as in the contact form.
const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState("");

  const subscribe = (event) => {
    event.preventDefault();
    setStatus("sending");
    axios.post(`${API_URL}/api/subscribers`, { email, website })
      .then(() => setStatus("done"))
      .catch(() => setStatus("failed"));
  };

  if (status === "done") return <p className="newsletter__thanks">Thank you. You will hear from us at the start of each semester.</p>;
  return (
    <form className="newsletter" onSubmit={subscribe}>
      <label htmlFor="newsletter-email">News from the department, a few times a year.</label>
      <div className="newsletter__row">
        <input id="newsletter-email" type="email" required placeholder="Your email" value={email}
               onChange={(event) => setEmail(event.target.value)} />
        <input className="newsletter__trap" aria-hidden="true" tabIndex={-1} autoComplete="off" name="website"
               value={website} onChange={(event) => setWebsite(event.target.value)} />
        <button type="submit" className="site-button" disabled={status === "sending"}>Subscribe</button>
      </div>
      {status === "failed" && <p className="newsletter__thanks">That didn't work. Check the address and try again.</p>}
    </form>
  );
};

export default NewsletterForm;
