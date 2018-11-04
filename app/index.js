/** @format */

import { Navigation } from "react-native-navigation"
import { registerScreens } from "config/screens"

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
