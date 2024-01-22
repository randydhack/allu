// Libaries
import { useState } from "react";

// CSS
import "./AccountDetail.scss";
import "../../utils/DefaultStyles.scss";
import "../Settings.scss";

// Components
import SideNavigation from "../SideNavigation/SideNavigation";

function AccountDetail() {
  return (
    <div className="container">
      <div className="setting__container">
        <SideNavigation />
        <div className="setting__contents account-detail-background pr-56">
          {/* HEADING */}
          <div className="setting__header__mb">
            <h2 className="setting__header">Account Details</h2>
            <hr className="setting__divider"></hr>
          </div>

          {/* Contents */}
          <div>
            <div>
              <div>Email Address</div>
              <div className="font-light">johndoe@yahoo.com</div>
            </div>

            <form className="account-form">
              <div className="account-form__field">
                <label htmlFor="first_name">First Name</label>
                <input type="text" id="first_name" name="first_name"/>
              </div>

              <div className="account-form__field">
                <label htmlFor="last_name">Last Name</label>
                <input type="text" id="last_name" name="last_name"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDetail;
