import { NavLink } from "react-router-dom";

import "./SideNavigation.scss";

function SideNavigation() {
  return (
    <div className="side-navigation side-navigation__left__border">
      <div className="setting__contents">
        <div className="setting__header setting__header__mb">Settings</div>
        <div className="side-navigation__contents">
          <NavLink>Account Details</NavLink>
          <NavLink>Order History</NavLink>
          <NavLink>Change Email</NavLink>
          <NavLink>Change Password</NavLink>
          <div>LOGOUT</div>
        </div>
      </div>
    </div>
  );
}

export default SideNavigation;
