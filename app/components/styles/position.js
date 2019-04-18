/**
 * position.js
 * Common Position Styles
 * components/styles
 */

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

export const paddingV = percent => ({
  paddingVertical: hp(percent),
})

export const paddingH = percent => ({
  paddingHorizontal: wp(percent),
})

export const center = (pos) => {
  let alignTo
  switch (pos) {
  case "start":
    alignTo = "flex-start"
    break
  case "end":
    alignTo = "flex-end"
    break
  case "center":
    alignTo = pos
    break
  default:
    alignTo = "flex-start"
    break
  }
  return {
    justifyContent: "center",
    alignItems: alignTo,
  }
}
