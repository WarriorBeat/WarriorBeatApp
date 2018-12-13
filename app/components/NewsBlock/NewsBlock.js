/**
 * NewsBlock.js
 * News Block Component
 * Main File
 */

import React from "react"
import { View } from "react-native"
import { Tile, Avatar } from "react-native-elements"
import { styles } from "./styles"
import { Navigation } from "react-native-navigation"
import Text from "components/Text"
import { observer, inject } from "mobx-react/native"

@inject("postStore")
@observer
class NewsBlock extends React.Component {
  handlePress = postIndex => {
    Navigation.push("HomeScreen", {
      component: {
        name: "Post.Article",
        id: "ArticleView"
      }
    })
  }

  render() {
    const { postStore, postId } = this.props
    let post = postStore.resolvePost(postId)
    return (
      <View style={styles.block}>
        <View style={styles.author_container}>
          <Avatar
            medium
            rounded
            source={{ uri: post.author.profile_image.url }}
            overlayContainerStyle={styles.author_img}
            containerStyle={styles.author_img_contianer}
          />
        </View>
        <Tile
          style={styles.tile}
          imageSrc={{ uri: post.cover_image.url }}
          containerStyle={styles.container}
          contentContainerStyle={styles.content_container}
          imageContainerStyle={styles.image_container}
          titleStyle={styles.caption}
          onPress={() => this.handlePress(post.id)}
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
