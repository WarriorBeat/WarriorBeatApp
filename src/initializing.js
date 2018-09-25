// initializing.js

import React from 'react';
import { goHome, goToAuth } from './navigation';
import { View, Text, StyleSheet } from 'react-native';
// TODO: get images from media server
import load_image from "./media/moksha.JPG"

export default class Initializing extends React.Component {
  async componentDidMount() {
    goToAuth();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
