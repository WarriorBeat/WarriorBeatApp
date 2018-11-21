/**
 * Author/styles.js
 * Styles for Author Components
 * components
 */

import { StyleSheet } from "react-native"
import { colors, fonts } from "config/styles"
const HEADER_HEIGHT = 300

export const styles = StyleSheet.create({
  author_header: {
    height: HEADER_HEIGHT,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  author_avatar: {
    borderRadius: 75,
    borderColor: colors.primaryDark,
    borderWidth: 1.5,
    shadowColor: colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 5, height: 9 },
    elevation: 10
  },
  author_name: {
    ...fonts.whiteBoldTitle,
    ...fonts.boldShadow
  },
  author_title: {
    ...fonts.whiteHeadline,
    ...fonts.boldShadow
  }
})
