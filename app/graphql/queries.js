/**
 * queries.js
 * Graphql Queries
 * graphql
 */

import gql from "graphql-tag"
import { graphql } from "react-apollo"

export const FetchPolls = gql`
  query FetchPolls {
    listPolls {
      items {
        id
        question
        created_at
        options {
          id
          text
          votes
        }
      }
    }
  }
`

export const GetPoll = gql`
  query getPoll($id: ID!) {
    getPoll(id: $id) {
      id
      question
      created_at
      updated_at
      options {
        id
        text
        votes
      }
    }
  }
`

const queries = {
  fetchPolls: graphql(FetchPolls, {
    options: {
      fetchPolicy: "cache-and-network",
    },
    props: ({ data }) => ({
      loading: data.loading,
      polls: data.listPolls ? data.listPolls.items : [],
    }),
  }),
  getPoll: graphql(GetPoll, {
    options: ({ pollId }) => ({
      fetchPolicy: "network-only",
      variables: {
        id: pollId,
      },
    }),
    props: ({ data }) => ({
      loading: data.loading,
      poll: data.getPoll ? data.getPoll : {},
    }),
  }),
}

export default queries
