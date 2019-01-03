// initializing.js

import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"

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

@inject("uiStore")
@observer
export default class Initializing extends React.Component {
  componentDidMount() {
    const { uiStore } = this.props
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
}
