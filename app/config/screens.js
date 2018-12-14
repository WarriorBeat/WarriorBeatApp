// Screens

import { Navigation } from "react-native-navigation"
import Provider from "lib/RNNProvider"
import RootStore from "stores/rootStore"

export function registerScreens() {
  const rootStore = new RootStore()
  const store = {
    rootStore: rootStore,
    postStore: rootStore.postStore,
    categoryStore: rootStore.categoryStore
  }
  Navigation.registerComponentWithRedux(
    "Home",
    () => require("screens").Home,
    Provider,
    store
  )
  Navigation.registerComponent(
    "Initializing",
    () => require("screens").Initializing
  )
  Navigation.registerComponentWithRedux(
    "FeedView",
    () => require("screens").FeedView,
    Provider,
    store
  )
  Navigation.registerComponentWithRedux(
    "Post.Article",
    () => require("components/Post").Article,
    Provider,
    store
  )
  Navigation.registerComponentWithRedux(
    "NavMenu",
    () => require("components/Menu").default,
    Provider,
    store
  )
  Navigation.registerComponent(
    "NavMenu.SubMenu",
    () => require("components/Menu").SubMenu
  )
}
