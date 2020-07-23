import React from "react"
import { Auth0Provider } from "@auth0/auth0-react"

export const Auth0Wrapper = ({ children }) => {
  const domain = process.env.GATSBY_AUTH0_DOMAIN
  const clientId = process.env.GATSBY_AUTH0_CLIENT_ID
  const origin = typeof window !== "undefined" ? window.location.origin : ""
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={origin}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  )
}
