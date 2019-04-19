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
  center, vPad, hPad, justify, wrap, width, height,
}) => StyleSheet.create({
  default: {
    ...Position.center(center, justify),
    ...Position.paddingV(vPad),
    ...Position.paddingH(hPad),
    ...Shape.width(width),
    ...Shape.height(height),
    flexWrap: wrap ? "wrap" : "nowrap",
  },
})

export const Row = (props) => {
  const { children, style } = props
  return (
    <GRow {...props} style={[styles(props).default, style]}>
      {children}
    </GRow>
  )
}

export const Col = (props) => {
  const { children, style } = props
  return (
    <GCol {...props} style={[styles(props).default, style]}>
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
  height: "100%",
  width: "100%",
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
