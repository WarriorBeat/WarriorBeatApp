/**
 * __tests__/Social.test.js
 * Component Test
 * tests
 */
/* eslint-disable */

import React from "react"
import { shallow, render } from "react-native-testing-library"
import Social, { SocialButton } from "../Social"

test("should render correctly", () => {
  const tree = render(<Social />)
  expect(tree).toMatchSnapshot()
})

test("should have 3 elements", () => {
  const { getAllByType } = render(<Social />)
  const buttons = getAllByType(SocialButton)

  expect(buttons).toHaveLength(3)
})

test("should render lightly", () => {
  const tree = render(<Social light={true} />)
  expect(tree).toMatchSnapshot()
})

test("should render lightly and with 3% padding", () => {
  const tree = render(<Social light={true} hPad="3%" />)
  expect(tree).toMatchSnapshot()
})
