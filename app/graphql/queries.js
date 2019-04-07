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

export const categoryList = gql`
  query categoryList {
    categoryList {
      items {
        id
        name
      }
    }
  }
`

export const articleGetByCategory = gql`
  query articleGetByCategory($categoryId: ID!) {
    articleGetByCategory(categoryId: $categoryId) {
      id
      title
      coverImage {
        id
        url
      }
      author {
        id
        profileImage {
          id
          url
        }
      }
    }
  }
`

export const articleGet = gql`
  query articleGet($id: ID!) {
    articleGet(id: $id) {
      id
      createdOn(format: "MMM dd yyyy")
      lastUpdated
      title
      content
      categories {
        id
        name
      }
      coverImage {
        id
        createdOn(format: "MMM dd yyyy")
        lastUpdated
        credits
        caption
        url
      }
      author {
        id
        name
        title
        bio
        staffYear
        gradeYear
        profileImage {
          id
          url
        }
      }
    }
  }
`
