/**
 * NewsBlock.js
 * News Block Components
 * Style
 */

import { StyleSheet } from "react-native"
import { colors } from "config/styles"

export const styles = StyleSheet.create({
  block: {
    marginVertical: 10
  },
  tile: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: colors.transparent
  },
  container: {
    flex: 1,
    backgroundColor: colors.transparent,
    width: "100%",
    shadowColor: colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 9 },
    elevation: 2
  },
  image_container: {
    borderTopEndRadius: 6,
    borderTopLeftRadius: 6,
    overflow: "hidden",
    resizeMode: "cover",
    flex: 3
  },
  content_container: {
    flex: 1,
    borderBottomEndRadius: 6,
    borderBottomLeftRadius: 6,
    backgroundColor: colors.whitePrimary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  title: {
    textAlign: "center"
  }
})
