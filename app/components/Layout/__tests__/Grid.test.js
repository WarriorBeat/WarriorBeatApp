/**
 * __tests__/Grid.test.js
 * Component Test
 * tests
 */
/* eslint-disable */

import React from "react"
import { shallow, render } from "react-native-testing-library"
import { Grid } from "react-native-easy-grid"
import { Row, Col } from "../Grid"

test("should render correctly", () => {
  const tree = shallow(
    <Grid>
      <Row />
      <Col />
    </Grid>,
  )
  expect(tree).toMatchSnapshot()
})

test("should be centered with padding", () => {
  const tree = render(
    <Grid>
      <Row center="center" />
      <Row vPad="2%" hPad="2%" />
      <Col center="center" justify="flex-start" />
      <Col vPad="2%" hPad="2%" />
    </Grid>,
  )
  expect(tree).toMatchSnapshot()
})
