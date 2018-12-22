/**
 * RelatedPost.js
 * Swiper Component that displays related posts
 * components
 */

import React from "react"
import { View } from "react-native"
import { PropTypes } from "prop-types"
import { Tile } from "react-native-elements"
import Carousel from "react-native-snap-carousel"
import Text from "components/Text"
import { observable } from "mobx"
import { Navigation } from "react-native-navigation"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import Image from "react-native-fast-image"
import { related as styles, window, relatedSize as stylesSize } from "./styles"

const RelatedPostItem = (props) => {
  const { post, handlePress } = props
  return (
    <Tile
      ImageComponent={Image}
      key={post.id}
      onPress={() => handlePress(post.id)}
      containerStyle={styles.container}
      imageContainerStyle={styles.image_container}
      featured
      imageSrc={{ uri: post.coverImage.url }}
      title={(
        <Text Shadow="primaryDark" Type="title" Weight="semibold">
          {post.title}
        </Text>
      )}
      height={stylesSize.height}
      width="100%"
    />
  )
}

@inject("postStore")
@observer
class RelatedPost extends React.Component {
  @observable
  related = []

  handlePress = (postId) => {
    Navigation.push("HomeScreen", {
      component: {
        name: "Post.Article",
        passProps: {
          postId,
        },
      },
    })
  }

  _renderItem = ({ item }) => <RelatedPostItem post={item} handlePress={p => this.handlePress(p)} />

  render() {
    const { postStore } = this.props
    const { posts } = postStore
    this.related = posts
    return (
      <View style={styles.root}>
        <Text style={styles.title} Type="title" Color="primaryDark" Weight="semibold">
          Related
        </Text>
        <Carousel
          data={this.related}
          renderItem={this._renderItem}
          sliderWidth={window.width}
          itemHeight={stylesSize.item_height}
          itemWidth={window.width / 1.3}
          loop
          autoplay
        />
      </View>
    )
  }
}

RelatedPost.wrappedComponent.propTypes = {
  postStore: MobxTypes.observableObject.isRequired,
}

RelatedPostItem.propTypes = {
  post: MobxTypes.observableObject.isRequired,
  handlePress: PropTypes.func.isRequired,
}

export default RelatedPost
