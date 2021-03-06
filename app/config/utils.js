/**
 * utils.js
 * Definition for common utils
 * Config
 */

import { Platform, UIManager, Linking } from "react-native"

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
/**
 * Return Number with Proper Ordinal
 * @see https://stackoverflow.com/a/31615643
 *
 * @export
 * @param {number} n - Number to add ordinal
 * @returns number with with proper ordinal
 */
export function getNumberWithOrdinal(n) {
  const s = ["th", "st", "nd", "rd"]
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}
/**
 * Returns Nested Object Property with String
 * @see http://blog.nicohaemhouts.com/2015/08/03/accessing-nested-javascript-objects-with-string-key/
 *
 * @param {object} theObject - Object to reduce
 * @param {string} path - Key to Find
 * @param {string=} separator - Notational Seperator
 * @returns Object value at path
 */
export const getNested = (theObject, path, separator = ".") => {
  try {
    return path
      .replace("[", separator)
      .replace("]", "")
      .split(separator)
      .reduce((obj, property) => obj[property], theObject)
  } catch (err) {
    return undefined
  }
}
/**
 * Open URL in External Browser
 *
 * @param {string} url
 */
export const openLink = async (url) => {
  const supported = await Linking.canOpenURL(url)
  if (supported) {
    Linking.openURL(url)
  }
}
