/**
 * Authenticator/Login.js
 * User Authenticator Login Screen
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

const Login = ({ onChange, onSubmit }) => (
  <View style={styles.authContainer}>
    <View>
      <Input
        label="Email"
        name="email"
        handleChange={onChange}
        leftIcon={{ ...icons.email, color: colors.ios.gray }}
      />
      <Input
        label="Password"
        name="password"
        handleChange={onChange}
        leftIcon={{ ...icons.lock, color: colors.ios.gray }}
        hideText
      />
    </View>
    <View style={styles.submitContainer}>
      <Divider />
      <Button
        title={(
          <Text Color="white" Weight="bold" Type="titlexsm">
            Login
          </Text>
        )}
        raised
        containerStyle={styles.submitButtonContainer}
        buttonStyle={styles.submitButton}
        onPress={onSubmit}
      />
    </View>
  </View>
)

export default observer(Login)
