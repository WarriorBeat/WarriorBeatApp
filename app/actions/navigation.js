// navigation.js

import { Navigation } from "react-native-navigation"
import PostStore from "../stores/postStore"

// Home Screen
export const goHome = () =>
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          stack: {
            children: [
              {
                component: {
                  name: "NavMenu",
                  id: "PrimaryNavMenu",
                  passProps: {
                    store: PostStore
                  }
                }
              }
            ]
          }
        },
        center: {
          stack: {
            children: [
              {
                component: {
                  name: "Home",
                  id: "HomeScreen",
                  passProps: {
                    store: PostStore
                  }
                }
              }
            ]
          }
        }
      }
    }
  })

// Change Side Menu State
export const toggleMenu = ({
  menu = "PrimaryNavMenu",
  status = false
} = {}) => {
  Navigation.mergeOptions(menu, {
    sideMenu: {
      left: {
        visible: status
      }
    }
  })
}

// Push new view of Posts
export const viewPosts = (componentId, category) => {
  Navigation.push(componentId, {
    component: {
      name: "FeedView",
      passProps: {
        store: PostStore,
        category: category
      }
    }
  })
  toggleMenu()
}

// Return to Home Screen
export const returnHome = () => {
  Navigation.popTo("HomeScreen")
  toggleMenu()
}
