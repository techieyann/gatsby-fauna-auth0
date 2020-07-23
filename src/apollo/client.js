import ApolloClient from "apollo-boost"
import fetch from "isomorphic-fetch"

export const getClient = key =>
  new ApolloClient({
    uri: "https://graphql.fauna.com/graphql",
    fetch,
    request: operation => {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${key || process.env.GATSBY_FAUNA_CLIENT}`,
        },
      })
    },
  })
