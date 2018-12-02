/**
 * Home/styles.js
 * Home Screen Styles
 * Screens
 */

import { StyleSheet } from "react-native"
import { colors } from "config/styles"
import { heightPercentageToDP as hp } from "react-native-responsive-screen"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  header: {
    backgroundColor: colors.primary,
    alignSelf: "stretch",
    minHeight: hp("15%"),
    flexDirection: "row"
  },
  menu_container: {
    padding: 0,
    marginRight: 0,
    marginLeft: 0
  },
  menu_button: {
    padding: 0,
    marginRight: 0,
    marginLeft: 0,
    marginTop: hp("-5%")
  }
})
