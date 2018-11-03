// home.js

import React from "react"
import { View, Text, Button, StyleSheet } from "react-native"
import { goHome } from "../actions/navigation"
import { Navigation } from "react-native-navigation"

export default class Signin extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Sign in</Text>
        <Button title={"Go Home"} onPress={() => goHome()} />
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
