/**
 * Input/styles.js
 * Styles for Input Components
 * components
 */

import { StyleSheet } from "react-native"
import { colors } from "config/styles"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingVertical: hp("3%"),
    borderWidth: 0,
  },
  inputContainer: {
    marginTop: hp("1%"),
    backgroundColor: colors.white,
    borderBottomWidth: 0,
    height: hp("7%"),
    shadowColor: colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
    borderRadius: wp("4%") / 4,
  },
  input: {
    paddingHorizontal: wp("3%"),
  },
})

export default styles
