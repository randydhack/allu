// Hooks, Libaries, Context
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Store
import { loginUser } from "../../store/session";

// Context
import { ModalContext } from "../../context/modalContext";
import { InfoContext } from "../../context/infoContext";

// CSS / ICONS
import "./FormStyles.scss";
import { RxCross1 } from "react-icons/rx";

function LoginModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Set the type to null when clicking the close icon and closes the modal
  const { type, toggleSignUp, handleContent } = useContext(ModalContext);
  const { setUser } = useContext(InfoContext)

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(loginUser(credential, password)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }
    );

    if (data) {
      setErrors(null);
      handleContent()
      setUser(data.user)
      window.scrollTo(0,0)
      return navigate("/");
    }
  };

  return (
    <div className="login-container">
      <RxCross1 className="close" onClick={handleContent} />
      {/* FORM FIELDS */}
      <form onSubmit={(e) => handleLoginSubmit(e)} className="form">
        <h2 className="login-header">Sign In</h2>
        {errors && (
          <div className="login__error__message font-light">
            The email or password you have enter does not exist in our records.
            Please try again.
          </div>
        )}

        <div className="field_container">
          <div className="field">
            <label htmlFor="email" className="label">
              Email<span className="asterisk">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="inputField"
              aria-label="email"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="password" className="label">
              Password<span className="asterisk">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="inputField"
              aria-label="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>


        {/* Login Button */}
        <div>
          <button aria-label="login" type="submit" className="login-button">
            Sign In
          </button>
        </div>
        <div className="create-account-link" aria-label="sign up" onClick={toggleSignUp}>
          Don't have an account?
        </div>
      </form>
    </div>
  );
}

export default LoginModal;
