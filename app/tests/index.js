/**
 * __tests__/index.js
 * Testing Environment
 * tests
 */
/* eslint-disable */
jest.autoMockOff()

import React from "react"
import RootStore from "stores/rootStore"
import { MockedProvider } from "react-apollo/test-utils"
import { Provider as MobxProvider } from "mobx-react/native"
import * as gqlMock from "./graphql"
import * as Data from "./data"

global.fetch = require("node-fetch")

jest.mock("stores/userStore")
jest.mock("stores/uiStore")
jest.mock("stores/component/homeStore")
export const rootStore = new RootStore()

export const store = {
  rootStore,
  uiStore: rootStore.uiStore,
  userStore: rootStore.userStore,
  homeStore: rootStore.homeStore,
}

const Providers = ({ mocks, children }) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <MobxProvider {...store}>{children}</MobxProvider>
  </MockedProvider>
)

export default Providers
export { gqlMock, Data }
