/**
 * Home/styles.js
 * Home Screen Styles
 * Screens
 */

import { StyleSheet, Dimensions } from "react-native"
import { colors, soft_colors } from "config/styles"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"

export const window = Dimensions.get("window")

export const scrollView = {
  backgroundColor: soft_colors.white
}

export const carousel = {
  feed: {
    sliderWidth: wp("100%"),
    itemWidth: wp("100%"),
    inactiveSlideScale: 0.99,
    inactiveSlideOpacity: 0.99
  },
  pager: {
    itemWidth: wp("50%"),
    sliderWidth: wp("100%"),
    inactiveSlideScale: 0.7,
    activeSlideAlignment: "start"
  },
  tab: {
    large: true,
    backgroundColor: "transparent"
  },
  container: {
    parallaxHeaderHeight: hp("18%"),
    stickyHeaderHeight: hp("12%"),
    backgroundColor: soft_colors.white,
    contentBackgroundColor: soft_colors.white
  }
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: soft_colors.white
  },
  headerContainer: {
    flex: 1,
    backgroundColor: soft_colors.white,
    alignSelf: "stretch",
    justifyContent: "flex-start",
    height: carousel.container.parallaxHeaderHeight,
    flexDirection: "row"
  },
  header: {
    backgroundColor: soft_colors.white,
    paddingTop: hp("4%"),
    paddingHorizontal: wp("5%"),
    alignSelf: "flex-end"
  },
  sticky_header: {
    backgroundColor: colors.primary,
    height: carousel.container.stickyHeaderHeight,
    width: "100%",
    alignSelf: "flex-end",
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "column",
    paddingTop: hp("5%")
  },
  sticky_content: {
    alignSelf: "center",
    paddingHorizontal: wp("2%")
  },
  carouselContainer: {
    flex: 0,
    flexGrow: 0
  },
  pagination: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    paddingHorizontal: 0
  },
  tab_item: {
    width: carousel.pager.itemWidth,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    height: hp("5%")
  },
  tab_button: {
    padding: 0,
    margin: 0,
    marginTop: 5,
    height: hp("5%")
  },
  tab_color: {
    color: colors.blackSecondary
  },
  tab_button_container: {
    marginRight: 0
  }
})
