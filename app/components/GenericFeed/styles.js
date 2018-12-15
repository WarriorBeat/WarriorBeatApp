/**
 * GenericFeed/styles.js
 * Generic Feed Layout
 * Styles
 */

import { StyleSheet } from "react-native"
import { colors, soft_colors } from "config/styles"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"

export const styles = StyleSheet.create({
  scroll_view: {
    flex: 1,
    backgroundColor: soft_colors.white
  },
  list_container: {
    flex: 1,
    flexGrow: 0,
    marginVertical: hp(".5%"),
    marginHorizontal: wp("5%"),
    backgroundColor: colors.transparent
  }
})
