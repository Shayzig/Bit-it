import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AppHeader() {
    return (
        <>
            <div className="app-header">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login">Login</NavLink>
                {/* <NavLink to="/about">About</NavLink> */}
                <div className="logo-bg">
                    <NavLink to="/"><img className='logo' src="src/assets/imgs/bit.png" alt="" /></NavLink>
                </div>
                <NavLink to="/contact">Contacts</NavLink>
                <NavLink to="/chart">Charts</NavLink>
            </div>
            <div className="app-header-mobile">
                <NavLink to="/"><img className='logo' src="src/assets/imgs/bit.png" alt="" /></NavLink>
            </div>
        </>
    )
}
