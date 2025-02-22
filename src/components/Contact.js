import React, { useState } from 'react';
import '../styles/Contact.css'; // For styling the contact page
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'; // Import icons

export default function Contact() {
  const [result, setResult] = React.useState("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
  });
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "cc390456-d341-44d5-ad22-72629a785dcf");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted!');
    setFormData({ name: '', email: '', reason: '' });
  };

  return (
    <div className="contact-container">
      
      {/* Contact Form Box */}
      <div className="form-box">
        <h1 className="contact-title">Contact Us</h1>
        <form onSubmit={onSubmit} className="contact-form">
          <div className="form-field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="reason">Reason for contacting:</label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>
        <span>{result}</span>
      </div>

      {/* Contact Details Below Form */}
      <div className="contact-details">
        <div className="contact-item">
          <a href="https://www.google.com/maps/place/K-304,+Ittina+Mahaveer,+Electronic+City,+Bangalore" 
            target="_blank" rel="noopener noreferrer" className="contact-link">
            <FaMapMarkerAlt className="contact-icon" />  
            <span>Bangalore, Karnataka</span>
          </a>
        </div>

        <div className="contact-item">
          <a href="tel:+919140454503" className="contact-link">
            <FaPhoneAlt className="contact-icon" />  
            <span>+91 9140454503</span>
          </a>
        </div>

        <div className="contact-item">
          <a href="mailto:upadhayayutkarsh02@gmail.com" className="contact-link">
            <FaEnvelope className="contact-icon" />  
            <span>snackswipe.snack.swipe@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}