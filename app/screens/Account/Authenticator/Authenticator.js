/**
 * Authenticator.js
 * User Authenticator Screen
 * screens
 */

import React from "react"
import { View } from "react-native"
import { observer, inject } from "mobx-react/native"
import { observable } from "mobx"
import TabbedHeader from "components/Header"
import styles from "./styles"

import Login from "./Login"
import Signup from "./Signup"

@inject("userStore")
@observer
class Authenticator extends React.Component {
  @observable
  page = 0

  @observable
  fields = {
    email: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
    confirmPassword: {
      value: "",
      error: "",
    },
  }

  handleChange = (key, value) => {
    this.fields[key].value = value
  }

  handleLogin = () => {
    const { userStore } = this.props
    const { email, password } = this.fields
    return userStore.authenticateUser(email.value, password.value)
  }

  handleSignup = () => {
    const { userStore } = this.props
    const { email, password, confirmPassword } = this.fields
    if (password.value !== confirmPassword.value) {
      this.fields.confirmPassword.error = "Password must match!"
      return false
    }
    return userStore.createUser(email.value, password.value)
  }

  render() {
    return (
      <View style={styles.root}>
        <TabbedHeader
          onTabSwitch={pos => (this.page = pos)}
          leftButton="Login"
          rightButton="Sign Up"
        />
        {this.page === 0 ? (
          <Login onChange={this.handleChange} onSubmit={this.handleLogin} />
        ) : (
          <Signup onChange={this.handleChange} onSubmit={this.handleSignup} data={this.fields} />
        )}
      </View>
    )
  }
}

export default Authenticator
