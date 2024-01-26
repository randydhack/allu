import { useContext, useState } from "react";
import { ModalContext } from "../../context/modalContext";

// CSS / ICONS
import "./FormStyles.scss";
import { RxCross1 } from "react-icons/rx";

function SignUpModal() {
  // Set the type to null when clicking the close icon and closes the modal
  const { setType,  toggleLogin} = useContext(ModalContext);

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="signup-container">
      <RxCross1 className="close" onClick={() => setType(null)} />
      <form onSubmit={""} className="form">
        <h2 className="header">Create an Account</h2>

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="first_name" className="label">
              First Name<span className="asterisk">*</span>
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              className="inputField"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="last_name" className="label">
              Last Name<span className="asterisk">*</span>
            </label>
            <input
              type="last_name"
              id="last_name"
              name="last_name"
              className="inputField"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="password" className="label">
              Create a password<span className="asterisk">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="inputField"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Remember Me Toggle Button */}

        {/* Login Button */}
        <div>
          <button className="signup-button">Sign In</button>
        </div>

        <div className="login-link" onClick={() => toggleLogin()}>Already have an account?</div>
      </form>
    </div>
  );
}

export default SignUpModal;
