import React from 'react';
// import emailjs from 'emailjs-com';
import './ContactForm.css';

function ContactForm() {
  // const sendEmail = (e) => {
  //   e.preventDefault();

  //   emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
  //     .then((result) => {
  //       console.log(result.text);
  //     }, (error) => {
  //       console.log(error.text);
  //     });

  //   e.target.reset();
  // };

  return (
    <div className='contact-form-container'>
      <div>
        <p className="about-contact-form-title">Get in Touch</p>
        <form className="form-query">
          <div className="subject-query">
            <textarea
              type="text"
              id="subject-question-query"
              name="text"
              placeholder="Full Name"
            />
          </div>
          <div className="user-email">
            <textarea
              type="email"
              id="user-email"
              name="email"
              placeholder="Your Email"
            />
          </div>
          <div className="message-query">
            <textarea
              type="text"
              id="query-writing-message"
              name="message"
              placeholder="Your Message"
            />
          </div>
          <button type="submit" className='button-contact-form'>Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;

