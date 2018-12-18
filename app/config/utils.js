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
export function enableLayoutAnimations() {
  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

/**
 * Convert Hex to rgba color
 * @see https://stackoverflow.com/q/21646738
 *
 * @export
 * @param {string} hex - Color Value in Hexadecimal
 * @param {number=} alpha - Opacity of RGBA
 * @returns Converted RGB or RGBA Value
 */
export function hexToRGB(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16)

  const g = parseInt(hex.slice(3, 5), 16)

  const b = parseInt(hex.slice(5, 7), 16)

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
  return `rgb(${r}, ${g}, ${b})`
}
