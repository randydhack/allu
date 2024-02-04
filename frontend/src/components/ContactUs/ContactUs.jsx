import Logo from "../../images/t_shirt_logo.png";
import "./ContactUs.scss";
import React, { useState } from "react";

function ContactUs() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });

  const [touched, setTouched] = useState({
    firstname: false,
    lastname: false,
    email: false,
    phone: false,
    message: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prevState) => ({
      ...prevState,
      [name]: true,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the formData to your server or an email service
    console.log("Form data submitted:", formData);
    // Clear form fields after submission
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      message: "",
    });
    // Optionally reset touched state as well
  };

  const shouldShowError = (field) => {
    return !formData[field] && touched[field];
  };

  return (
    <main className="contact-us">
      <h1>Contact All-U</h1>
      <img src={Logo} alt="The All-U QR Code logo" />
      <h2>ALL U, Inc. 9 Interstate Ave. Albany, NY 12205</h2>
      <p>Phone: 1(518)438-2558 | Toll Free: 1-800-424-ALLU</p>
      <p>
        Email:
        <a href="mailto:info@allu.com" target="_blank">
          info@allu.com
        </a>
      </p>
      <div className="contact_form_container">
        <h2 className="contact_form_title">Get In Touch</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstname">First name</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last name</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email<span style={{color: "red"}}>*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                aria-describedby="email-error"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group message-group">
            <label htmlFor="message">Message<span style={{color: "red"}}>*</span></label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <div className="submit_contact">
              <button type="submit">Send Message</button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
export default ContactUs;
