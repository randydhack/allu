import Logo from "../../images/t_shirt_logo.png";
import "./ContactUs.scss";
import { IoIosCheckmarkCircle } from "react-icons/io";
import React, { useState } from "react";
import emailjs from "emailjs-com";

function ContactUs() {
  const [addNotification, setAddNotification] = useState("");
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
    // console.log(process.env.REACT_APP_EMAILJS_USER_ID);
    emailjs.init(process.env.REACT_APP_EMAILJS_USER_ID);
    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }
      )
      .then(
        (response) => {
          // console.log("SUCCESS!", response.status, response.text);
          alert("Message sent successfully!");
        },
        (err) => {
          // console.log("FAILED...", err);
          alert("Failed to send the message, please try again.");
        }
      );

    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      message: "",
    });
    setTouched({
      firstname: false,
      lastname: false,
      email: false,
      phone: false,
      message: false,
    });
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
                aria-label="First Name"
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
                aria-label="Last Name"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">
                Email<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                aria-describedby="email-error"
                required
                aria-label="Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                aria-label="Phone number"
              />
            </div>
          </div>
          <div className="form-group message-group">
            <label htmlFor="message">
              Message<span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              aria-label="Message"
            ></textarea>
          </div>
          <div className="form-group">
            <div className="submit_contact">
              <button type="submit" aria-label="Send message">
                Send Message
              </button>
            </div>
            {addNotification && (
              <p className="cart-added-msg">
                <IoIosCheckmarkCircle style={{ color: "green" }} />{" "}
                {addNotification}
              </p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
export default ContactUs;
