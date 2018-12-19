/**
 * styles.js
 * Definition for common styles
 * Config
 */

import {
  human, systemWeights, materialColors, iOSColors,
} from "react-native-typography"
import { Navigation } from "react-native-navigation"
import { hexToRGB } from "./utils"

// Export Hex to RGB
export const rgba = hexToRGB

// Basic and Brand Colors
const black = "#000"
const transparent = "transparent"
export const colors = {
  ...materialColors,
  ios: {
    ...iOSColors,
  },
  primary: "#393939",
  primaryDark: "#2d2d2d",
  secondary: "#F6D609",
  green: "#5EE569",
  black,
  white: materialColors.whitePrimary,
  transparent,
}

// Soft Colors
const softWhite = "#F2F4F6"
export const softColors = {
  white: softWhite,
}

// Font Styles
export const fonts = {
  whiteBoldTitle: {
    ...human.title2WhiteObject,
    ...systemWeights.bold,
    color: materialColors.whitePrimary,
  },
  whiteBoldTitleSecondary: {
    ...systemWeights.bold,
    color: materialColors.whiteSecondary,
  },
  whiteHeadline: {
    ...human.headlineWhiteObject,
  },
  boldShadow: {
    textShadowColor: colors.black,
    textShadowRadius: 3,
    textShadowOffset: { width: -1, height: 1 },
    elevation: 2,
  },
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
    type: "entypo",
  },
  news: {
    name: "newspaper-o",
    type: "font-awesome",
  },
  sports: {
    name: "football",
    type: "material-community",
  },
  categories: {
    name: "star",
    type: "font-awesome",
  },
  entertainment: {
    name: "popcorn",
    type: "material-community",
  },
  opinion: {
    name: "thought-bubble",
    type: "material-community",
  },
  arrow_back: {
    name: "ios-arrow-back",
    type: "ionicon",
  },
  close: {
    name: "md-close",
    type: "ionicon",
  },
  menu: {
    name: "md-menu",
    type: "ionicon",
  },
  features: {
    name: "new-releases",
    type: "material-icons",
  },
  school: {
    name: "md-school",
    type: "ionicon",
  },
  reviews_previews: {
    name: "ticket"
    type: "entypo"
  },
  showcase:{
    name: "open-book"
    type: "entypo"
  }, 
}
