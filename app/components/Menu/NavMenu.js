/**
 * NavMenu.js
 * NavMenu Component
 * components/Menu
 */
import React from "react"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import { Social } from "components/Generic"
import { Row, Col } from "components/Layout"
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
          <Col>
            <Row size={2} center="end">
              <Col>
                <FooterButton onPress={() => uiStore.push("Meta.AboutUs")} title="About Us" />
                <FooterButton
                  onPress={() => uiStore.push("Meta.MeetTheStaff")}
                  title="Meet the Staff"
                />
              </Col>
            </Row>
            <Row width="85%" hPad="0%" center="end" justify="flex-start">
              <Social light hPad="5%" />
            </Row>
          </Col>
        )}
      >
        <HeaderButton
          onPress={() => {
            homeStore.activeSlide = 0
            uiStore.goTo("Home")
          }}
          title="News"
          icon={{ name: "newspaper-o", type: "FontAwesome" }}
        />
        <HeaderButton
          title="My Feed"
          icon={{ name: "home", type: "Entypo" }}
          requiresAuth={userStore.authed}
        />
        <HeaderButton
          title="Logout"
          icon={{ name: "logout", type: "MaterialCommunityIcons" }}
          requiresAuth={userStore.authed}
          onPress={() => userStore.logout()}
        />
        <HeaderButton
          onPress={() => uiStore.toggle("Account.Authenticator")}
          title="Login / Signup"
          icon={{ name: "user", type: "FontAwesome" }}
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
