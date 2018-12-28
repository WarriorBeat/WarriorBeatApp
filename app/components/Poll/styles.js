/**
 * styles.js
 * Styles for Post Components
 * components
 */

import { colors } from "config/styles"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

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

const pollButton = bgColor => ({
  buttonStyle: {
    ...pollStyles.button,
    backgroundColor: bgColor,
  },
  borderRadius: 15,
})
const resultProgressCircle = {
  size: hp("15%"),
  showsText: true,
  animated: true,
}
export const polls = {
  button: {
    containerStyle: pollStyles.buttonContainer,
    ...pollButton(colors.ios.lightGray),
  },
  submitButton: {
    containerStyle: pollStyles.submitButtonContainer,
    ...pollButton(colors.ios.green),
  },
  activeButton: {
    containerStyle: pollStyles.buttonContainer,
    ...pollButton(colors.ios.blue),
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
