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

export const Header = ({ children, Color, Content }, props) => (
  <Text Weight="bold" Color={Color} {...props}>
    {Content || children}
  </Text>
)

export const Title = ({ children, Color, Content }, props) => (
  <Text Weight="semibold" Type="title" Color={Color} {...props}>
    {Content || children}
  </Text>
)

export const TitleBlack = ({ children, Color, Content }, props) => (
  <Text Weight="black" Type="titlesm" Color={Color} Uppercase {...props}>
    {Content || children}
  </Text>
)

export const SubtitleBlack = ({ children, Color, Content }) => (
  <Text Weight="black" Type="footer" Color={Color}>
    {Content || children}
  </Text>
)

export const Body = ({ Color, children, Content }) => (
  <Text fontSize={16} Color={Color} Type="body">
    {Content || children}
  </Text>
)

export const HTMLBody = ({ Content }) => <HTML html={Content} baseFontStyle={styles.html} />

Header.propTypes = {
  children: PropTypes.node.isRequired,
  Color: PropTypes.string,
  Content: PropTypes.string,
}

Header.defaultProps = {
  Color: "ios.black",
  Content: null,
}

Title.propTypes = Header.propTypes
Title.defaultProps = Header.defaultProps

TitleBlack.propTypes = Header.propTypes
TitleBlack.defaultProps = {
  Content: null,
  Color: "ios.black",
}

SubtitleBlack.propTypes = Header.propTypes
SubtitleBlack.defaultProps = {
  Content: null,
  Color: "ios.blue",
}

Body.propTypes = Header.propTypes
Body.defaultProps = {
  Color: "blackPrimary",
  Content: null,
}

HTMLBody.propTypes = {
  Content: HTML.propTypes.html.isRequired,
}
