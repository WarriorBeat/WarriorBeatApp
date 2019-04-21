/**
 * __tests__/graphql.js
 * GraphQL Mock Data
 * tests
 */
/* eslint-disable */

import * as query from "graphql/queries"
import * as Data from "./data"

export const authorGet = {
  request: {
    query: query.authorGet,
  },
  result: {
    data: {
      authorGet: Data.author(),
    },
  },
}
