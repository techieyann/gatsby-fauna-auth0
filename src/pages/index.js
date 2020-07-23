import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { gql } from "apollo-boost"
import { useApolloQuery } from "../apollo/query"

const IndexPage = ({
  data: {
    fauna: {
      allHabits: { data: habits },
    },
  },
}) => {
  const tasks = useApolloQuery(
    GET_TASKS,
    {
      pollInterval: 25000,
    },
    data => {
      return (
        !!data &&
        !!data.allTasks &&
        !!data.allTasks.data && (
          <ul>
            {data.allTasks.data.map(task => (
              <li key={task._id}>
                {task.name} ({task.category.name})
              </li>
            ))}
          </ul>
        )
      )
    }
  )
  return (
    <Layout>
      <SEO title="Home" />
      <ul>
        {habits.map(habit => (
          <li key={habit._id}>
            {habit.task.name} @ {habit.frequency}seconds
          </li>
        ))}
      </ul>
      {tasks}
    </Layout>
  )
}

// Query for fetching on the server
export const query = graphql`
  {
    fauna {
      allHabits {
        data {
          _id
          frequency
          goal
          task {
            name
          }
        }
      }
    }
  }
`
// Query for fetching on the client
const GET_TASKS = gql`
  query GetTasks {
    allTasks {
      data {
        _id
        name
        category {
          name
        }
      }
    }
  }
`

export default IndexPage
