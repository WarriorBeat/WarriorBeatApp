/**
 * queries.js
 * Graphql Queries
 * graphql
 */

import gql from "graphql-tag"

export const pollList = gql`
  query pollList($userId: ID!) {
    pollList {
      items {
        id
        question
        createdOn(format: "MMM dd yyyy")
        isOpen
        lastUpdated
        totalVotes
        hasVoted(userId: $userId) {
          id
          text
        }
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
  query pollGet($id: ID!, $userId: ID!) {
    pollGet(id: $id) {
      id
      question
      createdOn(format: "MMM dd yyyy")
      isOpen
      lastUpdated
      totalVotes
      hasVoted(userId: $userId) {
        id
        text
      }
      options {
        id
        text
        votes
      }
    }
  }
`

export const categoryList = gql`
  query categoryList($sortOrder: SortOrderInput!) {
    categoryList(sortOrder: $sortOrder) {
      items {
        id
        name
        slug
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

export const articleList = gql`
  query articleList {
    articleList {
      items {
        id
        createdOn(format: "MMM dd yyyy")
        title
        coverImage {
          id
          url
        }
      }
    }
  }
`

export const authorGet = gql`
  query authorGet($id: ID!) {
    authorGet(id: $id) {
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
      posts {
        id
        title
        createdOn(format: "MMM dd yyyy")
        categories {
          id
          name
        }
        coverImage {
          id
          url
        }
      }
    }
  }
`

export const authorList = gql`
  query authorList {
    authorList {
      items {
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

export const userGet = gql`
  query userGet($id: ID!) {
    userGet(id: $id) {
      id
      username
      email
    }
  }
`

export const metaGet = gql`
  query metaGet($key: String!) {
    metaGet(key: $key) {
      key
      content
    }
  }
`
