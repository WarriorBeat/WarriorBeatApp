/**
 * mutations.js
 * Graphql Mutations
 * graphql
 */

import gql from "graphql-tag"

// Vote Poll
export const pollAddVote = gql`
  mutation pollAddVote($optionId: ID!) {
    pollAddVote(optionId: $optionId) {
      totalVotes
      options {
        id
        text
        votes
      }
    }
  }
`

export default pollAddVote
