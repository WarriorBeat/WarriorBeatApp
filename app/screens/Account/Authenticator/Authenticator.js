/**
 * Authenticator.js
 * User Authenticator Screen
 * screens
 */

import React from "react"
import { View } from "react-native"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import { observable } from "mobx"
import TabbedHeader from "components/Header"
import { icons, colors } from "config/styles"
import styles from "./styles"

import AuthForm from "./AuthForm"

@inject("userStore")
@observer
class Authenticator extends React.Component {
  @observable
  currentForm = "login"

  @observable
  fields = {
    email: {
      label: "Email",
      icon: icons.email,
      value: "",
      error: "",
    },
    password: {
      label: "Password",
      icon: icons.lock,
      hidden: true,
      value: "",
      error: "",
    },
    confirmPassword: {
      label: "Confirm Password",
      icon: icons.lock,
      value: "",
      error: "",
    },
    validateEmail: {
      label: "Validate Email",
      icon: icons.email,
      value: "",
      error: "",
    },
  }

  forms = {
    login: {
      fields: ["email", "password"],
      onSubmit: this.handleLogin,
      submitText: "Login",
      submitColor: colors.ios.blue,
    },
    signup: {
      fields: ["email", "password", "confirmPassword"],
      onSubmit: this.handleSignup,
      submitText: "Sign Up",
    },
    validate: {
      fields: ["validateEmail"],
      onSubmit: this.handleValidation,
      submitText: "Validate",
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

  handleTab = pos => (pos === 1 ? (this.currentForm = "signup") : (this.currentForm = "login"))

  render() {
    return (
      <View style={styles.root}>
        <TabbedHeader
          onTabSwitch={pos => this.handleTab(pos)}
          leftButton="Login"
          rightButton="Sign Up"
        />
        <AuthForm
          form={this.forms[this.currentForm]}
          fields={this.fields}
          onChange={this.handleChange}
        />
      </View>
    )
  }
}

Authenticator.wrappedComponent.propTypes = {
  userStore: MobxTypes.observableObject.isRequired,
}

export default Authenticator
