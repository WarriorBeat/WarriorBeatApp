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
 * @export
 */
export function enableLayoutAnimations() {
  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}
