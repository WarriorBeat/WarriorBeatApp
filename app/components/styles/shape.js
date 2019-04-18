/**
 * Shape.js
 * Common Image Styles
 * components/styles
 */

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

export const height = percent => ({
  height: hp(percent),
})

export const width = percent => ({
  width: wp(percent),
})

export const circle = size => ({
  ...width(size),
  height: wp(size),
  borderRadius: wp(size) / 2,
})
