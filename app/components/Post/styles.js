/**
 * styles.js
 * Styles for Post Components
 * components
 */

import { StyleSheet } from "react-native"
import { soft_colors } from "config/styles"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: soft_colors.white
  },
  scroll_container: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  html_font: {
    fontSize: 20
  }
})
