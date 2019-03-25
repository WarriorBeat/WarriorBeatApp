/**
 * queries.js
 * Graphql Queries
 * graphql
 */

import gql from "graphql-tag"
import { graphql } from "react-apollo"

export const FetchPolls = gql`
  query FetchPolls {
    pollList {
      items {
        id
        question
        createdOn(format: "MMM dd yyyy")
        isOpen
        lastUpdated
        totalVotes
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
    pollGet(id: $id) {
      id
      question
      createdOn(format: "MMM dd yyyy")
      isOpen
      lastUpdated
      totalVotes
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
      polls: data.pollList ? data.pollList.items : [],
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
      poll: data.pollGet ? data.pollGet : {},
    }),
  }),
}

export default queries
