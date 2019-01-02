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
import { softColors } from "config/styles"

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: softColors.white,
  },
  authContainer: {
    flex: 1,
    paddingTop: hp("2%"),
    paddingHorizontal: wp("2%"),
  },
  submitContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: hp("5%"),
    marginHorizontal: wp("5%"),
  },
  submitButtonContainer: {
    marginTop: hp("2%"),
  },
  descContainer: {
    marginHorizontal: wp("5%"),
  },
  helpContainer: {
    marginVertical: hp(".5%"),
    marginHorizontal: wp("5%"),
  },
  inputContainer: {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
    width: "100%",
  },
  inputContentContainer: {
    flexGrow: 1,
    marginLeft: 0,
    marginRight: 0,
    paddingHorizontal: wp("5%"),
  },
})

export default styles
