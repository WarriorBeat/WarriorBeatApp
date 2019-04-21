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

export const authorList = {
  request: {
    query: query.authorList,
  },
  result: {
    data: {
      authorList: {
        items: [Data.author(), Data.author(), Data.author()],
      },
    },
  },
}
