/**
 * graphql.js
 * Graphql Operations
 * api
 */

import gql from "graphql-tag"
import { graphql } from "react-apollo"

// Fetch Polls
export const FetchPolls = gql`
  query FetchPolls {
    listPolls {
      items {
        pollId
        question
        date
        total_votes
        status
        answers {
          answerId
          answer
          votes
        }
      }
    }
  }
`

export const operations = {
  FetchPolls: graphql(FetchPolls, {
    options: {
      fetchPolicy: "network-only",
    },
    props: ({ data }) => ({
      loading: data.loading,
      polls: data.listPolls.items,
    }),
  }),
}
