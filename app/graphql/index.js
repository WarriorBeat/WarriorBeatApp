/**
 * index.js
 * Index Exports for Graphql Operations
 * graphql
 */

import { graphql } from "react-apollo"
import { graphqlMutation } from "aws-appsync-react"
import { PropTypes as types } from "prop-types"
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

/*
  PropTypes for GraphQL Sourced Data
*/
export const PropTypes = {
  poll: types.shape({
    id: types.string,
    question: types.string,
    createdOn: types.string,
    isOpen: types.bool,
    lastUpdated: types.string,
    totalVotes: types.number,
    options: types.arrayOf(
      types.shape({
        id: types.string,
        text: types.string,
        votes: types.number,
      }),
    ),
  }),
  pollOption: types.shape({
    id: types.string,
    text: types.string,
    votes: types.number,
  }),
}
