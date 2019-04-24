/**
 * MenuButton.js
 * MenuButton Component
 * components/Menu
 */

import React from "react"
import PropTypes from "prop-types"
import { Button } from "react-native-elements"
import { ViewPropTypes } from "react-native"
import sideMenu from "./styles"

const MenuButton = (props) => {
  const {
    isHeader, isFooter, title, icon, onPress, buttonStyle, titleStyle, requiresAuth,
  } = props
  let btnTitleStyle = isHeader ? sideMenu.buttonHeaderText : sideMenu.buttonText
  btnTitleStyle = isFooter ? sideMenu.buttonFooterText : btnTitleStyle

  const btnStyle = isFooter ? sideMenu.buttonSecondary : sideMenu.button
  if (requiresAuth !== false || requiresAuth === undefined) {
    return (
      <Button
        type="clear"
        titleStyle={{ ...btnTitleStyle, ...titleStyle }}
        buttonStyle={{ ...btnStyle, ...buttonStyle }}
        title={title}
        icon={{ ...icon, color: "white" }}
        onPress={onPress}
      />
    )
  }
  return null
}

MenuButton.propTypes = {
  isHeader: PropTypes.bool,
  isFooter: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  icon: PropTypes.objectOf(PropTypes.string),
  onPress: PropTypes.func,
  buttonStyle: ViewPropTypes.style,
  titleStyle: ViewPropTypes.style,
  requiresAuth: ViewPropTypes.bool,
}

MenuButton.defaultProps = {
  isHeader: false,
  isFooter: false,
  icon: {},
  onPress: () => {},
  buttonStyle: {},
  titleStyle: {},
  requiresAuth: null,
}

export default MenuButton
