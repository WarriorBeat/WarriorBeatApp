/**
 * __tests__/Header.test.js
 * Component Test
 * tests
 */

import React from "react"
import { shallow } from "enzyme"
import sinon from "sinon"

import Header from "components/Header/Header"
import UIStore from "stores/uiStore"

describe("Testing Header Component", () => {
  it("renders as expected", () => {
    const uiStore = new UIStore({})
    const wrapper = shallow(<Header.wrappedComponent uiStore={uiStore} />)
    expect(wrapper).toMatchSnapshot()
    wrapper.setProps({ active: true })
    expect(wrapper).toMatchSnapshot()
  })

  it("calls action as expected when pressing return component", () => {
    const uiStore = new UIStore({})
    const wrapper = shallow(<Header.wrappedComponent uiStore={uiStore} />)
    const returnChild = shallow(wrapper.prop("leftComponent"))
    const uiGoBackSpy = sinon.spy(uiStore, "goBack")
    returnChild.simulate("press")
    expect(uiGoBackSpy.calledOnce).toBe(true)
  })
})
