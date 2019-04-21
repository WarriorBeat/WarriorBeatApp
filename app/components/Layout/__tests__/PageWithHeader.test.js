/**
 * __tests__/PageWithHeader.test.js
 * Component Test
 * tests
 */
/* eslint-disable */

import React from "react"
import { render, fireEvent } from "react-native-testing-library"
import PageWithHeader from "../PageWithHeader"
import Providers, { store } from "tests"
import { Icon } from "react-native-elements"

test("should render correctly", () => {
  const tree = render(
    <Providers>
      <PageWithHeader title="Header" />
    </Providers>,
  )
  expect(tree).toMatchSnapshot()
})

test("back arrow should return", () => {
  const { getByType } = render(
    <Providers>
      <PageWithHeader title="Header" />
    </Providers>,
  )
  const arrow = getByType(Icon)
  fireEvent(arrow, "press")
  expect(store.uiStore.goBack).toHaveBeenCalled()
})
