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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: softColors.white,
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("10%"),
  },
})

export default styles
