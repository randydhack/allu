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

function SideNavigation() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleUserLogout = async (e) => {
    e.preventDefault()
    await dispatch(logoutUser())
    return navigate('/')
  }


  return (
    <div className="side-navigation side-navigation__left__border">
      <div className="setting__contents">
        <div className="setting__header setting__header__mb">Settings</div>
        <div className="side-navigation__contents">
          <NavLink to='/account-details' className="side-navigation-links"><MdOutlineManageAccounts /> Account Details</NavLink>
          <NavLink to='/order-history' className="side-navigation-links"><TbTruckDelivery /> Order History</NavLink>
          <NavLink to='/change-email' className="side-navigation-links"><HiOutlineMail /> Change Email</NavLink>
          <NavLink to='/change-password'className="side-navigation-links"><IoKeyOutline /> Change Password</NavLink>
          <div className="side-navigation-links" onClick={e => handleUserLogout(e)}><IoLogOutOutline/> Log out</div>
        </div>
      </div>
    </div>
  );
}

export default SideNavigation;
