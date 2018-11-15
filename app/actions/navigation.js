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
}

export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: "Auth",
        children: [
          {
            component: {
              name: "Signin",
              options: {
                bottomTab: {
                  text: "Sign In",
                  fontSize: 12,
                  icon: require("../assets/signin.png")
                }
              }
            }
          },
          {
            component: {
              name: "Signup",
              options: {
                bottomTab: {
                  text: "Sign Up",
                  fontSize: 12,
                  icon: require("../assets/signup.png")
                }
              }
            }
          }
        ]
      }
    }
  })
