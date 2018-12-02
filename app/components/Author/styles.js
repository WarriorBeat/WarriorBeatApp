/**
 * Author/styles.js
 * Styles for Author Components
 * components
 */

import { StyleSheet } from "react-native"
import { colors } from "config/styles"
import { heightPercentageToDP as hp } from "react-native-responsive-screen"

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
