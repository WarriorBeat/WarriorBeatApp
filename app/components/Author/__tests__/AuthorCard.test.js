/**
 * __tests__/AuthorCard.test.js
 * Component Test
 * tests
 */
/* eslint-disable */

import React from "react"
import { render } from "react-native-testing-library"
import AuthorCard from "../AuthorCard"
import Providers, { Data } from "tests"

test("should render correctly", () => {
  const tree = render(
    <Providers>
      <AuthorCard author={Data.author()} />
    </Providers>,
  )
  expect(tree).toMatchSnapshot()
})
