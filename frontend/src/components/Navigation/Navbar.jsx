// Libaries
import {useContext} from 'react'
import { NavLink } from 'react-router-dom'
// Context
import { ModalContext } from '../../context/modalContext'

// Components
import LoginModal from '../Modals/LoginModal'
import SignUpModal from '../Modals/SignUpModal'

// CSS
import './Navbar.scss'

function Navbar() {

    const { toggleLogin, toggleSignUp} = useContext(ModalContext)

  return (
    <div className='nav__container'>
        <NavLink to="/">
            <img className="nav_logo" src="t_shirt_logo.png" alt="all-u logo, click to return to home page" />
        </NavLink>

        <div className='nav__middle__section'>
            <NavLink to="/our-designs">Our Designs</NavLink>
            <NavLink>Create your own designs</NavLink>
            <NavLink>About us</NavLink>
        </div>

        <div className='nav__right__section'>
            <button onClick={() => toggleLogin()}>Sign in</button>
            <button onClick={() => toggleSignUp()}>Register</button>
            <button><i className="fa-solid fa-cart-shopping"></i></button>
        </div>
    </div>
  )
}

export default Navbar
