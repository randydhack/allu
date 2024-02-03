// Libaries
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// CSS
import "./ChangePassword.scss";

// Context
import { InfoContext } from "../../../context/infoContext";

// Redux Store
import {
  changePassword,
  logoutUser,
  restoreUser,
} from "../../../store/session";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, setUser } = useContext(InfoContext);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState({ new: "", confirm: "" });
  const [errors, setErrors] = useState(null);


  useEffect(() => {
    (async () => {
      const session = await dispatch(restoreUser());
      if (session) setUser(session.user);
    })();
  }, [setUser]);



  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    const userData = await dispatch(
      changePassword(newPassword.new, newPassword.confirm, password)
    ).catch(async (res) => {
      const data = await res.json()
      const error = JSON.parse(data.message)
      if (data && error) setErrors(error);
    })

    console.log(userData)
    if (userData) {
      dispatch(logoutUser());
      setUser(null)
      return navigate("/");
    }
  };

  return user && (
    <div className="setting__contents setting__background">
      {/* HEADING */}
      <div className="setting__header__mb">
        <h1 className="setting__header">Change Password</h1>
      </div>
      <h2>Update Password</h2>
      <form className="password_form" onSubmit={(e) => handleUpdatePassword(e)}>
        <div className="form_group">
          <label htmlFor="oldPassword">Old Password:</label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            aria-label="old password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          {errors && <p className="email_form__error">{errors.password}</p>}
        </div>
        <div className="form_group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            aria-label="new password"
            required
            value={newPassword.new}
            onChange={(e) =>
              setNewPassword({
                new: e.target.value,
                confirm: newPassword.confirm,
              })
            }
            />
          {errors && <p className="email_form__error">{errors.match}</p>}
        </div>
        <div className="form_group">
          <label htmlFor="confirmNewPassword">Retype New Password:</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            aria-label="confirm password"
            required
            value={newPassword.confirm}
            onChange={(e) =>
              setNewPassword({ new: newPassword.new, confirm: e.target.value })
            }
          />
          <p className="pw_guide">At least 8 characters long</p>
        </div>
        <div className="confirmation_guide">
          <div className="change_email_guide">
            <p>
              Once you click the button below, you will be signed out and
              required to sign back in with your new updated password.
            </p>
          </div>
          <div className="change_pw_btn">
            <button type="submit" aria-label="submit password">Update Password</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
