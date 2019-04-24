/**
 * __tests__/MenuButton.test.js
 * Component Test
 * tests
 */
/* eslint-disable */

import React from "react"
import { render } from "react-native-testing-library"
import { HeaderButton, FooterButton } from "../MenuButton"

test("should render HeaderButton correctly", () => {
  const tree = render(<HeaderButton title="Button" icon={{ name: "home", type: "Entypo" }} />)
  expect(tree).toMatchSnapshot()
})

test("should render FooterButton correctly", () => {
  const tree = render(<FooterButton title="Button" icon={{ name: "home", type: "Entypo" }} />)
  expect(tree).toMatchSnapshot()
})
