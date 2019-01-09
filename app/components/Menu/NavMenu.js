/**
 * NavMenu.js
 * NavMenu Component
 *
 * Primary Navigation Menu
 * Main File
 */
import React from "react"
import { View } from "react-native"
import brandMedia from "config/assets"
import { icons } from "config/styles"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import { SideMenu, MenuButton } from "./index"

@inject("userStore", "uiStore")
@observer
class NavMenu extends React.Component {
  render() {
    const { userStore, uiStore } = this.props
    return (
      <SideMenu
        headerImage={brandMedia.warrior_head}
        footer={(
          <View>
            <MenuButton isFooter title="About Us" />
            <MenuButton isFooter title="Meet the Staff" />
            <MenuButton isFooter title="Social" />
          </View>
        )}
      >
        <MenuButton onPress={() => uiStore.goTo("Home")} title="News" icon={icons.news} />
        <MenuButton title="My Feed" icon={icons.home} requiresAuth={userStore.authed} />
        <MenuButton
          title="Logout"
          icon={icons.logout}
          requiresAuth={userStore.authed}
          onPress={() => userStore.logout()}
        />
        <MenuButton
          onPress={() => uiStore.toggle("Account.Authenticator")}
          title="Login / Signup"
          icon={icons.user}
          requiresAuth={!userStore.authed}
        />
      </SideMenu>
    )
  }
}

NavMenu.wrappedComponent.propTypes = {
  userStore: MobxTypes.observableObject.isRequired,
  uiStore: MobxTypes.observableObject.isRequired,
}

export default NavMenu
