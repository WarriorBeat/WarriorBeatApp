/**
 * MenuButton.js
 * MenuButton Component
 * components/Menu
 */

import React from "react"
import PropTypes from "prop-types"
import { Button, Text, Icon } from "native-base"
import { ViewPropTypes, StyleSheet } from "react-native"
import { Colors } from "components/styles"
import { observer } from "mobx-react/native"

const styles = StyleSheet.create({
  header: {
    ...Colors.color("whitePrimary"),
    fontWeight: "bold",
  },
  footer: {
    ...Colors.color("whiteSecondary"),
    fontWeight: "bold",
    fontSize: 16,
  },
})

const MenuButton = observer(({
  requiresAuth, icon, title, textStyle, onPress, large,
}) => {
  if (requiresAuth !== false || requiresAuth === undefined) {
    return (
      <Button large={large} iconLeft transparent light onPress={onPress}>
        <Icon {...icon} />
        <Text uppercase={false} style={textStyle}>
          {title}
        </Text>
      </Button>
    )
  }
  return null
})

const HeaderButton = props => <MenuButton large textStyle={styles.header} {...props} />

const FooterButton = props => <MenuButton textStyle={styles.footer} {...props} />

MenuButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.objectOf(PropTypes.string),
  onPress: PropTypes.func,
  textStyle: ViewPropTypes.style,
  requiresAuth: ViewPropTypes.bool,
}

MenuButton.defaultProps = {
  icon: {},
  onPress: () => {},
  textStyle: {},
  requiresAuth: null,
}

export { HeaderButton, FooterButton }
export default MenuButton
