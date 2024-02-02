import React from 'react'
import { NavLink } from 'react-router-dom'
import './404.scss'
import logo from './404.png'

function PageNotFound() {
    return (
        <div className='nfp-parent'>
            <img src={logo}></img>
            <p className='nfp-404'>
                Page not found
            </p>
            <p className='nfp-home'>
                <NavLink to='/'>Go Home</NavLink>
            </p>
        </div>
    )
}

export default PageNotFound