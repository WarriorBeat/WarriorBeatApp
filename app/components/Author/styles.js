/**
 * Author/styles.js
 * Styles for Author Components
 * components
 */

import { StyleSheet } from "react-native"
import { colors, fonts } from "config/styles"
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
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

export const summary = StyleSheet.create({
  summary_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    flexDirection: "row",
    marginVertical: hp("4%")
  },
  header: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 8
  },
  avatar: {
    borderRadius: 75,
    borderColor: colors.primaryDark,
    borderWidth: 2,
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5
  },
  title: {
    paddingBottom: 3
  }
})
