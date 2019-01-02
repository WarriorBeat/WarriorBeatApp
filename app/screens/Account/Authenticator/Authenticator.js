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
      errorCodes: [
        "UsernameExistsException",
        "InvalidEmailParameterException",
        "UserNotFoundException",
      ],
    },
    password: {
      label: "Password",
      icon: icons.lock,
      hidden: true,
      value: "",
      error: "",
      errorCodes: [
        "InvalidParameterException",
        "InvalidPasswordException",
        "NotAuthorizedException",
      ],
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
      helpText: "Forgot Password?",
      onHelp: () => this.handleStatus("forgotPassword"),
      displayHelp: false,
    },
    signup: {
      fields: ["email", "password", "confirmPassword"],
      onSubmit: () => this.handleSignup(),
      submitText: "Sign Up",
      helpText: "Already have a verification code?",
      onHelp: () => this.handleStatus("validateAlready"),
      displayHelp: false,
    },
    validate: {
      desc: () => `A verification code has been sent to you at ${
        this.fields.email.value
      }. Please enter it below to validate your email address.`,
      fields: ["validateEmail"],
      onSubmit: () => this.handleValidation(),
      submitText: "Validate",
    },
    validateAlready: {
      desc: () => "Enter the email you wish to validate.",
      fields: ["email"],
      onSubmit: () => this.handleStatus("validate"),
      submitText: "Submit",
    },
    signupSuccess: {
      desc: () => "Success! Your account has been verified. Click the button below to continue.",
      fields: [],
      onSubmit: () => Navigation.dismissAllModals(),
      submitText: "Close",
      submitColor: colors.ios.blue,
    },
    forgotPassword: {
      desc: () => "Enter your email below to reset your password.",
      fields: ["email"],
      onSubmit: () => this.handleForgot(),
      submitText: "Submit",
    },
    resetPassword: {
      desc: () => `Enter the confirmation code sent to ${this.fields.email.value} and a new password.`,
      fields: ["validateEmail", "password", "confirmPassword"],
      onSubmit: () => this.handleReset(),
      submitText: "Submit",
    },
    resetSuccess: {
      desc: () => "Success! Your password has been reset. Press the button below to continue and login with your new credentials.",
      fields: [],
      onSubmit: () => this.handleStatus("login"),
      submitText: "Continue",
      submitColor: colors.ios.blue,
    },
  }

  handleChange = (key, value) => {
    this.fields[key].value = value
  }

  handleError = (error) => {
    const { code, message } = error
    const form = this.forms[this.currentForm]
    Object.keys(this.fields).map((key) => {
      const field = this.fields[key]
      if (field.errorCodes.includes(code)) {
        return (field.error = message)
      }
      if (form.displayHelp === false) {
        form.displayHelp = true
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

  handleStatus = (nextForm = null) => {
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
        if (nextForm) {
          return (this.currentForm = nextForm)
        }
        return Navigation.dismissAllModals()
      },
    )
  }

  handleLogin = () => {
    const { userStore } = this.props
    const { email, password } = this.fields
    if (email.value.length <= 0 || password.value.length <= 0) {
      this.clearErrors()
      this.fields.password.error = "Email and Password are required."
      return false
    }
    this.isLoading = true
    userStore.authenticateUser(email.value, password.value)
    return this.handleStatus()
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
    const { email, password, validateEmail } = this.fields
    this.isLoading = true
    userStore.validateUser(email.value, password.value, validateEmail.value)
    return this.handleStatus("signupSuccess")
  }

  handleForgot = () => {
    const { userStore } = this.props
    const { email } = this.fields
    this.isLoading = true
    userStore.forgotPassword(email.value)
    return this.handleStatus("resetPassword")
  }

  handleReset = () => {
    const { userStore } = this.props
    const {
      email, validateEmail, password, confirmPassword,
    } = this.fields
    if (password.value !== confirmPassword.value) {
      this.clearErrors()
      this.fields.confirmPassword.error = "Password must match!"
      return false
    }
    this.isLoading = true
    userStore.resetPassword(email.value, validateEmail.value, password.value)
    return this.handleStatus("resetSuccess")
  }

  handleTab = (pos) => {
    this.clearErrors()
    this.currentForm = pos === 1 ? "signup" : "login"
  }

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
