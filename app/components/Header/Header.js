/**
 * Header.js
 * Header Component
 * components
 */

import React from "react"
import PropTypes from "prop-types"
import { Header as RNEHeader, Icon } from "react-native-elements"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import { icons, colors } from "config/styles"

const Return = props => <Icon {...icons.arrow_back} underlayColor={colors.transparent} {...props} />

const Header = inject("uiStore")(
  observer(({
    uiStore, backgroundColor, activeIconColor, inActiveIconColor, active,
  }, props) => (
    <RNEHeader
      barStyle={active ? "light-content" : "dark-content"}
      backgroundColor={backgroundColor}
      leftComponent={(
        <Return
          color={active ? activeIconColor : inActiveIconColor}
          onPress={() => uiStore.goBack()}
        />
      )}
      {...props}
    />
  )),
)

Header.wrappedComponent.propTypes = {
  uiStore: MobxTypes.observableObject.isRequired,
}

Header.propTypes = {
  activeColor: PropTypes.string,
  inActiveColor: PropTypes.string,
  activeIconColor: PropTypes.string,
  inActiveIconColor: PropTypes.string,
  active: PropTypes.bool,
}

Header.defaultProps = {
  activeColor: colors.primary,
  inActiveColor: colors.transparent,
  activeIconColor: colors.white,
  inActiveIconColor: colors.primaryDark,
  active: false,
}

export default Header
