/**
 * NewsBlock.js
 * News Block Component
 * Main File
 */

import React from "react"
import { View } from "react-native"
import { Tile, Avatar } from "react-native-elements"
import { Navigation } from "react-native-navigation"
import Text from "components/Text"
import { PropTypes } from "prop-types"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import styles from "./styles"

@inject("postStore")
@observer
class NewsBlock extends React.Component {
  handlePress = (postId) => {
    Navigation.push("HomeScreen", {
      component: {
        name: "Post.Article",
        id: `ArticleView${postId}`,
        passProps: {
          postId,
        },
      },
    })
  }

  render() {
    const { postStore, postId } = this.props
    const post = postStore.resolvePost(postId)
    return (
      <View style={styles.block}>
        <View style={styles.author_container}>
          <Avatar
            medium
            rounded
            source={{ uri: post.author.profileImage.url }}
            overlayContainerStyle={styles.author_img}
            containerStyle={styles.author_img_contianer}
          />
        </View>
        <Tile
          style={styles.tile}
          imageSrc={{ uri: post.coverImage.url }}
          containerStyle={styles.container}
          contentContainerStyle={styles.content_container}
          imageContainerStyle={styles.image_container}
          titleStyle={styles.caption}
          onPress={() => this.handlePress(post.id)}
        >
          <View style={styles.content}>
            <Text style={styles.title} Type="title" Color="black" Weight="regular">
              {post.title}
            </Text>
          </View>
        </Tile>
      </View>
    )
  }
}

NewsBlock.wrappedComponent.propTypes = {
  postStore: MobxTypes.observableObject.isRequired,
}

NewsBlock.propTypes = {
  postId: PropTypes.string.isRequired,
}

export default NewsBlock
