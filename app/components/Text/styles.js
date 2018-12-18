/**
 * styles.js
 * Text Component Styles
 * components
 */

import { StyleSheet } from "react-native"
import {
  systemWeights, materialColors, human, iOSColors,
} from "react-native-typography"
import { colors } from "config/styles"

export const weight = StyleSheet.create({
  thin: {
    ...systemWeights.thin,
  },
  light: {
    ...systemWeights.light,
  },
  regular: {
    ...systemWeights.regular,
  },
  semibold: {
    ...systemWeights.semibold,
  },
  bold: {
    ...systemWeights.bold,
  },
  heavy: {
    fontWeight: "800",
  },
  black: {
    fontWeight: "900",
  },
})

export const color = StyleSheet.create({
  primary: {
    color: colors.primary,
  },
  primaryDark: {
    color: colors.primaryDark,
  },
  secondary: {
    color: colors.secondary,
  },
  white: {
    color: materialColors.whitePrimary,
  },
  white_dark: {
    color: materialColors.whiteSecondary,
  },
  black: {
    color: colors.black,
  },
  black_light: {
    color: materialColors.blackSecondary,
  },
  green: {
    color: colors.green,
  },
  ios_green: {
    color: iOSColors.green,
  },
  ios_blue: {
    color: iOSColors.blue,
  },
})

export const decoration = StyleSheet.create({
  shadow: {
    textShadowColor: colors.black,
    textShadowRadius: 3,
    textShadowOffset: { width: -1, height: 1 },
    elevation: 2,
  },
})

export const type = StyleSheet.create({
  largeTitle: {
    ...human.largeTitleWhiteObject,
  },
  title: {
    ...human.title1WhiteObject,
  },
  titlesm: {
    ...human.title2WhiteObject,
  },
  titlexsm: {
    ...human.title3WhiteObject,
  },
  headline: {
    ...human.headlineWhiteObject,
  },
  body: {
    ...human.bodyWhiteObject,
  },
  callout: {
    ...human.calloutWhiteObject,
  },
  subhead: {
    ...human.subheadWhiteObject,
  },
  footnote: {
    ...human.footnoteWhiteObject,
  },
  caption: {
    ...human.caption1WhiteObject,
  },
  captionsm: {
    ...human.caption2WhiteObject,
  },
})
