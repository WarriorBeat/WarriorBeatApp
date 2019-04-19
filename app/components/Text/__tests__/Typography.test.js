/**
 * __tests__/Typography.test.js
 * Component Test
 * tests
 */
/* eslint-disable */

import React from "react"
import { render } from "react-native-testing-library"
import * as Typo from "../Typography"
import { View } from "react-native"

test("should render correctly", () => {
  const tree = render(
    <View>
      <Typo.Header>Hello!</Typo.Header>
      <Typo.Body Content="Hello!" />
    </View>,
  )
  expect(tree).toMatchSnapshot()
})

test("should render HTML correctly", () => {
  const tree = render(<Typo.HTMLBody Content="<p>Hello!</p>" />)
  expect(tree).toMatchSnapshot()
})
