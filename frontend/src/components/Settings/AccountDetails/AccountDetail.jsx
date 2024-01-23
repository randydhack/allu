// Libaries
import { useState } from "react";

// CSS
import "./AccountDetail.scss";
import "../../utils/DefaultStyles.scss";
import "../Settings.scss";

// Components
import SideNavigation from "../SideNavigation/SideNavigation";

function AccountDetail() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
        <div className="setting__contents setting__background">
          {/* HEADING */}
          <div className="setting__header__mb">
            <h2 className="setting__header">Account Details</h2>
            <hr className="setting__divider"></hr>
          </div>

          {/* Contents */}
          <div className="account-form__content__container">
            <div>
              <div>Email Address</div>
              <div className="font-light">johndoe@yahoo.com</div>
            </div>

            {/* Form for updating first name and last name */}
            <form className="account-form" onSubmit={()=>''}>
              <div className="account-form__field">
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="account-form__input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="account-form__field">
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="account-form__input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </form>

          </div>
        </div>
  );
}

export default AccountDetail;
