/**
 * __tests__/index.js
 * Testing Environment
 * tests
 */
/* eslint-disable */
import React from "react"
import RootStore from "stores/rootStore"
import { MockedProvider } from "react-apollo/test-utils"
import { Provider as MobxProvider } from "mobx-react/native"

export const rootStore = new RootStore()
export const store = {
  rootStore,
  uiStore: RootStore.uiStore,
  userStore: RootStore.userStore,
}

const Providers = ({ mocks, children }) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <MobxProvider {...store}>{children}</MobxProvider>
  </MockedProvider>
)

export default Providers
