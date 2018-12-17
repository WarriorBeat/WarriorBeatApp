/**
 * utils.js
 * Definition for common utils
 * Config
 */

import { Platform, UIManager } from "react-native"

/**
 * Enables Layout Animations on Android
 * @see https://github.com/facebook/react-native/issues/5267
 *
 */
function enableLayoutAnimations() {
  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

export default enableLayoutAnimations
