import "./ChangePassword.scss";
// CSS

// Libaries
import React, { useState } from "react";

function ChangePassword() {
  return (
    <div className="setting__contents setting__background">
      {/* HEADING */}
      <div className="setting__header__mb">
        <h2 className="setting__header">Change Password</h2>
        <hr className="setting__divider"></hr>
      </div>
      <h2>Update Password</h2>
      <form className="password_form" action="/update_password" method="post">
        <div class="form_group">
          <label for="oldPassword">Old Password:</label>
          <input type="password" id="oldPassword" name="oldPassword" required />
        </div>
        <div class="form_group">
          <label for="newPassword">New Password:</label>
          <input type="password" id="newPassword" name="newPassword" required />
        </div>
        <div class="form_group">
          <label for="confirmNewPassword">Retype New Password:</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            required
          />
          <p className="pw_guide">At least 8 characters long</p>
        </div>
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
