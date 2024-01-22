// Libaries
import { useState } from "react";

// CSS
import "./AccountDetail.scss";
import "../../utils/DefaultStyles.scss";
import "../Settings.scss"

// Components
import SideNavigation from "../SideNavigation/SideNavigation";

function AccountDetail() {
  return (
    <div className="container">
      <div className="settings">
        <SideNavigation />
        <div>AccountDetail</div>
      </div>
    </div>
  );
}

export default AccountDetail;
