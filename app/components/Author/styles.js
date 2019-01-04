/**
 * Author/styles.js
 * Styles for Author Components
 * components
 */

import { StyleSheet } from "react-native"
import { colors } from "config/styles"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
import { icons } from "config/styles"

export const summaryStyles = StyleSheet.create({
  summary_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    flexDirection: "row",
    marginVertical: hp("4%"),
  },
  header: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 8,
  },
  title: {
    paddingBottom: 3,
  },
})

export const avatarStyles = StyleSheet.create({
  avatar_shadow: {
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
})

export const infoStyles = StyleSheet.create({
  root: {
    alignItems: "stretch",
    paddingHorizontal: wp("1%"),
  },
  container: {
    flexDirection: "row",
  },
  titleContainer: {
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: wp("3%"),
  },
  subtitle: {
    paddingLeft: wp("2%"),
  },
})

export const subscribeStyles = StyleSheet.create({
  button: {
    height: wp("16%"),
    width: wp("16%"),
    borderRadius: wp("16%") / 2,
    backgroundColor: colors.white,
  },
  iconContainer: {
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
  },
})

export const subscribeButton = {
  subscribed: {
    ...icons.heart,
    color: colors.ios.red,
  },
  default: {
    ...icons.heart,
    color: colors.ios.gray,
  },
}
