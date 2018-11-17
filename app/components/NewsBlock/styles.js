/**
 * NewsBlock.js
 * News Block Components
 * Style
 */

import { StyleSheet } from "react-native"
import { colors, soft_colors } from "config/styles"

const border_color = "rgba(0,0,0,0.15)"

export const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    borderColor: border_color,
    borderWidth: 1.5,
    width: "100%",
    display: "flex",
    marginTop: 10,
    shadowColor: colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 5, height: 9 },
    elevation: 2
  },
  content_cont: {
    height: 70,
    backgroundColor: soft_colors.white,
    alignItems: "center"
  },
  caption: {
    fontWeight: "600"
  }
})
