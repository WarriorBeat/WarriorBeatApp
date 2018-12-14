/**
 * styles.js
 * Definition for common styles
 * Config
 */

import { human } from "react-native-typography"
import { systemWeights, materialColors } from "react-native-typography"
import { Navigation } from "react-native-navigation"

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

// RNN Navigation Constants
export const getNavConstants = async () => {
  const NavConstants = await Navigation.constants()
  return NavConstants
}

// App Icons
export const icons = {
  home: {
    name: "home",
    type: "entypo"
  },
  news: {
    name: "newspaper-o",
    type: "font-awesome"
  },
  sports: {
    name: "football",
    type: "material-community"
  },
  categories: {
    name: "star",
    type: "font-awesome"
  },
  entertainment: {
    name: "popcorn",
    type: "material-community"
  },
  opinion: {
    name: "thought-bubble",
    type: "material-community"
  },
  arrow_back: {
    name: "ios-arrow-back",
    type: "ionicon"
  },
  menu: {
    name: "md-menu",
    type: "ionicon"
  },
  features: {
    name: "new-releases",
    type: "material-icons"
  },
  school: {
    name: "md-school",
    type: "ionicon"
  }
}
