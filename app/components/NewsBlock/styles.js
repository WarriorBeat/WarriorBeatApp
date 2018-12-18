/**
 * NewsBlock.js
 * News Block Components
 * Style
 */

import { StyleSheet } from "react-native"
import { colors, softColors, rgba } from "config/styles"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

const styles = StyleSheet.create({
  block: {
    marginVertical: hp("1.75%"),
  },
  tile: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: colors.transparent,
    flexDirection: "row",
  },
  container: {
    flex: 1,
    backgroundColor: colors.whiteTertiary,
    borderRadius: 6,
    width: "100%",
    shadowColor: colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 9 },
    elevation: 8,
  },
  full_container: {
    height: hp("24%"),
    marginTop: hp("2%"),
  },
  image_container: {
    borderTopEndRadius: 6,
    borderTopLeftRadius: 6,
    overflow: "hidden",
    resizeMode: "cover",
  },
  content_container: {
    paddingTop: hp("2%"),
    paddingBottom: hp("2%"),
    borderBottomEndRadius: 6,
    borderBottomLeftRadius: 6,
    backgroundColor: colors.whitePrimary,
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    flexDirection: "row",
  },
  full_content_container: {
    height: "100%",
    borderRadius: 6,
    flexDirection: "column",
    paddingTop: 0,
    paddingBottom: 0,
  },
  title: {
    textAlign: "center",
  },
  content_full: {
    paddingVertical: hp("3%"),
  },
  author_container: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 100,
    elevation: 100,
    marginVertical: hp(".25%"),
    marginHorizontal: wp("2.5%"),
    paddingVertical: hp(".5%"),
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  author_img_container: {
    flex: 1,
    borderColor: colors.primaryDark,
    borderWidth: 2,
    borderRadius: 22,
  },
  author_img: {
    elevation: 10,
    shadowColor: colors.black,
    shadowOpacity: 0.7,
    shadowRadius: 1.5,
    shadowOffset: { width: 0, height: 4 },
  },
  dateStamp: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  badge: {
    width: wp("25%"),
    color: colors.white,
    backgroundColor: rgba(softColors.white, 0.9),
    borderColor: colors.green,
    borderWidth: 2.5,
    shadowColor: colors.green,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: -3, height: 7 },
  },
  badge_container: {
    position: "absolute",
    zIndex: 99,
    elevation: 10,
    top: 2,
    right: -12,
  },
  badge_text: {
    paddingVertical: wp("2%"),
    color: colors.blackSecondary,
  },
})

export default styles
