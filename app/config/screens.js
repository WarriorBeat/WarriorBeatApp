// Screens

import { Navigation } from "react-native-navigation"

export function registerScreens() {
  Navigation.registerComponent("Home", () => require("screens").Home)
  Navigation.registerComponent(
    "Initializing",
    () => require("screens").Initializing
  )
  Navigation.registerComponent("FeedView", () => require("screens").FeedView)
  Navigation.registerComponent(
    "Post.Article",
    () => require("components/Post").Article
  )
  Navigation.registerComponent(
    "NavMenu",
    () => require("components/Menu").default
  )
  Navigation.registerComponent(
    "NavMenu.SubMenu",
    () => require("components/Menu").SubMenu
  )
}
