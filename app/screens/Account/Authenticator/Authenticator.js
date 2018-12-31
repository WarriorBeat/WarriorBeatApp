/**
 * Authenticator.js
 * User Authenticator Screen
 * screens
 */

import React from "react"
import { View } from "react-native"
import Text from "components/Text"
import { Button, Divider } from "react-native-elements"
import { observer } from "mobx-react/native"
import { observable } from "mobx"
import TabbedHeader from "components/Header"
import Input from "components/Input"
import { colors, icons } from "config/styles"
import styles from "./styles"

class Authenticator extends React.Component {
  @observable
  status

  render() {
    return (
      <View style={styles.root}>
        <TabbedHeader leftButton="Login" rightButton="Sign Up" />
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
      </View>
    )
  }
}

export default observer(Authenticator)
