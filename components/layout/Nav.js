import React from 'react'
import Link from 'next/link'

const Nav = () => {
  return (
    <nav className="navbar is-light">
      <div className="container">
        <div className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item">
              <Link href="/">
                <a>Home</a>
              </Link>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <Link href="/login">
                <a>Login</a>
              </Link>
            </div>
            <div className="navbar-item">
              <Link href="/register">
                <a>Register</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
