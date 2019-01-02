/**
 * Authenticator.js
 * User Authenticator Screen
 * screens
 */

import React from "react"
import { View } from "react-native"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import { observable, when } from "mobx"
import TabbedHeader from "components/Header"
import { icons, colors } from "config/styles"
import { Navigation } from "react-native-navigation"
import styles from "./styles"

import AuthForm from "./AuthForm"

@inject("userStore")
@observer
class Authenticator extends React.Component {
  @observable
  currentForm = "login"

  @observable
  isLoading = false

  @observable
  fields = {
    email: {
      label: "Email",
      icon: icons.email,
      value: "",
      error: "",
      errorCodes: ["UsernameExistsException", "InvalidEmailParameterException"],
    },
    password: {
      label: "Password",
      icon: icons.lock,
      hidden: true,
      value: "",
      error: "",
      errorCodes: ["InvalidParameterException", "InvalidPasswordException"],
    },
    confirmPassword: {
      label: "Confirm Password",
      icon: icons.lock,
      hidden: true,
      value: "",
      error: "",
      errorCodes: [],
    },
    validateEmail: {
      label: "Verification Code",
      icon: icons.check,
      value: "",
      error: "",
      errorCodes: ["CodeMismatchException"],
    },
  }

  forms = {
    login: {
      fields: ["email", "password"],
      onSubmit: () => this.handleLogin(),
      submitText: "Login",
      submitColor: colors.ios.blue,
    },
    signup: {
      fields: ["email", "password", "confirmPassword"],
      onSubmit: () => this.handleSignup(),
      submitText: "Sign Up",
    },
    validate: {
      desc: () => `A verification code has been sent to you at ${
        this.fields.email.value
      }. Please enter it below to validate your email address.`,
      fields: ["validateEmail"],
      onSubmit: () => this.handleValidation(),
      submitText: "Validate",
    },
    signupSuccess: {
      desc: () => "Success! Your account has been verified. Click the button below to continue.",
      fields: [],
      onSubmit: () => Navigation.dismissAllModals(),
      submitText: "Close",
      submitColor: colors.ios.blue,
    },
  }

  handleChange = (key, value) => {
    this.fields[key].value = value
  }

  handleError = (error) => {
    const { code, message } = error
    Object.keys(this.fields).map((key) => {
      const field = this.fields[key]
      if (field.errorCodes.includes(code)) {
        return (field.error = message)
      }
      return null
    })
  }

  clearErrors = () => {
    Object.keys(this.fields).map((key) => {
      const field = this.fields[key]
      field.error = ""
      return field
    })
  }

  handleStatus = (nextForm) => {
    const { userStore } = this.props
    when(
      () => userStore.status === "ready" || userStore.status === "failed",
      () => {
        this.clearErrors()
        this.isLoading = false
        if (userStore.status === "failed") {
          this.handleError(userStore.error)
          return userStore.resolve()
        }
        return (this.currentForm = nextForm)
      },
    )
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
      this.clearErrors()
      this.fields.confirmPassword.error = "Password must match!"
      return false
    }
    this.isLoading = true
    userStore.createUser(email.value, password.value)
    return this.handleStatus("validate")
  }

  handleValidation = () => {
    const { userStore } = this.props
    const { email, validateEmail } = this.fields
    this.isLoading = true
    userStore.validateUser(email.value, validateEmail.value)
    return this.handleStatus("signupSuccess")
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
          isLoading={this.isLoading}
        />
      </View>
    )
  }
}

Authenticator.wrappedComponent.propTypes = {
  userStore: MobxTypes.observableObject.isRequired,
}

export default Authenticator
