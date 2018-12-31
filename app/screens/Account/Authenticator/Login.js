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
import styles from "./styles"

const Login = () => (
  <View style={styles.authContainer}>
    <View>
      <Input label="Email" leftIcon={{ ...icons.email, color: colors.ios.gray }} />
      <Input label="Password" leftIcon={{ ...icons.lock, color: colors.ios.gray }} hideText />
    </View>
    <View style={styles.submitContainer}>
      <Divider />
      <Button
        title={(
          <Text Color="white" Weight="bold">
            Login
          </Text>
        )}
        raised
        containerStyle={styles.submitButtonContainer}
        buttonStyle={styles.submitButton}
      />
    </View>
  </View>
)

export default Login
