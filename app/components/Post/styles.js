/**
 * styles.js
 * Styles for Post Components
 * components
 */

import { StyleSheet, Dimensions } from "react-native"
import { colors, soft_colors } from "config/styles"
import { type as font_type } from "components/Text/styles"
import { materialColors } from "react-native-typography"

export const window = Dimensions.get("window")

const HEADER_OVERLAY = "rgba(0,0,0,.4)"
const HEADER_HEIGHT = 300

export const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: colors.primary,
    overflow: "hidden"
  },
  header_overlay: {
    position: "absolute",
    top: 0,
    width: window.width,
    backgroundColor: HEADER_OVERLAY,
    height: HEADER_HEIGHT
  },
  scroll_container: {
    justifyContent: "center",
    alignContent: "center"
  },
  html_font: {
    fontSize: 16,
    ...font_type.body,
    color: materialColors.blackPrimary
  }
})

export const article_styles = {
  container: {
    flex: 1,
    margin: 15,
    alignContent: "center"
  },
  title: {
    textAlign: "center"
  },
  post_header: {
    container: {
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      borderTopWidth: 2.5,
      borderBottomWidth: 2.5,
      borderColor: colors.secondary,
      marginVertical: 15,
      padding: 5
    }
  },
  credits: {
    container: {
      marginBottom: 6,
      padding: 0,
      alignItems: "flex-end"
    },
    text: {
      textAlignVertical: "center",
      padding: 3,
      position: "absolute"
    }
  }
}

export const header_styles = {
  backgroundColor: colors.primaryDark,
  contentBackgroundColor: soft_colors.white
}

export const related = StyleSheet.create({
  root: {
    marginBottom: 10
  },
  title: {
    margin: 15
  },
  container: {
    shadowColor: colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 0 },
    elevation: 8
  },
  wrapper: {
    height: 250
  },
  item_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40
  },
  image_container: {
    borderRadius: 6,
    overflow: "hidden"
  }
})
