import "./ChangeEmail.scss";
// CSS

// Libaries
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ChangeEmail() {
  return (
    <div className="setting__contents setting__background">
      {/* HEADING */}
      <div className="setting__header__mb">
        <h2 className="setting__header">Change Email</h2>
        <hr className="setting__divider"></hr>
      </div>

      <div>
        <div className="change_email_header">
          <p>
            change the email you use to login and we will send you an email for
            confirmation
          </p>
        </div>
        <div className="email_header">
          <p>Current Email</p>
        </div>
        <div>
          <p className="current_email">johndoe@gmail.com</p>
        </div>

        <div className="confirmation_guide">
          <div className="change_email_guide">
            <p>
              Once you click the button below, a link will be sent to your email
              inbox with instructions on how to change your email.
            </p>
          </div>
          <div className="change_email_btn">
            <button type="submit">send email change link</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeEmail;
