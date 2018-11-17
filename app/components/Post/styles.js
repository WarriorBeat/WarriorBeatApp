/**
 * styles.js
 * Styles for Post Components
 * components
 */

import { StyleSheet, Dimensions } from "react-native"
import { colors, fonts, brand } from "config/styles"

export const window = Dimensions.get("window")

const HEADER_OVERLAY = "rgba(0,0,0,.4)"
const HEADER_HEIGHT = 300

export const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: brand.primary,
    overflow: "hidden"
  },
  header_overlay: {
    position: "absolute",
    top: 0,
    width: window.width,
    backgroundColor: HEADER_OVERLAY,
    height: HEADER_HEIGHT
  },
  author_header: {
    height: HEADER_HEIGHT,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  author_name: {
    ...fonts.whiteBoldTitle,
    ...fonts.boldShadow
  },
  author_title: {
    ...fonts.whiteHeadline,
    ...fonts.boldShadow,
  },
  author_avatar: {
    borderRadius: 75,
    borderColor: brand.primaryDark,
    borderWidth: 1.5,
    shadowColor: colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 5, height: 9 },
    elevation: 2
  },
  scroll_container: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  html_font: {
    fontSize: 20
  }
})

export const header_styles = {
  backgroundColor: brand.primaryDark
}
