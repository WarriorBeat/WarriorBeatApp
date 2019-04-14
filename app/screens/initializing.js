// initializing.js

import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import { when } from "mobx"

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

@inject("uiStore", "userStore")
@observer
class Initializing extends React.Component {
  async componentDidMount() {
    const { uiStore, userStore } = this.props
    await when(() => userStore.ready)
    uiStore.state = "ready"
    uiStore.goTo("Home")
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome</Text>
      </View>
    )
  }
}

Initializing.wrappedComponent.propTypes = {
  uiStore: MobxTypes.observableObject.isRequired,
  userStore: MobxTypes.observableObject.isRequired,
}

export default Initializing
