// Libraries
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Context
import { ModalContext } from "../../context/modalContext";
import { InfoContext } from "../../context/infoContext";

// Redux Store
import { registerUser } from '../../store/session'

// CSS / ICONS
import "./FormStyles.scss";
import { RxCross1 } from "react-icons/rx";

function SignUpModal() {
  // Set the type to null when clicking the close icon and closes the modal
  const { toggleLogin, handleContent} = useContext(ModalContext);
  const {setUser} = useContext(InfoContext)


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(registerUser(email, firstName, lastName, password)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }
    );

    if (data) {
      setErrors({});
      handleContent()
      setUser(data)
      return navigate("/");
    }
  };

  return (
    <div className="signup-container">
      <RxCross1 className="close" onClick={handleContent} />
      <form onSubmit={e => handleSignupSubmit(e)} className="form">
        <h2 className="header">Create an Account</h2>

        {/* FORM FIELDS */}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="signup__error_msg">{errors.email}</div>}
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
            {password && password.length < 6 && <div className="signup__error_msg">Password length must be 6 characters or more</div>}
          </div>
        </div>

        {/* Remember Me Toggle Button */}

        {/* Signup Bottom */}
        <div>
          <button type='submit' className="signup-button">Sign Up</button>
        </div>

        <div className="login-link" onClick={() => toggleLogin()}>Already have an account?</div>
      </form>
    </div>
  );
}

export default SignUpModal;
