/**
 * Grid.js
 * Generic Grid Components
 * components/Layout
 */

import React from "react"
import PropTypes from "prop-types"
import { Col as GCol, Row as GRow } from "react-native-easy-grid"
import { Position, Shape } from "components/styles"
import { StyleSheet, ViewPropTypes } from "react-native"

const styles = ({
  center, vPad, hPad, justify, wrap, width, height, size,
}) => StyleSheet.create({
  default: {
    ...Position.center(center, justify),
    ...Position.paddingV(vPad),
    ...Position.paddingH(hPad),
    width: width ? Shape.width(width).width : undefined,
    height: height ? Shape.height(height).height : undefined,
    flexWrap: wrap ? "wrap" : "nowrap",
  },
  row: {
    flex: size || (height ? 0 : 1),
  },
  col: {
    flex: size || (width ? 0 : 1),
  },
})

export const Row = (props) => {
  const { children, style } = props
  const compStyle = styles(props)
  return (
    <GRow {...props} style={[compStyle.default, compStyle.row, style]}>
      {children}
    </GRow>
  )
}

export const Col = (props) => {
  const { children, style } = props
  const compStyle = styles(props)
  return (
    <GCol {...props} style={[compStyle.default, compStyle.col, style]}>
      {children}
    </GCol>
  )
}

const GridTypes = {
  center: PropTypes.string,
  style: ViewPropTypes.style,
  children: PropTypes.node.isRequired,
  hPad: PropTypes.string,
  vPad: PropTypes.string,
  justify: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
}

const GridDefault = {
  center: null,
  style: {},
  hPad: "0%",
  vPad: "0%",
  justify: "center",
  height: null,
  width: null,
}

Row.propTypes = {
  ...GRow.propTypes,
  ...GridTypes,
}

Row.defaultProps = GridDefault

Col.propTypes = {
  ...GCol.propTypes,
  ...GridTypes,
}

Col.defaultProps = GridDefault
