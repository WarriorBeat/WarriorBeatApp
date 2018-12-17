/**
 * SideMenu.js
 * SideMenu Component
 * Main File
 */

import React from "react"
import { View, Image } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { Button } from "react-native-elements"
import sideMenu from "./styles"

export const MenuButton = (props) => {
  const {
    isHeader, isFooter, title, icon, onPress, buttonStyle, textStyle,
  } = props
  let btnTextStyle = isHeader ? sideMenu.buttonHeaderText : sideMenu.buttonText
  btnTextStyle = isFooter ? sideMenu.buttonFooterText : btnTextStyle

  const btnStyle = buttonStyle || isFooter ? sideMenu.buttonSecondary : sideMenu.button

  return (
    <Button
      large
      backgroundColor="transparent"
      textStyle={{ ...btnTextStyle, ...textStyle }}
      buttonStyle={btnStyle}
      title={title}
      icon={icon}
      onPress={onPress}
    />
  )
}

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
          <Image source={headerImage} style={sideMenu.image} resizeMode="cover" />
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

export default SideMenu
