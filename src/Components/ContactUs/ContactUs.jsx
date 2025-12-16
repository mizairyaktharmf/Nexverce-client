import React, { useState } from 'react';
import './ContactUs.css';
import Footer from '../Footer/Footer';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can add API call to send the contact form
    console.log('Contact Form Submitted:', formData);

    // Show success message
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <div className="contact-us-page">
        <div className="contact-us-hero">
          <h1 className="contact-us-title">Get in Touch</h1>
          <p className="contact-us-tagline">We'd Love to Hear from You</p>
        </div>

        <div className="contact-us-container">
          <div className="contact-us-grid">
            {/* Left Side - Contact Information */}
            <div className="contact-info-section">
              <h2>Contact Information</h2>
              <p className="contact-intro">
                Have questions, feedback, or partnership inquiries? Reach out to us through any of the channels below, and we'll get back to you as soon as possible.
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📧</div>
                  <div className="contact-content">
                    <h3>Email</h3>
                    <a href="mailto:contact@nexverce.com">contact@nexverce.com</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">💼</div>
                  <div className="contact-content">
                    <h3>LinkedIn</h3>
                    <a href="https://www.linkedin.com/company/nexverce" target="_blank" rel="noopener noreferrer">
                      linkedin.com/company/nexverce
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">📷</div>
                  <div className="contact-content">
                    <h3>Instagram</h3>
                    <a href="https://www.instagram.com/nexverce" target="_blank" rel="noopener noreferrer">
                      @nexverce
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">👥</div>
                  <div className="contact-content">
                    <h3>Facebook</h3>
                    <a href="https://www.facebook.com/nexverce" target="_blank" rel="noopener noreferrer">
                      facebook.com/nexverce
                    </a>
                  </div>
                </div>
              </div>

              <div className="business-hours">
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM (EST)</p>
                <p>Saturday - Sunday: Closed</p>
                <p className="response-time">We typically respond within 24-48 hours</p>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="contact-form-section">
              <h2>Send Us a Message</h2>

              {submitted && (
                <div className="success-message">
                  ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows="6"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-button">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>What is Nexverce?</h3>
                <p>Nexverce is a digital platform that curates innovative products, services, and content across various industries to help businesses and consumers make informed decisions.</p>
              </div>

              <div className="faq-item">
                <h3>How can I list my product?</h3>
                <p>Please email us at <a href="mailto:contact@nexverce.com">contact@nexverce.com</a> with details about your product or service, and our team will review your submission.</p>
              </div>

              <div className="faq-item">
                <h3>Do you offer business partnerships?</h3>
                <p>Yes! We're always open to collaborating with innovative businesses. Contact us to discuss partnership opportunities.</p>
              </div>

              <div className="faq-item">
                <h3>How do I report an issue?</h3>
                <p>If you encounter any technical issues or have concerns, please email us with details, and our support team will assist you promptly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
