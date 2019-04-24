/**
 * __tests__/NavMenu.test.js
 * Component Test
 * tests
 */
/* eslint-disable */

import React from "react"
import { render, fireEvent } from "react-native-testing-library"
import Providers, { Data, store } from "tests"
import NavMenu from "../NavMenu"

test("should render correctly", () => {
  const tree = render(
    <Providers>
      <NavMenu />
    </Providers>,
  )
  expect(tree).toMatchSnapshot()
})
