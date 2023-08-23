import React from 'react'
import { NavLink } from 'react-router-dom'
import logoImage from '../assets/imgs/bit.png';

export default function AppHeader() {
    return (
        <>
            <div className="app-header">
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/">Login</NavLink>
                <div className="logo-bg"> <NavLink to="/home"><img className='logo' src={logoImage} alt="" /></NavLink></div>
                <NavLink to="/contact">Contacts</NavLink>
                <NavLink to="/chart">Stats</NavLink>
            </div>
        </>
    )
}


{/* <NavLink to="/about">About</NavLink> */ }
