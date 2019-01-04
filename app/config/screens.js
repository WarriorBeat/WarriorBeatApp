// Screens

import { Navigation } from "react-native-navigation"
import Provider from "lib/RNNProvider"
import RootStore from "stores/rootStore"

function registerScreens() {
  const rootStore = new RootStore()
  const store = {
    rootStore,
    uiStore: rootStore.uiStore,
    postStore: rootStore.postStore,
    categoryStore: rootStore.categoryStore,
    pollStore: rootStore.pollStore,
    userStore: rootStore.userStore,
  }
  Navigation.registerComponentWithRedux("Home", () => require("screens").Home, Provider, store)
  Navigation.registerComponentWithRedux(
    "Initializing",
    () => require("screens").Initializing,
    Provider,
    store,
  )
  Navigation.registerComponentWithRedux(
    "FeedView",
    () => require("screens").FeedView,
    Provider,
    store,
  )
  Navigation.registerComponentWithRedux(
    "Post.Article",
    () => require("components/Post").Article,
    Provider,
    store,
  )
  Navigation.registerComponentWithRedux(
    "Post.Poll",
    () => require("components/Poll").default,
    Provider,
    store,
  )
  Navigation.registerComponentWithRedux(
    "NavMenu",
    () => require("components/Menu").default,
    Provider,
    store,
  )
  Navigation.registerComponent("NavMenu.SubMenu", () => require("components/Menu").SubMenu)
  Navigation.registerComponentWithRedux(
    "Account.Authenticator",
    () => require("screens/Account").Authenticator,
    Provider,
    store,
  )
  Navigation.registerComponentWithRedux(
    "Author.Profile",
    () => require("screens/Author").default,
    Provider,
    store,
  )
}

export default registerScreens
