import React, { useState } from 'react';
import './Contact.css';
import { FaUser, FaEnvelope, FaTag, FaComment, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact">
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p className="tagline">We'd love to hear from you!</p>
      </div>
      <div className="contact-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              <FaUser className="icon" />
              <span className="label-text">Your Name</span>
            </label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope className="icon" />
              <span className="label-text">Your Email</span>
            </label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="subject">
              <FaTag className="icon" />
              <span className="label-text">Subject</span>
            </label>
            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Enter the subject" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">
              <FaComment className="icon" />
              <span className="label-text">Your Message</span>
            </label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Write your message here" required></textarea>
          </div>
          <button type="submit">
            <FaPaperPlane className="icon" />
            <span>Send Message</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
