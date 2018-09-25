// item.js

import React from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-elements';
import { observer } from 'mobx-react';
import { Navigation } from 'react-native-navigation';
import { observable } from 'mobx';

@observer
export default class FeedItem extends React.Component {
  render() {
    let { item } = this.props;
    return (
      <View style={styles.container}>
        <Card title={item.title}>
          {Object.keys(item).map((key, index) => {
            return key !== 'cover_img' ? (
              <Text>
                <Text style={{ fontWeight: '600' }}>{`${key}: `}</Text>
                {`${item[key]}`}
              </Text>
            ) : (
              <Text style={{ fontWeight: '600' }}>
                cover_img: Redacted cause length
              </Text>
            );
          })}
        </Card>
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
