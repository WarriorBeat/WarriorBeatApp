/**
 * SideMenu.js
 * SideMenu Component
 * Styles
 */

import { StyleSheet } from "react-native"
import { colors, fonts } from "config/styles"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen"

export const side_menu = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "stretch",
    flex: 1,
    backgroundColor: colors.transparent
  },
  container_content: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 10
  },
  header_container: {
    display: "flex",
    position: "absolute",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    left: 0,
    top: 0,
    paddingHorizontal: 5,
    paddingVertical: 20
  },
  footer_container: {
    display: "flex",
    position: "absolute",
    justifyContent: "center",
    alignItems: "stretch",
    textAlign: "left",
    left: 0,
    bottom: 0,
    paddingHorizontal: 5,
    paddingVertical: 15
  },
  image: {
    height: 170,
    width: 170,
    flex: 1,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: colors.transparent,
    borderRadius: 75,
    marginVertical: hp("5.5%"),
    marginHorizontal: wp("2.5%"),
    position: "absolute"
  },
  button: {
    padding: 0,
    margin: 0,
    marginVertical: 5,
    height: hp("5%")
  },
  buttonText: {
    ...fonts.whiteBoldTitle
  },
  buttonHeaderText: {
    ...fonts.whiteBoldTitleSecondary
  },
  buttonFooterText: {
    ...fonts.whiteBoldTitleSecondary,
  },
  buttonSecondary: {
    padding: 0,
    marginVertical: hp(".7%"),
    alignSelf: "flex-start"
  }
})

export const icons = {
  home: {
    name: "home",
    type: "entypo"
  },
  news: {
    name: "newspaper-o",
    type: "font-awesome"
  },
  sports: {
    name: "football",
    type: "material-community"
  },
  categories: {
    name: "star",
    type: "font-awesome"
  },
  entertainment: {
    name: "popcorn",
    type: "material-community"
  },
  opinion: {
    name: "thought-bubble",
    type: "material-community"
  },
  arrow_back: {
    name: "arrow-back"
  }
}
