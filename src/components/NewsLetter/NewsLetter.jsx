import React, { useState } from 'react';
import axios from 'axios';
import './NewsLetter.css'

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/subscribe', { email });
      setSubmitted(true);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      {!submitted ? (
        <div className='newsletter-form-subscription'>
        <p>Subscribe To Our NewsLetter</p>
        <form className='form-newsletter-footer' onSubmit={handleSubmit}>
        
          <input className='input-form-newsletter-footer'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <button className='subscribe-btn-form-newsletter-footer' type="submit">Subscribe</button>
        </form>
        </div>
      ) : (
        <p>Thank you for subscribing!</p>
      )}
    </div>
  );
};

export default NewsletterForm;
