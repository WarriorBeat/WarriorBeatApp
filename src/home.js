// home.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { Navigation } from 'react-native-navigation';

export default class Home extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Home'
        }
      }
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button
          onPress={() => {
            Navigation.push(this.props.componentId, {
              component: {
                name: 'Screen2'
              }
            });
          }}
          title="Go to Screen 2"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
