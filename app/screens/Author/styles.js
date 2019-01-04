/**
 * Author/styles.js
 * Author screen styles
 * screens
 */

import { StyleSheet } from "react-native"
import { softColors } from "config/styles"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

const authorProfile = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: softColors.white,
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("10%"),
  },
  subContainer: {
    marginTop: wp("-6%"),
    marginRight: wp("1%"),
  },
  subButton: {
    width: wp("40%"),
    height: hp("4.5%"),
    paddingVertical: 0,
  },
  subButtonContainer: {
    alignSelf: "flex-end",
  },
})

export default authorProfile
