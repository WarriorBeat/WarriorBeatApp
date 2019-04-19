/**
 * __tests__/Logo.test.js
 * Component Test
 * tests
 */
/* eslint-disable */

import React from "react"
import { shallow } from "react-native-testing-library"
import Logo from "../Logo"

test("should render correctly", () => {
  const tree = shallow(<Logo />)
  expect(tree).toMatchSnapshot()
})
