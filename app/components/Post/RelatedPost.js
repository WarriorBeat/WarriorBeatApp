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
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import Image from "react-native-fast-image"
import { compose } from "react-apollo"
import { queries, PropTypes as gqlTypes } from "graphql"
import { related as styles, window, relatedSize as stylesSize } from "./styles"

const RelatedPostItem = (props) => {
  const { post, handlePress } = props
  return (
    <Tile
      ImageComponent={Image}
      key={post.id}
      onPress={() => handlePress(post)}
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

@inject("uiStore")
@observer
class RelatedPost extends React.Component {
  handlePress = (post) => {
    const { uiStore } = this.props
    uiStore.push("Post.Article", post.id, { post })
  }

  _renderItem = ({ item }) => <RelatedPostItem post={item} handlePress={p => this.handlePress(p)} />

  render() {
    const { articles, loading } = this.props
    return (
      <View style={styles.root}>
        <Text style={styles.title} Type="title" Color="primaryDark" Weight="semibold">
          Related
        </Text>
        {loading ? null : (
          <Carousel
            data={articles}
            renderItem={this._renderItem}
            sliderWidth={window.width}
            itemHeight={stylesSize.item_height}
            itemWidth={window.width / 1.3}
            loop
            autoplay
          />
        )}
      </View>
    )
  }
}

RelatedPost.wrappedComponent.propTypes = {
  uiStore: MobxTypes.observableObject.isRequired,
}

RelatedPost.propTypes = {
  articles: PropTypes.arrayOf(gqlTypes.article).isRequired,
  loading: PropTypes.bool,
}

RelatedPost.defaultProps = {
  loading: true,
}

RelatedPostItem.propTypes = {
  post: gqlTypes.article.isRequired,
  handlePress: PropTypes.func.isRequired,
}

export default compose(queries.article.articleList)(RelatedPost)
