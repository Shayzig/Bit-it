import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AppHeader() {
    return (
        <div className="app-header">

            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/">Bit</NavLink>
            <NavLink to="/contact">Contacts</NavLink>
            <NavLink to="/charts">Charts</NavLink>

        </div>)
}
