/**
 * __tests__/SideMenu.test.js
 * Component Test
 * tests
 */
/* eslint-disable */

import React from "react"
import { render, fireEvent } from "react-native-testing-library"
import Providers, { Data, store } from "tests"
import { Text } from "react-native"
import SideMenu from "../SideMenu"

test("should render correctly", () => {
  const tree = render(
    <SideMenu>
      <Text>Hi</Text>
    </SideMenu>,
  )
  expect(tree).toMatchSnapshot()
})

test("should render with logo", () => {
  const tree = render(
    <SideMenu logo>
      <Text>Hi</Text>
    </SideMenu>,
  )
  expect(tree).toMatchSnapshot()
})

test("should render with header, footer, logo", () => {
  const tree = render(
    <SideMenu logo header={<Text>Hi</Text>} footer={<Text>Hi</Text>}>
      <Text>Hi</Text>
    </SideMenu>,
  )
  expect(tree).toMatchSnapshot()
})
