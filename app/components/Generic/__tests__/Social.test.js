/**
 * __tests__/Social.test.js
 * Component Test
 * tests
 */
/* eslint-disable */

import React from "react"
import { shallow, render, fireEvent } from "react-native-testing-library"
import Social, { SocialButton } from "../Social"

test("should render correctly", () => {
  const tree = shallow(<Social />)
  expect(tree).toMatchSnapshot()
})

test("should have 3 elements", () => {
  const { getAllByType } = render(<Social />)
  const buttons = getAllByType(SocialButton)

  expect(buttons).toHaveLength(3)
})
