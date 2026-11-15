import React, { useState } from "react";
import "./NewsLetter.css";

// There is no mailing list behind this form yet: it thanks the visitor and keeps nothing.
const NewsletterForm = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return <p className="newsletter__thanks">Thank you. You will hear from us at the start of each semester.</p>;
  return (
    <form className="newsletter" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
      <label htmlFor="newsletter-email">News from the department, a few times a year.</label>
      <div className="newsletter__row">
        <input id="newsletter-email" type="email" required placeholder="Your email" />
        <button type="submit" className="site-button">Subscribe</button>
      </div>
    </form>
  );
};

export default NewsletterForm;
