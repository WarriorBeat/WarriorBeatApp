/**
 * SideMenu.js
 * SideMenu Component
 * Styles
 */

import { StyleSheet } from "react-native"
import { fonts } from "config/styles"
import { heightPercentageToDP as hp } from "react-native-responsive-screen"

const sideMenu = StyleSheet.create({
  button: {
    padding: 0,
    margin: 0,
    marginVertical: 5,
    height: hp("5%"),
  },
  buttonText: {
    ...fonts.whiteBoldTitle,
  },
  buttonHeaderText: {
    ...fonts.whiteBoldTitleSecondary,
  },
  buttonFooterText: {
    ...fonts.whiteBoldTitleSecondary,
  },
  buttonSecondary: {
    padding: 0,
    marginVertical: hp(".7%"),
    alignSelf: "flex-start",
  },
})

export default sideMenu
