/**
 * Header/styles.js
 * Header component styles
 * components
 */

import { StyleSheet } from "react-native"
import { colors } from "config/styles"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"

const styles = StyleSheet.create({
  header_container: {
    flexDirection: "column",
    height: hp("30%"),
    paddingTop: hp("1.5%"),
  },
  header_image: {
    height: wp("30%"),
    width: wp("30%"),
  },
  center_container: {
    alignSelf: "stretch",
    width: "100%",
    height: "100%",
  },
  tab_container: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
  },
  tab_button: {
    borderRadius: 0,
    height: hp("6%"),
    width: wp("50%"),
    paddingBottom: 0,
    borderBottomWidth: 4,
    borderColor: colors.transparent,
  },
  tab_button_selected: {
    borderColor: colors.secondary,
  },
  backButtonContainer: {
    position: "absolute",
    top: hp("2.5%"),
    left: 0,
    width: wp("100%"),
    height: hp("10%"),
    paddingHorizontal: wp("1%"),
    zIndex: 99,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  backButton: {
    padding: wp("3%"),
    color: colors.white,
  },
})

export const config = {
  backButton: {
    underlayColor: colors.transparent,
  },
}

export default styles
