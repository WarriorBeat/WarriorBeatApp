// Screens

import { Navigation } from "react-native-navigation"

export function registerScreens() {
  Navigation.registerComponent("Home", () => require("screens/index").Home)
  Navigation.registerComponent(
    "Initializing",
    () => require("screens/index").Initializing
  )
  Navigation.registerComponent(
    "FeedView",
    () => require("screens/index").FeedView
  )
  Navigation.registerComponent("Signin", () => require("screens/index").Signin)
  Navigation.registerComponent("Signup", () => require("screens/index").Signup)
  Navigation.registerComponent(
    "NavMenu",
    () => require("components/Menu/index").default
  )
  Navigation.registerComponent(
    "NavMenu.SubMenu",
    () => require("components/Menu/index").SubMenu
  )
}
