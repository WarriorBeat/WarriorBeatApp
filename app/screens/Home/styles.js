/**
 * Home/styles.js
 * Home Screen Styles
 * Screens
 */

import { StyleSheet } from "react-native"
import { human } from "react-native-typography"
import { systemWeights } from "react-native-typography"
import { brand } from "config/styles"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  scroll_view: {
    flex: 1,
    alignSelf: "stretch",
    alignContent: "stretch"
  },
  list_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20
  },
  header: {
    backgroundColor: brand.primary,
    alignSelf: "stretch",
    paddingVertical: 10,
    minHeight: 85
  },
  headerText: {
    ...human.largeTitleWhiteObject,
    ...systemWeights.bold
  }
})
