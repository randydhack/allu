import "./ChangePassword.scss";
// CSS

// Libaries
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function ChangePassword() {
  return (
    <div className="setting__contents setting__background">
      {/* HEADING */}
      <div className="setting__header__mb">
        <h2 className="setting__header">Change Password</h2>
        <hr className="setting__divider"></hr>
      </div>
      <h2>Update Password</h2>
      <form action="/update-password" method="post">
        <div class="form-group">
          <label for="oldPassword">Old Password:</label>
          <input type="password" id="oldPassword" name="oldPassword" required />
        </div>
        <div class="form-group">
          <label for="newPassword">New Password:</label>
          <input type="password" id="newPassword" name="newPassword" required />
        </div>
        <div class="form-group">
          <label for="confirmNewPassword">Retype New Password:</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            required
          />
        </div>
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
