// navigation.js

import { Navigation } from "react-native-navigation"

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
                  id: "PrimaryNavMenu"
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
                  id: "HomeScreen"
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
export const viewPosts = (componentId, categoryId = null) => {
  Navigation.push(componentId, {
    component: {
      name: "FeedView",
      passProps: {
        categoryId: categoryId
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
