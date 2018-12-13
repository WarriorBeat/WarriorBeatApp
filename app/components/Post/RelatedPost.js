/**
 * RelatedPost.js
 * Swiper Component that displays related posts
 * components
 */

import React from "react"
import { View } from "react-native"
import { Tile } from "react-native-elements"
import Carousel from "react-native-snap-carousel"
import Text from "components/Text"
import {
  related as styles,
  window,
  related_size as styles_size
} from "./styles"
import { observable } from "mobx"
import { Navigation } from "react-native-navigation"
import { observer, inject } from "mobx-react/native"

const RelatedPostItem = props => {
  const { post, handlePress } = props
  return (
    <Tile
      key={post.id}
      onPress={() => handlePress(post.id)}
      containerStyle={styles.container}
      imageContainerStyle={styles.image_container}
      featured
      imageSrc={{ uri: post.cover_image.url }}
      title={
        <Text Shadow="primaryDark" Type="title" Weight="semibold">
          {post.title}
        </Text>
      }
      height={styles_size.height}
      width={"100%"}
    />
  )
}

@inject("postStore")
@observer
class RelatedPost extends React.Component {
  @observable
  related = []

  handlePress = postId => {
    Navigation.push("HomeScreen", {
      component: {
        name: "Post.Article",
        passProps: {
          postId: postId
        }
      }
    })
  }

  _renderItem = ({ item }) => {
    return (
      <RelatedPostItem post={item} handlePress={p => this.handlePress(p)} />
    )
  }

  render() {
    this.related = this.props.postStore.posts
    return (
      <View style={styles.root}>
        <Text
          style={styles.title}
          Type="title"
          Color="primaryDark"
          Weight="semibold"
        >
          Related
        </Text>
        <Carousel
          data={this.related}
          renderItem={this._renderItem}
          sliderWidth={window.width}
          itemHeight={styles_size.item_height}
          itemWidth={window.width / 1.3}
          loop
          autoplay
        />
      </View>
    )
  }
}

export default RelatedPost
