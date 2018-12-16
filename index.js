/**
 * Entry point as a workaround to
 * babelHelpers failing.
 * See: https://github.com/facebook/react-native/issues/20150
 *
 */

import Amplify from "aws-amplify"
import config from "./aws-exports"
import { Navigation } from "react-native-navigation"
import { registerScreens } from "config/screens"

// Local Testing Api
config.aws_cloud_logic_custom.push({
  name: "local",
  endpoint: "http://localhost:5000"
})
// Set API Configuration
Amplify.configure(config)

// Register RN Nav Screens
registerScreens()

// Start RN Navigation
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      animate: false,
      drawBehind: true
    },
    statusBar: {
      backgroundColor: "#00000039",
      drawBehind: true,
    }
  })
  Navigation.setRoot({
    root: {
      component: {
        name: "Initializing"
      }
    }
  })
})
