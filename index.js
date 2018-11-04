/** @format */

import { Navigation } from "react-native-navigation"
import { registerScreens } from "./app/config/screens"
import Amplify from "aws-amplify"
import config from "./aws-exports"
import "es6-symbol/implement"

// Local Testing Api
config.aws_cloud_logic_custom.push({
  name: "local",
  endpoint: "http://localhost:5000"
})
Amplify.configure(config)

registerScreens()

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      animate: false,
      drawBehind: true
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
