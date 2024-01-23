// Hooks, Libaries, Context
import { useContext } from "react";
import { ModalContext } from "../../context/modalContext";

// CSS / ICONS
import './FormStyles.scss'
import { RxCross1 } from "react-icons/rx";

function LoginModal() {
  // Set the type to null when clicking the close icon and closes the modal
  const { setType, toggleSignUp} = useContext(ModalContext);

  return (
    <div className="login-container">
      <RxCross1 className="close" onClick={() => setType(null)} />
      <form onSubmit={""} className="form">
        <h2 className="header">Sign In</h2>

        {/* FORM FIELDS */}
        <div className="field_container">
          <div className="field">
            <label htmlFor="email" className="label">
              Email Address<span className="asterisk">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="inputField"
            />
          </div>
          <div className="field">
            <label htmlFor="password" className="lavel">
              Password<span className="asterisk">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="inputField"
            />
          </div>
        </div>

        {/* Remember Me Toggle Button */}
        <div className="remember_forgot">
          <div className="remember_me">
            <input
              type="checkbox"
              className="remember_toggle_box"
            ></input>
            <div style={{ cursor: "default" }}>Remember me</div>
          </div>
          <div className="forgot-password-link">Forgot your password?</div>
        </div>

        {/* Login Button */}
        <div>
          <button
            className="login-button"
          >
            Sign In
          </button>
        </div>
        <div className="create-account-link" onClick={toggleSignUp}>Don't have an account?</div>
      </form>
    </div>
  );
}

export default LoginModal;
