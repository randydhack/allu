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
        <div>
            LOGO
        </div>

        <div className='nav__middle__section'>
            <NavLink>Our Designs</NavLink>
            <NavLink>Create your own designs</NavLink>
            <NavLink>About us</NavLink>
        </div>

        <div className='nav__right__section'>
            <button onClick={() => toggleLogin()}>Sign in</button>
            <div>ICON</div>
        </div>
    </div>
  )
}

export default Navbar
