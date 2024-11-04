import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    error: null
  });

  const [activeField, setActiveField] = useState(null);

  const contactInfo = {
    email: 'einsteinmokua100@gmail.com',
    phone: '+254 719 408 098',
    location: 'Nairobi, Kenya',
    socials: [
      { 
        name: 'GitHub', 
        url: 'https://github.com/Nyandiekahh', 
        icon: '⌨️' 
      },
      { 
        name: 'LinkedIn', 
        url: 'https://www.linkedin.com/in/einstein-mokua-b9886b220/', 
        icon: '💼' 
      },
      { 
        name: 'WhatsApp', 
        url: 'https://wa.me/254719408098',
        icon: '💬' 
      }
    ]
  };

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init("fc2frA56DkmeYcH8v");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, submitting: true });
  
    try {
      const now = new Date();
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        sent_date: now.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        timestamp: now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      };
  
      const result = await emailjs.send(
        "service_x4n3otv",  // Your service ID
        "template_x08vbrg", // Your template ID
        templateParams,
        "fc2frA56DkmeYcH8v" // Your public key
      );
  
      console.log("Success:", result.text);
      setFormStatus({
        submitted: true,
        submitting: false,
        error: null
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, submitted: false }));
      }, 5000);
    } catch (error) {
      console.error("Email send error:", error);
      setFormStatus({
        submitted: false,
        submitting: false,
        error: 'Failed to send message. Please try again.'
      });
    }
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <h2 className="section-title">
          <span className="highlight">Get</span> In Touch
        </h2>

        <div className="contact-content">
          {/* Contact Form */}
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className={`form-group ${activeField === 'name' ? 'active' : ''}`}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    onFocus={() => setActiveField('name')}
                    onBlur={() => setActiveField(null)}
                  />
                  <label htmlFor="name">Name</label>
                  <div className="form-line"></div>
                </div>

                <div className={`form-group ${activeField === 'email' ? 'active' : ''}`}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    onFocus={() => setActiveField('email')}
                    onBlur={() => setActiveField(null)}
                  />
                  <label htmlFor="email">Email</label>
                  <div className="form-line"></div>
                </div>

                <div className={`form-group full-width ${activeField === 'subject' ? 'active' : ''}`}>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    onFocus={() => setActiveField('subject')}
                    onBlur={() => setActiveField(null)}
                  />
                  <label htmlFor="subject">Subject</label>
                  <div className="form-line"></div>
                </div>

                <div className={`form-group full-width ${activeField === 'message' ? 'active' : ''}`}>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    onFocus={() => setActiveField('message')}
                    onBlur={() => setActiveField(null)}
                  ></textarea>
                  <label htmlFor="message">Message</label>
                  <div className="form-line"></div>
                </div>
              </div>

              <button 
                type="submit" 
                className={`submit-btn ${formStatus.submitting ? 'loading' : ''}`}
                disabled={formStatus.submitting}
              >
                <span className="btn-text">
                  {formStatus.submitting ? 'Sending...' : 'Send Message'}
                </span>
                <div className="btn-particles"></div>
              </button>

              {formStatus.submitted && (
                <div className="success-message">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {formStatus.error && (
                <div className="error-message">
                  {formStatus.error}
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact-info">
            <div className="info-card">
              <div className="info-header">
                <h3>Contact Information</h3>
                <p>Feel free to reach out through any of these channels</p>
              </div>

              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon">📧</div>
                  <div className="info-content">
                    <h4>Email</h4>
                    <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">📱</div>
                  <div className="info-content">
                    <h4>Phone</h4>
                    <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">📍</div>
                  <div className="info-content">
                    <h4>Location</h4>
                    <p>{contactInfo.location}</p>
                  </div>
                </div>
              </div>

              <div className="social-links">
                {contactInfo.socials.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="social-icon">{social.icon}</span>
                    <span className="social-name">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="decoration-circles">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="circle" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="contact-bg">
        <div className="bg-grid">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="grid-item" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;