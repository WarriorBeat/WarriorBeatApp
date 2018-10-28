// home.js

import React from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import { List, Text } from 'react-native-elements';
import { observer } from 'mobx-react';
import NewsBlock from '../components/NewsBlock/index';

@observer
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

  componentDidMount() {
    const { store } = this.props;
    store.fetchPosts();
  }

  render() {
    const { store } = this.props;

    return (
      <View style={styles.container}>
        <Text h3>Posts</Text>
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
              justifyContent: 'center',
              alignItems: 'center',
              margin: 20
            }}
          >
            {store.posts.map(p => {
              return <NewsBlock key={p.postId} post={p} />;
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
    alignItems: 'center',
    alignContent: 'center'
  }
});
