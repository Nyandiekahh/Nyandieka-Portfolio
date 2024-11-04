// src/components/Contact/Contact.js
import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <h2>Contact</h2>
      <div className="contact-content">
        <form>
          <input type="email" placeholder="Your email" />
          <textarea placeholder="Your message"></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;