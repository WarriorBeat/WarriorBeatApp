/**
 * NavMenu.js
 * NavMenu Component
 * components/Menu
 */
import React from "react"
import { View } from "react-native"
import { icons } from "config/styles"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import SideMenu from "./SideMenu"
import { HeaderButton, FooterButton } from "./MenuButton"

@inject("userStore", "uiStore", "homeStore")
@observer
class NavMenu extends React.Component {
  render() {
    const { userStore, uiStore, homeStore } = this.props
    return (
      <SideMenu
        logo
        footer={(
          <View>
            <FooterButton onPress={() => uiStore.push("Meta.AboutUs")} title="About Us" />
            <FooterButton
              onPress={() => uiStore.push("Meta.MeetTheStaff")}
              title="Meet the Staff"
            />
            <FooterButton title="Social" />
          </View>
        )}
      >
        <HeaderButton
          onPress={() => {
            homeStore.activeSlide = 0
            uiStore.goTo("Home")
          }}
          title="News"
          icon={{ ...icons.news }}
        />
        <HeaderButton title="My Feed" icon={icons.home} requiresAuth={userStore.authed} />
        <HeaderButton
          title="Logout"
          icon={icons.logout}
          requiresAuth={userStore.authed}
          onPress={() => userStore.logout()}
        />
        <HeaderButton
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
  homeStore: MobxTypes.observableObject.isRequired,
}

export default NavMenu
