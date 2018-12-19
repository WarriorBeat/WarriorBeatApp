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
    alignSelf: "center",
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

export const pollStyles = {
  root: {
    marginVertical: hp("10%"),
    marginHorizontal: wp("5%"),
    flex: 1,
  },
  header: {
    paddingTop: hp("2%"),
    paddingHorizontal: wp("5%"),
  },
  answerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    marginVertical: hp("1%"),
  },
  submitContainer: {
    marginTop: "auto",
  },
  button: {
    paddingVertical: hp("3%"),
  },
  closeButton: {
    position: "absolute",
    top: hp("-5%"),
    left: 0,
  },
  resultContainer: {
    margin: wp("-5%"),
  },
  resultContentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resultItemContainer: {
    marginHorizontal: wp("5%"),
    flexDirection: "row",
    backgroundColor: colors.white,
    height: hp("20%"),
    padding: wp("5%"),
    marginVertical: hp("1.5%"),
    borderRadius: 10,
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.6,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 3 },
    elevation: 8,
  },
  resultTextContainer: { flex: 1 },
  resultProgressContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}

const pollButton = {
  buttonStyle: pollStyles.button,
  borderRadius: 15,
}
const resultProgressCircle = {
  size: hp("15%"),
  showsText: true,
  animated: true,
}
export const polls = {
  button: {
    backgroundColor: colors.ios.lightGray,
    containerViewStyle: pollStyles.buttonContainer,
    ...pollButton,
  },
  submitButton: {
    backgroundColor: colors.ios.green,
    containerViewStyle: pollStyles.submitButtonContainer,
    ...pollButton,
  },
  activeButton: {
    backgroundColor: colors.ios.blue,
    containerViewStyle: pollStyles.buttonContainer,
    ...pollButton,
  },
  closeButton: {
    color: colors.ios.gray,
    containerStyle: pollStyles.closeButton,
  },
  resultProg: {
    ...resultProgressCircle,
    color: colors.ios.blue,
  },
  resultVotedProg: {
    ...resultProgressCircle,
    color: colors.ios.green,
  },
}
