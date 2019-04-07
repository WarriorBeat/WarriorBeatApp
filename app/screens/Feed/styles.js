/**
 * Feed/styles.js
 * Feed View Styles
 * Screens
 */

import { StyleSheet } from "react-native"
import { human, systemWeights } from "react-native-typography"
import { colors } from "config/styles"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  header: {
    backgroundColor: colors.primary,
    alignSelf: "stretch",
    paddingVertical: 10,
    minHeight: 85,
  },
  headerText: {
    ...human.largeTitleWhiteObject,
    ...systemWeights.bold,
  },
})

export default styles