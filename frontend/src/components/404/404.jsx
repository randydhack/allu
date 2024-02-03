import React from 'react'
import { NavLink } from 'react-router-dom'
import './404.scss'
import logo from './computer.png'

function PageNotFound() {
    return (
        <div className='nfp-parent'>
            <img className='nfp-logo' src={logo}></img>
            <p className='nfp-404'>
                404 Page not found
            </p>
            <p className='nfp-home'>
                <NavLink aria-label="home" to='/'>Go Home</NavLink>
            </p>
        </div>
    )
}

export default PageNotFound