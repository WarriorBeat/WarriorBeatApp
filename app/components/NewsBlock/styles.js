/**
 * NewsBlock.js
 * News Block Components
 * Style
 */

import { StyleSheet } from "react-native"
import { colors } from "config/styles"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen"

export const styles = StyleSheet.create({
  block: {
    marginVertical: 10
  },
  tile: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: colors.transparent,
    flexDirection: "row"
  },
  container: {
    flex: 1,
    backgroundColor: colors.whiteTertiary,
    borderRadius: 6,
    width: wp("100%"),
    shadowColor: colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 9 },
    elevation: 8
  },
  image_container: {
    borderTopEndRadius: 6,
    borderTopLeftRadius: 6,
    overflow: "hidden",
    resizeMode: "cover"
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
    flexDirection: "row"
  },
  title: {
    textAlign: "center"
  },
  author_container: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 100,
    elevation: 100,
    marginVertical: hp(".25%"),
    marginHorizontal: wp("-3%"),
    paddingVertical: hp(".5%"),
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center"
  },
  author_img_container: {
    flex: 1,
    borderColor: colors.primaryDark,
    borderWidth: 2,
    borderRadius: 22
  },
  author_img: {
    elevation: 10,
    shadowColor: colors.black,
    shadowOpacity: 0.7,
    shadowRadius: 1.5,
    shadowOffset: { width: 0, height: 4 }
  }
})
