/**
 * Home/styles.js
 * Home Screen Styles
 * Screens
 */

import { StyleSheet } from "react-native"
import { colors, soft_colors } from "config/styles"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"

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
    backgroundColor: soft_colors.white,
    alignSelf: "stretch",
    justifyContent: "flex-end",
    height: 100
  },
  header: {
    backgroundColor: soft_colors.white,
    paddingHorizontal: wp("2%")
  }
})
