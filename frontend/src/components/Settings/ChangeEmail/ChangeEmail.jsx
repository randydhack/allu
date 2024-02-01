// CSS
import "./ChangeEmail.scss";

// Libaries
import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Context
import { InfoContext } from "../../../context/infoContext";

// Redux
import { changeEmail, logoutUser, restoreUser } from "../../../store/session";

function ChangeEmail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, setUser } = useContext(InfoContext);

  const currentUser = useSelector((state) => state.session.user);

  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const handleUpdateEmail = async (e) => {
    e.preventDefault();

    const data = await dispatch(changeEmail(newEmail, password));

    if (data && data.message) {
      setErrors(data.message);
      // setUser(currentUser);
    } else {
      setErrors(null);
      logoutUser();
      setUser(null)
      return navigate("/");
    }
  };

  return user && (
      <div className="setting__contents setting__background">
        {/* HEADING */}
        <div className="setting__header__mb">
          <h1 className="setting__header">Change Email</h1>
        </div>

        <div>
          <div className="change_email_header">
            <p>Enter a new email and current password to confirm changes.</p>
          </div>
          <div className="email_header">
            <p>Current Email</p>
          </div>
          <div>
            <p className="current_email">{user.email || currentUser.email}</p>
          </div>

          <form className="email_form" onSubmit={(e) => handleUpdateEmail(e)}>
            <div className="form_group">
              <label htmlFor="newEmail">New Email:</label>
              <input
                type="email"
                id="newEmail"
                name="newEmail"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              {errors && <p className="email_form__error">{errors.email}</p>}
            </div>
            <div className="form_group">
              <label htmlFor="confirmNewPassword">Current Password:</label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors && <p className="email_form__error">{errors.password}</p>}
            </div>

            <div className="confirmation_guide">
              <div className="change_email_guide">
                <p>
                  Before you click the button below, make sure you have entered
                  the correct email. You will be logged out and will have to log
                  back in using your new credentials.
                </p>
              </div>
              <div className="change_email_btn">
                <button type="submit">Confirm Changes</button>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
}

export default ChangeEmail;
