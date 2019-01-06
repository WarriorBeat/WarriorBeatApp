/**
 * __tests__/Header.test.js
 * Component Test
 * tests
 */

import React from "react"
import { shallow } from "enzyme"
import Header from "components/Header/Header"
import UIStore from "stores/uiStore"

const uiStore = new UIStore({})

describe("Testing Header Component", () => {
  it("renders as expected", () => {
    const wrapper = shallow(<Header.wrappedComponent uiStore={uiStore} />)
    expect(wrapper).toMatchSnapshot()
    wrapper.setProps({ active: true })
    expect(wrapper).toMatchSnapshot()
  })
})
