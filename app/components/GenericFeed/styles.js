/**
 * GenericFeed/styles.js
 * Generic Feed Layout
 * Styles
 */

import { StyleSheet } from "react-native"
import { colors, soft_colors } from "config/styles"

export const styles = StyleSheet.create({
  scroll_view: {
    flex: 1,
    alignSelf: "stretch",
    alignContent: "stretch",
    backgroundColor: soft_colors.white
  },
  list_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    margin: 20,
    paddingVertical: 10,
    backgroundColor: colors.transparent
  }
})
