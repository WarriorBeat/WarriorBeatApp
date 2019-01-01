/**
 * Authenticator/Signup.js
 * User Authenticator Signup Screen
 * screens
 */

import React from "react"
import { View } from "react-native"
import { Button, Divider } from "react-native-elements"
import Text from "components/Text"
import Input from "components/Input"
import { colors, icons } from "config/styles"
import { observer } from "mobx-react/native"
import styles from "./styles"

const SignupFields = ({ onChange, data }) => (
  <View>
    <Input
      label="Email"
      name="email"
      handleChange={onChange}
      leftIcon={{ ...icons.email, color: colors.ios.gray }}
      errorMessage={data.email.error}
    />
    <Input
      label="Password"
      handleChange={onChange}
      name="password"
      leftIcon={{ ...icons.lock, color: colors.ios.gray }}
      hideText
      errorMessage={data.password.error}
    />
    <Input
      label="Confirm Password"
      leftIcon={{ ...icons.lock, color: colors.ios.gray }}
      hideText
      handleChange={onChange}
      name="confirmPassword"
      errorMessage={data.confirmPassword.error}
    />
  </View>
)

const Signup = ({ onChange, onSubmit, data }) => (
  <View style={styles.authContainer}>
    <SignupFields onChange={onChange} data={data} />
    <View style={styles.submitContainer}>
      <Divider />
      <Button
        onPress={onSubmit}
        title={(
          <Text Color="white" Weight="bold" Type="titlexsm">
            Sign Up
          </Text>
        )}
        raised
        containerStyle={styles.submitButtonContainer}
        buttonStyle={styles.submitSignup}
      />
    </View>
  </View>
)

export default observer(Signup)
