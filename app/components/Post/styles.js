/**
 * styles.js
 * Styles for Post Components
 * components
 */

import { StyleSheet, Dimensions } from "react-native"
import { colors, softColors } from "config/styles"
import { type as fontType } from "components/Text/styles"
import { materialColors } from "react-native-typography"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

export const window = Dimensions.get("window")
export const HEADER_HEIGHT = hp("40%")
export const STICKY_HEADER_HEIGHT = hp("10%")

export const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: colors.primary,
    overflow: "hidden",
  },
  scroll_container: {
    justifyContent: "center",
    alignContent: "center",
  },
  html_font: {
    fontSize: 16,
    ...fontType.body,
    color: materialColors.blackPrimary,
  },
  touchable_overlay: {
    height: HEADER_HEIGHT,
    width: "100%",
  },
  sticky_container: {
    height: STICKY_HEADER_HEIGHT,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  fixed_container: {
    position: "absolute",
    left: 0,
    top: hp("1%"),
    height: STICKY_HEADER_HEIGHT,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  header_button: {
    color: colors.white,
    paddingHorizontal: wp("5%"),
  },
})

export const articleStyles = {
  container: {
    flex: 1,
    marginVertical: hp("3%"),
    marginHorizontal: wp("3%"),
    alignContent: "center",
  },
  title: {
    textAlign: "center",
  },
  post_header: {
    container: {
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      borderTopWidth: 2.5,
      borderBottomWidth: 2.5,
      borderColor: colors.secondary,
      marginVertical: hp("2%"),
      padding: 5,
    },
  },
  credits: {
    container: {
      marginBottom: hp("1%"),
      padding: 0,
      alignItems: "flex-end",
    },
    text: {
      textAlignVertical: "center",
      padding: 3,
      position: "absolute",
    },
  },
}

export const headerStyles = {
  backgroundColor: colors.primaryDark,
  contentBackgroundColor: softColors.white,
}

export const related = StyleSheet.create({
  root: {
    marginBottom: 10,
  },
  title: {
    margin: 15,
  },
  container: {
    shadowColor: colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 0 },
    elevation: 8,
  },
  wrapper: {
    height: 250,
  },
  item_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  image_container: {
    borderRadius: 6,
    overflow: "hidden",
  },
})

export const relatedSize = {
  height: hp("40%"),
  item_height: hp("50%"),
}

export const reaction = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  emoji: {
    color: colors.white,
    fontSize: wp("5.5%"),
    padding: wp("2%"),
    textShadowColor: colors.black,
    textShadowRadius: 6,
    textShadowOffset: { width: 1, height: 0 },
    elevation: 2,
  },
})

export const reactionSettings = {
  button_color: "rgba(39,39,39, 1)",
  button_item_color: "rgba(39, 39, 39, 1)",
}