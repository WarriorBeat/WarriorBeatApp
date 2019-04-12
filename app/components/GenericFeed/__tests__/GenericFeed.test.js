/**
 * __tests__/GenericFeed.test.js
 * Component Test
 * tests
 */
/* eslint-disable */

import React from "react"
import { render, shallow } from "react-native-testing-library"
import * as query from "graphql/queries"
import Providers from "tests"
import GenericFeed from "../GenericFeed"

const mocks = [
  {
    request: {
      query: query.pollList,
    },
    result: {
      data: {
        pollList: {
          items: [
            {
              id: "1",
              question: "Yes or No?",
              createdOn: "Feb 12 2019",
              isOpen: true,
              lastUpdated: "2019-02-06T19:01:35.758Z",
              totalVotes: 4,
              options: [
                {
                  id: "0",
                  text: "Yes",
                  votes: 3,
                },
                {
                  id: "1",
                  text: "No",
                  votes: 1,
                },
              ],
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: query.articleGetByCategory,
      variables: {
        categoryId: "0",
      },
      result: {
        data: {
          articleGetByCategory: {
            id: "1",
            title: "A Cool Article",
            coverImage: {
              id: "1",
              url: "https://via.placeholder.com/200",
            },
            author: {
              id: "1",
              profileImage: {
                id: "2",
                url: "https://via.placeholder.com/200",
              },
            },
          },
        },
      },
    },
  },
]

test("should render correctly", () => {
  const tree = shallow(<GenericFeed />)
  expect(tree).toMatchSnapshot()
})

test("should render data", () => {
  const tree = render(
    <Providers mocks={mocks}>
      <GenericFeed willPolls category={{ id: "0" }} />
    </Providers>,
  )
  expect(tree).toMatchSnapshot()
})
