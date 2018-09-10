// home.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { API } from 'aws-amplify';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Navigation } from 'react-native-navigation';
import { createFeed } from './api/feed';

@observer
export default class Home extends React.Component {
  @observable
  testReply = '';
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Home'
        }
      }
    };
  }

  testLocal = async () => {
    const resp = await createFeed();
    console.log(resp);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button onPress={() => this.testLocal()} title="Test Api" />
        <Text>{this.testReply}</Text>
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
