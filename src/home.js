// home.js

import React from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import { List, Text, ListItem } from 'react-native-elements';
import { API } from 'aws-amplify';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Navigation } from 'react-native-navigation';
import { openFeed } from './navigation';
import { fetchFeed } from './api/feed';

@observer
export default class Home extends React.Component {
  @observable
  feedItems = [];
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Home'
        }
      }
    };
  }

  // Test function for grabbing feed from api
  testFeed = async () => {
    const resp = await fetchFeed();
    this.feedItems = resp;
  };

  // Test opening feed
  openFeed = feed_item => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'FeedItem',
        passProps: {
          item: feed_item
        },
        options: {
          topBar: {
            title: {
              text: feed_item.title
            }
          }
        }
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button onPress={() => this.testFeed()} title="Test Api" />
        <Text>Feed Items</Text>
        <ScrollView
          style={{
            flex: 2,
            alignSelf: 'stretch',
            alignContent: 'stretch'
          }}
        >
          <List
            containerStyle={{
              flex: 1,
              marginTop: 20,
              marginBottom: 20
            }}
          >
            {this.feedItems.map(f => {
              console.log('F Item', f.feedId);
              return (
                <ListItem
                  key={f.feedId}
                  title={f.title}
                  subtitle={`${f.author} ${f.date}`}
                  onPress={() => this.openFeed(f)}
                />
              );
            })}
          </List>
        </ScrollView>
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
