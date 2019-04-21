/**
 * __tests__/MeetTheStaff.test.js
 * Component Test
 * tests
 */
/* eslint-disable */

import React from "react"
import { render } from "react-native-testing-library"
import MeetTheStaff from "../MeetTheStaff"
import Providers, { gqlMock } from "tests"

const mocks = [gqlMock.authorList]

test("should render correctly", () => {
  const tree = render(
    <Providers mocks={mocks}>
      <MeetTheStaff />
    </Providers>,
  )
  expect(tree).toMatchSnapshot()
})
