/**
 * styles.js
 * Definition for common styles
 * Config
 */

import { human } from "react-native-typography"
import { systemWeights, materialColors } from "react-native-typography"

// Basic and Brand Colors
const black = "#000"
const transparent = "transparent"
export const colors = {
  ...materialColors,
  primary: "#393939",
  primaryDark: "#2d2d2d",
  secondary: "#F6D609",
  black: black,
  white: materialColors.whitePrimary,
  transparent: transparent
}

// Soft Colors
const soft_white = "rgb(241, 244, 246)"
export const soft_colors = {
  white: soft_white
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
  },
  whiteHeadline: {
    ...human.headlineWhiteObject
  },
  boldShadow: {
    textShadowColor: colors.black,
    textShadowRadius: 3,
    textShadowOffset: { width: -1, height: 1 },
    elevation: 2
  }
}
