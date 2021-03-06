// Screens

import { Navigation } from "react-native-navigation"
import Provider from "lib/RNNProvider"
import RootStore from "stores/rootStore"
import apolloProviderHOC, { client } from "./ApolloProviderHOC"

export const rootStore = new RootStore(client)
const store = {
  rootStore,
  uiStore: rootStore.uiStore,
  userStore: rootStore.userStore,
  homeStore: rootStore.homeStore,
}

function registerScreens() {
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
    () => apolloProviderHOC(require("screens/Account").Authenticator),
    Provider,
    store,
  )
  Navigation.registerComponentWithRedux(
    "Author.Profile",
    () => apolloProviderHOC(require("screens/Author").default),
    Provider,
    store,
  )
  Navigation.registerComponentWithRedux(
    "Meta.AboutUs",
    () => apolloProviderHOC(require("screens/Meta").AboutUs),
    Provider,
    store,
  )
  Navigation.registerComponentWithRedux(
    "Meta.MeetTheStaff",
    () => apolloProviderHOC(require("screens/Meta").MeetTheStaff),
    Provider,
    store,
  )
}

export default registerScreens
