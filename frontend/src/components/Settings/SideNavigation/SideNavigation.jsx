// Libaries
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie'

// Redux Store
import { logoutUser } from "../../../store/session";

// Icons
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineManageAccounts } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { IoLogOutOutline } from "react-icons/io5";

// CSS
import "./SideNavigation.scss";
import { useContext } from "react";
import { InfoContext } from "../../../context/infoContext";

function SideNavigation() {

  const { setUser } = useContext(InfoContext)


  const dispatch = useDispatch()

  const handleUserLogout = async (e) => {
    e.preventDefault()
    await dispatch(logoutUser())
    setUser(null)
  }


  return (
    <div className="side-navigation">
      <div className="setting__contents">
        <h2 className="setting-nav-header">Settings</h2>
        <div className="side-navigation__contents">
          <NavLink to='/account-details' className="side-navigation-links" aria-current="Account Details Page"><MdOutlineManageAccounts /> Account Details</NavLink>
          <NavLink to='/order-history' className="side-navigation-links"><TbTruckDelivery /> Order History</NavLink>
          <NavLink to='/change-email' className="side-navigation-links"><HiOutlineMail aria-hidden="true"/> Change Email</NavLink>
          <NavLink to='/change-password'className="side-navigation-links"><IoKeyOutline /> Change Password</NavLink>
          <NavLink to="/" className="side-navigation-links" onClick={e => handleUserLogout(e)}><IoLogOutOutline/> Log out</NavLink>
        </div>
      </div>
    </div>
  );
}

export default SideNavigation;
