/**
 * Typography.js
 * Typography Components
 * components/Text
 */

import React from "react"
import PropTypes from "prop-types"
import Text from "./Text"

export const Header = ({ children, Color }) => (
  <Text Weight="semibold" Color={Color}>
    {children}
  </Text>
)

export const Body = ({ Color, children }) => (
  <Text fontSize={16} Color={Color} Type="body">
    {children}
  </Text>
)

Header.propTypes = {
  children: PropTypes.node.isRequired,
  Color: PropTypes.string,
}

Header.defaultProps = {
  Color: "black",
}

Body.propTypes = {
  children: PropTypes.node.isRequired,
  Color: PropTypes.string,
}

Body.defaultProps = {
  Color: "blackPrimary",
}
