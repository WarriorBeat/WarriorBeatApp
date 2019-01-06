/**
 * __tests__/Input.test.js
 * Component Test
 * tests
 */

import React from "react"
import { shallow } from "enzyme"

import Input from "components/Input"

describe("Testing Input Component", () => {
  it("renders as expected", () => {
    const wrapper = shallow(<Input label="Label" />)
    expect(wrapper).toMatchSnapshot()
  })
})
