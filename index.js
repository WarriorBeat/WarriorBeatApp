/**
 * App Entry Point
 *
 */

import Amplify from "aws-amplify"
import { Navigation } from "react-native-navigation"
import registerScreens from "config/screens"
import API from "config/aws"
import { Sentry } from "react-native-sentry"
import awsExports from "./aws-exports"

// Load Sentry
if (!__DEV__) {
  Sentry.config("https://5dab653ac82e4d01ab0b08a1fbabd1c0@sentry.io/1358160").install()
}
// Set API Configuration
Amplify.configure({ ...awsExports, API })

// Register RN Nav Screens
registerScreens()

// Start RN Navigation
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      animate: false,
      drawBehind: true,
    },
    statusBar: {
      backgroundColor: "#00000039",
      drawBehind: true,
    },
  })
  Navigation.setRoot({
    root: {
      component: {
        name: "Initializing",
      },
    },
  })
})
