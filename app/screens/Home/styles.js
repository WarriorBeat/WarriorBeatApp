/**
 * Home/styles.js
 * Home Screen Styles
 * Screens
 */

import { StyleSheet, Platform } from "react-native"
import { colors, softColors } from "config/styles"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"

export const scrollView = {
  backgroundColor: softColors.white,
}

const HEADER_HEIGHT = Platform.OS === "android" ? hp("23%") : hp("18%")
export const carousel = {
  feed: {
    sliderWidth: wp("100%"),
    itemWidth: wp("100%"),
    inactiveSlideScale: 0.99,
    inactiveSlideOpacity: 0.99,
  },
  pager: {
    itemWidth: wp("50%"),
    sliderWidth: wp("100%"),
    inactiveSlideScale: 0.7,
    activeSlideAlignment: "start",
  },
  tab: {
    large: true,
    backgroundColor: "transparent",
  },
  container: {
    parallaxHeaderHeight: HEADER_HEIGHT,
    stickyHeaderHeight: hp("12%"),
    backgroundColor: softColors.white,
    contentBackgroundColor: softColors.white,
  },
}

export const navIconStyles = (isVisible) => {
  const color = isVisible ? colors.primaryDark : colors.white
  const size = wp("7%")
  return {
    container: {
      size,
      color,
      underlayColor: "transparent",
    },
  }
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: softColors.white,
  },
  headerContainer: {
    flex: 1,
    backgroundColor: softColors.white,
    alignSelf: "stretch",
    justifyContent: "flex-start",
    height: carousel.container.parallaxHeaderHeight,
    flexDirection: "row",
  },
  header: {
    backgroundColor: softColors.white,
    paddingTop: hp("4%"),
    paddingHorizontal: wp("5%"),
    alignSelf: "flex-end",
  },
  sticky_header: {
    backgroundColor: colors.primary,
    height: carousel.container.stickyHeaderHeight,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: hp("1.5%"),
  },
  fixed_header: {
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    height: carousel.container.stickyHeaderHeight,
    width: wp("100%"),
  },
  fixed_inner: {
    paddingHorizontal: wp("5%"),
    paddingBottom: hp("2.25%"),
  },
  carouselContainer: {
    flex: 0,
    flexGrow: 0,
  },
  pagination: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    paddingHorizontal: 0,
  },
  tab_item: {
    width: carousel.pager.itemWidth,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    height: hp("5%"),
  },
  tab_button: {
    padding: 0,
    margin: 0,
    marginTop: 5,
    height: hp("5%"),
  },
  tab_color: {
    color: colors.blackSecondary,
  },
  tab_button_container: {
    marginRight: 0,
  },
})
