/**
 * queries.js
 * Graphql Queries
 * graphql
 */

import gql from "graphql-tag"

export const pollList = gql`
  query pollList {
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

export const pollGet = gql`
  query pollGet($id: ID!) {
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
