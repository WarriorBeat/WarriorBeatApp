/**
 * Grid.js
 * Generic Grid Components
 * components/Layout
 */

import React from "react"
import PropTypes from "prop-types"
import { Col as GCol, Row as GRow } from "react-native-easy-grid"
import { Position } from "components/styles"
import { StyleSheet, ViewPropTypes } from "react-native"

const styles = ({ center, vPad, hPad }) => StyleSheet.create({
  default: {
    ...Position.center(center),
    ...Position.paddingV(vPad),
    ...Position.paddingH(hPad),
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
  const { center, children, style } = props
  return (
    <GCol {...props} style={[center ? styles(center).center : {}, style]}>
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
}

const GridDefault = {
  center: null,
  style: {},
  hPad: "0%",
  vPad: "0%",
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
