/**
 * Home/styles.js
 * Home Screen Styles
 * Screens
 */

import { StyleSheet, Dimensions } from "react-native"
import { colors, soft_colors } from "config/styles"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"

export const window = Dimensions.get("window")

export const scrollView = {
  backgroundColor: soft_colors.white
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: soft_colors.white
  },
  headerContainer: {
    flex: 1,
    backgroundColor: soft_colors.white,
    alignSelf: "stretch",
    justifyContent: "center",
    height: 125
  },
  header: {
    backgroundColor: soft_colors.white,
    paddingTop: hp("4%"),
    paddingHorizontal: wp("5%")
  },
  sticky_header: {
    backgroundColor: colors.primary,
    height: 100,
    width: "100%",
    alignSelf: "flex-end",
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "column",
    paddingTop: hp("5%")
  },
  sticky_content: {
    alignSelf: "center",
    paddingHorizontal: wp("2%")
  }
})
