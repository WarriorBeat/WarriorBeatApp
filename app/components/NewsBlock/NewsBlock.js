/**
 * NewsBlock.js
 * News Block Component
 * Main File
 */

import React from "react"
import { View } from "react-native"
import { Tile } from "react-native-elements"
import { styles } from "./styles"
import { Navigation } from "react-native-navigation"
import Text from "components/Text"

class NewsBlock extends React.Component {
  handlePress = post => {
    Navigation.push("HomeScreen", {
      component: {
        name: "Post.Article",
        passProps: {
          post: post
        }
      }
    })
  }

  render() {
    let post = this.props.post
    return (
      <View style={styles.block}>
        <Tile
          style={styles.tile}
          imageSrc={{ uri: post.cover_image.source }}
          caption={post.author.name}
          containerStyle={styles.container}
          contentContainerStyle={styles.content_container}
          imageContainerStyle={styles.image_container}
          titleStyle={styles.caption}
          onPress={() => this.handlePress(post)}
        >
          <View style={styles.content}>
            <Text
              style={styles.title}
              Type="title"
              Color="black"
              Weight="light"
            >
              {post.title}
            </Text>
          </View>
        </Tile>
      </View>
    )
  }
}

export default NewsBlock
