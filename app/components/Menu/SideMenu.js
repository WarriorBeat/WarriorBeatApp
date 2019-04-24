/**
 * SideMenu.js
 * SideMenu Component
 * Main File
 */

import React from "react"
import { View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { PropTypes } from "prop-types"
import Image from "react-native-fast-image"
import sideMenu from "./styles"

const SideMenu = (props) => {
  const {
    headerImage, header, footer, children,
  } = props
  return (
    <LinearGradient
      style={sideMenu.container}
      colors={["#2d2d2d", "#393939"]}
      locations={[0.2, 0.3]}
      start={{ x: 0.5, y: 1.0 }}
      end={{ x: 1, y: 0.25 }}
    >
      <View style={sideMenu.container}>
        {headerImage ? (
          <Image
            source={headerImage}
            style={sideMenu.image}
            resizeMode={Image.resizeMode.contain}
          />
        ) : (
          undefined
        )}
        <View style={sideMenu.container_content}>{children}</View>
        <View style={sideMenu.header_container}>{header}</View>
        <View style={sideMenu.footer_container}>{footer}</View>
      </View>
    </LinearGradient>
  )
}

SideMenu.propTypes = {
  headerImage: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  header: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.node.isRequired,
}

SideMenu.defaultProps = {
  headerImage: false,
  header: null,
  footer: null,
}

export default SideMenu
