/**
 * position.js
 * Common Position Styles
 * components/styles
 */

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

export const flex = {
  flex: 1,
}

export const vPadding = percent => ({
  paddingVertical: hp(percent),
})

export const hPadding = percent => ({
  paddingHorizontal: wp(percent),
})

export const padding = (horz, vert) => ({
  ...hPadding(horz),
  ...vPadding(vert || horz),
})

export const vMargin = percent => ({
  marginVertical: hp(percent),
})

export const hMargin = percent => ({
  marginHorizontal: wp(percent),
})

export const margin = (horz, vert) => ({
  ...hMargin(horz),
  ...vMargin(vert || horz),
})

export const center = (pos, justify) => {
  const justifyTo = justify || "center"
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
    justifyContent: justifyTo,
    alignItems: alignTo,
  }
}
