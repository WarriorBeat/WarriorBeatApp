/**
 * Authenticator.js
 * User Authenticator Screen
 * screens
 */

import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react/native"
import { observable } from "mobx"
import TabbedHeader from "components/Header"
import styles from "./styles"

import Login from "./Login"
import Signup from "./Signup"

class Authenticator extends React.Component {
  @observable
  page = 0

  render() {
    return (
      <View style={styles.root}>
        <TabbedHeader
          onTabSwitch={pos => (this.page = pos)}
          leftButton="Login"
          rightButton="Sign Up"
        />
        {this.page === 0 ? <Login /> : <Signup />}
      </View>
    )
  }
}

export default observer(Authenticator)
