/**
 * Logo.js
 * WarriorBeat Logo Image
 * componenents/Generic
 */

import React from "react"
import Image from "react-native-fast-image"
import brandMedia from "config/assets"
import { ViewPropTypes, StyleSheet } from "react-native"
import { Shape } from "components/styles"
import { PropTypes } from "mobx-react/native"

const Logo = (props) => {
  const { style, resize, size } = props
  const styles = StyleSheet.flatten([Shape.circle(size), style])
  return <Image source={brandMedia.warrior_head} style={styles} resizeMode={resize} />
}

Logo.propTypes = {
  style: ViewPropTypes.style,
  resize: Image.propTypes.resizeMode,
  size: PropTypes.string,
}

Logo.defaultProps = {
  style: {},
  resize: Image.resizeMode.contain,
  size: "30%",
}

export default Logo
