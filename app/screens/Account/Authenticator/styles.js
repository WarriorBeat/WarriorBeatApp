/**
 * Authenticator/styles.js
 * Authenticator screen styles
 * screens
 */

import { StyleSheet } from "react-native"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
import { colors, softColors } from "config/styles"

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: softColors.white,
  },
  authContainer: {
    flex: 1,
    paddingTop: hp("2%"),
    paddingHorizontal: wp("7%"),
  },
  submitContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: hp("6%"),
  },
  submitButtonContainer: {
    marginTop: hp("2%"),
  },
  submitButton: {
    backgroundColor: colors.ios.blue,
  },
  submitSignup: {
    backgroundColor: colors.ios.green,
  },
})

export default styles
