import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function About() {
  return (
    <div>
      <nav>
        <Link replace to="/about/team" >Team</Link>
        <Link replace to="/about/vision" >Vision</Link>
      </nav>

      <section>
        <Outlet />
      </section>

    </div>
  )
}



//NESTEDROUTS