import React from "react"
import { useQuery } from "react-apollo"

export const useApolloQuery = (query, options, render) => {
  const { loading, error, data } = useQuery(query, options)
  if (loading) return <div>loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return render(data)
}
