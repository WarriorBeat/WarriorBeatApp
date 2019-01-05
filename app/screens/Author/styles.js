/**
 * Author/styles.js
 * Author screen styles
 * screens
 */

import { StyleSheet } from "react-native"
import { softColors } from "config/styles"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

const authorProfile = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: softColors.white,
  },
  rootContent: {
    backgroundColor: softColors.white,
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("7%"),
  },
  subHeader: {
    flexDirection: "row",
  },
  bioContainer: {
    marginVertical: hp("2%"),
  },
  subContainer: {
    marginTop: wp("-7%"),
    marginRight: wp("1%"),
  },
  subButton: {
    width: wp("40%"),
    height: hp("4.5%"),
    paddingVertical: 0,
  },
  subButtonContainer: {
    alignSelf: "flex-end",
  },
  postsContainer: {
    flex: 1,
    marginTop: hp("2%"),
  },
  authorPosts: {
    flex: 1,
    marginTop: hp("2%"),
  },
})

export default authorProfile
