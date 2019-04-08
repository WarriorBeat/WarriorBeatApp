// Screens

import { Navigation } from "react-native-navigation"
import Provider from "lib/RNNProvider"
import RootStore from "stores/rootStore"
import apolloProviderHOC from "./ApolloProviderHOC"

function registerScreens() {
  const rootStore = new RootStore()
  const store = {
    rootStore,
    uiStore: rootStore.uiStore,
    categoryStore: rootStore.categoryStore,
    userStore: rootStore.userStore,
  }
  Navigation.registerComponentWithRedux(
    "Home",
    () => apolloProviderHOC(require("screens").Home),
    Provider,
    store,
  )
  Navigation.registerComponentWithRedux(
    "Initializing",
    () => apolloProviderHOC(require("screens").Initializing),
    Provider,
    store,
  )
  Navigation.registerComponentWithRedux(
    "FeedView",
    () => apolloProviderHOC(require("screens").FeedView),
    Provider,
    store,
  )
  Navigation.registerComponentWithRedux(
    "Post.Article",
    () => apolloProviderHOC(require("components/Post").Article),
    Provider,
    store,
  )
  Navigation.registerComponentWithRedux(
    "Post.Poll",
    () => apolloProviderHOC(require("components/Poll").default),
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
