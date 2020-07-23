import React from "react"
import { Auth0Wrapper } from "../auth0/auth0Provider"
import { ApolloWrapper } from "../apollo/apolloProvider"

export const wrapRootElement = ({ element }) => (
  <Auth0Wrapper>
    <ApolloWrapper>{element}</ApolloWrapper>
  </Auth0Wrapper>
)
