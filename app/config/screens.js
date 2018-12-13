// Screens

import { Navigation } from "react-native-navigation"
import Provider from "lib/RNNProvider"
import RootStore from "stores/rootStore"

export function registerScreens() {
  const rootStore = new RootStore()
  const store = {
    rootStore: rootStore,
    postStore: rootStore.postStore
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
  Navigation.registerComponent("FeedView", () => require("screens").FeedView)
  Navigation.registerComponent(
    "Post.Article",
    () => require("components/Post").Article
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
