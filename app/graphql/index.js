/**
 * index.js
 * Index Exports for Graphql Operations
 * graphql
 */

import { graphql } from "react-apollo"
import { graphqlMutation } from "aws-appsync-react"
import * as query from "./queries"
import * as mutate from "./mutations"

export const queries = {
  poll: {
    pollList: graphql(query.pollList, {
      options: {
        fetchPolicy: "cache-and-network",
      },
      props: ({ data }) => ({
        loading: data.loading,
        polls: data.pollList ? data.pollList.items : [],
      }),
    }),
    getPoll: graphql(query.pollGet, {
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
  },
}

export const mutations = {
  poll: {
    pollAddVote: graphqlMutation(mutate.pollAddVote, query.pollList, "Poll"),
  },
}
