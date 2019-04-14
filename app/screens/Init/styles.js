/**
 * styles.js
 * Init Screen Styles
 * screens/Init
 */

import { StyleSheet } from "react-native"
import { colors } from "config/styles"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

const splashStyles = StyleSheet.create({
  root: {
    backgroundColor: colors.primary,
  },
  iconCol: {
    justifyContent: "center",
    paddingVertical: hp("10%"),
  },
  loaderCol: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  image: {
    height: wp("40%"),
    width: wp("40%"),
    alignSelf: "flex-end",
    borderRadius: wp("50%") / 2,
  },
})

export default splashStyles
