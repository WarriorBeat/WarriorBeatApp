// signup.js

import React from "react"
import { View, StyleSheet } from "react-native"
import { Button, FormLabel, FormInput, Text } from "react-native-elements"
import { Auth } from "aws-amplify"
import { observer } from "mobx-react"
import { observable } from "mobx"
import * as log from "loglevel"

@observer
class Signup extends React.Component {
  @observable
  userInput = {
    username: "",
    password: "",
    email: "",
    phone_number: "",
    auth_code: "",
    showConfirm: false
  }

  onChangeText = (key, val) => {
    this.userInput[key] = val
  }

  signUp = async () => {
    const { username, password, email, phone_number } = this.userInput
    try {
      const newUser = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          phone_number
        }
      })
      log.info("USER SIGNUP SUCCESS: ", newUser)
    } catch (err) {
      log.warn("USER SIGNUP FAILED", err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FormLabel>
          <Text>Username</Text>
        </FormLabel>
        <FormInput
          placeholder={"Please enter a username"}
          autoCapitalize="none"
          onChangeText={val => this.onChangeText("username", val)}
        />
        <FormLabel>
          <Text>Password</Text>
        </FormLabel>
        <FormInput
          placeholder={"Please enter a password"}
          autoCapitalize="none"
          onChangeText={val => this.onChangeText("password", val)}
        />
        <FormLabel>
          <Text>Email</Text>
        </FormLabel>
        <FormInput
          placeholder={"Please enter your email"}
          autoCapitalize="none"
          onChangeText={val => this.onChangeText("email", val)}
        />
        <FormLabel>
          <Text>Phone NUmber</Text>
        </FormLabel>
        <FormInput
          placeholder={"Please enter your phone number"}
          autoCapitalize="none"
          onChangeText={val => this.onChangeText("phone_number", val)}
        />
        <Button raised onPress={() => this.signUp()} title={"Sign Up"} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default Signup
