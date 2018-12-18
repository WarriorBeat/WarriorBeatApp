// initializing.js

import React from "react"
import { goHome } from "actions/navigation"
import { View, Text, StyleSheet } from "react-native"
import { observer } from "mobx-react/native"

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

@observer
export default class Initializing extends React.Component {
  componentDidMount() {
    goHome()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome</Text>
      </View>
    )
  }
}
