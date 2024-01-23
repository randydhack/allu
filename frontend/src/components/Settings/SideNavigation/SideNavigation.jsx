import { NavLink } from "react-router-dom";

import "./SideNavigation.scss";

function SideNavigation() {
  return (
    <div className="side-navigation side-navigation__left__border">
      <div className="setting__contents">
        <div className="setting__header setting__header__mb">Settings</div>
        <div className="side-navigation__contents">
          <NavLink className="side-navigation-links">Account Details</NavLink>
          <NavLink className="side-navigation-links">Order History</NavLink>
          <NavLink className="side-navigation-links">Change Email</NavLink>
          <NavLink className="side-navigation-links">Change Password</NavLink>
          <div>LOGOUT</div>
        </div>
      </div>
    </div>
  );
}

export default SideNavigation;
