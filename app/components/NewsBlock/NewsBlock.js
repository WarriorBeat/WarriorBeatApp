/**
 * NewsBlock.js
 * News Block Component
 * Main File
 */

import React from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import { Text, Tile } from 'react-native-elements';
import { styles } from './styles';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

class NewsBlock extends React.Component {
  render() {
    let post = this.props.post;
    return (
      <Tile
        imageSrc={{ uri: post.cover_image.source }}
        title={post.title}
        caption={post.author.name}
        containerStyle={styles.container}
        contentContainerStyle={styles.content_cont}
        titleStyle={styles.caption}
      />
    );
  }
}

export default NewsBlock;
