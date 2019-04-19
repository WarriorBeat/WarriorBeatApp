/**
 * Typography.js
 * Typography Components
 * components/Text
 */

import React from "react"
import PropTypes from "prop-types"
import HTML from "react-native-render-html"
import { StyleSheet } from "react-native"
import { Colors } from "components/styles"
import Text from "./Text"
import * as TextStyle from "./styles"

const styles = StyleSheet.create({
  html: {
    ...TextStyle.type.body,
    ...Colors.color("blackPrimary"),
    fontSize: 16,
  },
})

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

export const HTMLBody = (props) => {
  const { content } = props
  return <HTML html={content} baseFontStyle={styles.html} />
}

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

HTMLBody.propTypes = {
  content: HTML.propTypes.html.isRequired,
}
