import React from "react"
import { ApolloProvider } from "react-apollo"
import { useAuth0 } from "@auth0/auth0-react"
import { getClient } from "./client"

const AUTH_PROP_KEY = "https://faunadb.com/id/secret"

export const ApolloWrapper = ({ children }) => {
  const { user } = useAuth0()

  const client = getClient(user && user[AUTH_PROP_KEY])
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
