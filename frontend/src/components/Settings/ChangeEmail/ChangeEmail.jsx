// CSS
import "./ChangeEmail.scss";

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
          <p>Enter a new email and current password to confirm changes.</p>
        </div>
        <div className="email_header">
          <p>Current Email</p>
        </div>
        <div>
          <p className="current_email">johndoe@gmail.com</p>
        </div>

        <form className="email_form" action="/update_password" method="post">
          <div class="form_group">
            <label for="newEmail">New Email:</label>
            <input type="email" id="newEmail" name="newEmail" required />
          </div>
          <div class="form_group">
            <label for="confirmNewPassword">Current Password:</label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              required
            />
          </div>
        </form>

        <div className="confirmation_guide">
          <div className="change_email_guide">
            <p>
              Before you click the button below, make sure you have entered the
              correct email. You will be logged out and will have to log back in
              using your new credentials.
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
