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
import PostStore from "stores/postStore"
import { observer } from "mobx-react"
import { observable } from "mobx"
import { Navigation } from "react-native-navigation"

const RelatedPostItem = props => {
  const { post, handlePress } = props
  return (
    <Tile
      key={post.postId}
      onPress={() => handlePress(post)}
      containerStyle={styles.container}
      imageContainerStyle={styles.image_container}
      featured
      imageSrc={{ uri: post.cover_image.source }}
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

@observer
class RelatedPost extends React.Component {
  @observable
  related = []

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

  componentDidMount = async () => {
    const { post } = this.props
    let related = await PostStore.getRelated(post)
    this.related = related
    return related
  }

  _renderItem = ({ item }) => {
    return (
      <RelatedPostItem post={item} handlePress={p => this.handlePress(p)} />
    )
  }

  render() {
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
