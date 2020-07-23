import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "./header.css"
import { useAuth0 } from "@auth0/auth0-react"

const Header = ({ siteTitle }) => {
  const { isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0()
  const authFunction = isAuthenticated ? logout : loginWithRedirect
  const authText = isAuthenticated ? "Logout" : "Login"
  return (
    <header className="header">
      <div className="header-wrapper">
        <h1 className="header-text">
          <Link to="/" className="header-link">
            {siteTitle}
          </Link>
        </h1>
        {!isLoading && (
          <button className="auth-button" onClick={authFunction}>
            {authText}
          </button>
        )}
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
