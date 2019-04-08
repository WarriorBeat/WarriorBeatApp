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

const pollQueries = {
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

const categoryQueries = {
  category: {
    categoryList: graphql(query.categoryList, {
      options: ({ categorySortOrder }) => ({
        fetchPolicy: "cache-and-network",
        variables: {
          sortOrder: categorySortOrder,
        },
      }),
      props: ({ data }) => ({
        loading: data.loading,
        categories: data.categoryList ? data.categoryList.items : [],
      }),
    }),
  },
}

const articleQueries = {
  article: {
    articleGet: graphql(query.articleGet, {
      options: ({ post }) => ({
        fetchPolicy: "cache-and-network",
        variables: {
          id: post.id,
        },
      }),
      props: ({ data }) => ({
        loading: data.loading,
        post: data.articleGet ? data.articleGet : {},
      }),
    }),
    articleList: graphql(query.articleList, {
      options: {
        fetchPolicy: "cache-and-network",
      },
      props: ({ data }) => ({
        loading: data.loading,
        articles: data.articleList ? data.articleList.items : [],
      }),
    }),
    articleGetByCategory: graphql(query.articleGetByCategory, {
      options: ({ category }) => ({
        fetchPolicy: "cache-and-network",
        variables: {
          categoryId: category.id,
        },
      }),
      props: ({ data }) => ({
        loading: data.loading,
        articles: data.articleGetByCategory ? data.articleGetByCategory : [],
      }),
    }),
  },
}

export const queries = {
  ...pollQueries,
  ...categoryQueries,
  ...articleQueries,
}

export const mutations = {
  poll: {
    pollAddVote: graphqlMutation(mutate.pollAddVote, query.pollList, "Poll"),
  },
}

/*
  PropTypes for GraphQL Sourced Data
*/

const PollTypes = {
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

const CategoryTypes = {
  category: types.shape({
    id: types.string,
    name: types.string,
  }),
}

const PostTypes = {
  author: types.shape({
    id: types.string,
    user: types.string,
    name: types.string,
    profileImage: types.shape({
      id: types.string,
      url: types.string,
    }),
    posts: types.arrayOf(types.object),
    title: types.string,
    bio: types.string,
    staffYear: types.number,
    gradeYear: types.number,
  }),
}

const MediaTypes = {
  media: types.shape({
    id: types.string,
    createdOn: types.string,
    lastUpdated: types.string,
    credits: types.string,
    caption: types.string,
    source: types.string,
    url: types.url,
    author: PostTypes.author,
  }),
}

const ArticleTypes = {
  article: types.shape({
    id: types.string,
    createdOn: types.string,
    lastUpdated: types.string,
    author: PostTypes.author,
    title: types.string,
    categories: types.arrayOf(CategoryTypes.category),
    content: types.string,
    coverImage: MediaTypes.media,
  }),
}

export const PropTypes = {
  ...PollTypes,
  ...CategoryTypes,
  ...PostTypes,
  ...ArticleTypes,
}
