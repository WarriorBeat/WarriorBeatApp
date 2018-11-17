/**
 * styles.js
 * Definition for common styles
 * Config
 */

import { human } from "react-native-typography"
import { systemWeights, materialColors } from "react-native-typography"

// Basic Colors
const black = "#000"
const white = "$fff"
const transparent = "transparent"
export const colors = {
  black: black,
  white: white,
  transparent: transparent
}

// Soft Colors
const soft_white = "rgb(241, 244, 246)"
export const soft_colors = {
  white: soft_white
}

// Brand Colors
export const brand = {
  primary: "#393939",
  primaryDark: "#2d2d2d",
  secondary: "#F6D609"
}

// Font Styles
export const fonts = {
  whiteBoldTitle: {
    ...human.title2WhiteObject,
    ...systemWeights.bold,
    color: materialColors.whitePrimary
  },
  whiteBoldTitleSecondary: {
    ...systemWeights.bold,
    color: materialColors.whiteSecondary
  }
}
