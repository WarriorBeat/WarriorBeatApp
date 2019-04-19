/**
 * __tests__/PageWithHeader.test.js
 * Component Test
 * tests
 */
/* eslint-disable */

import React from "react"
import { shallow } from "react-native-testing-library"
import PageWithHeader from "../PageWithHeader"
import Providers from "tests"

test("should render correctly", () => {
  const tree = shallow(
    <Providers>
      <PageWithHeader title="Header" />
    </Providers>,
  )
  expect(tree).toMatchSnapshot()
})
