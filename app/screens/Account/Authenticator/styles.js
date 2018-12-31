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

const styles = StyleSheet.create({
  root: {
    marginVertical: hp("10%"),
    marginHorizontal: wp("5%"),
    flex: 1,
  },
})

export default styles
