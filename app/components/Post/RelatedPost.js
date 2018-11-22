/**
 * RelatedPost.js
 * Swiper Component that displays related posts
 * components
 */

import React from "react"
import { View } from "react-native"
import { Tile } from "react-native-elements"
import Swiper from "react-native-swiper"
import Text from "components/Text"
import { related as styles } from "./styles"

const RelatedPostItem = props => {
  const { post } = props
  return (
    <Tile
      containerStyle={styles.container}
      imageContainerStyle={styles.image_container}
      featured
      imageSrc={{ uri: post.cover_image.source }}
      title={
        <Text Shadow="primaryDark" Type="title" Weight="semibold">
          {post.title}
        </Text>
      }
      height={250}
      width={"100%"}
    />
  )
}

class RelatedPost extends React.Component {
  render() {
    const { post } = this.props
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
        <Swiper containerStyle={styles.swiper_container} style={styles.wrapper}>
          <View style={styles.item_container}>
            <RelatedPostItem post={post} />
          </View>
        </Swiper>
      </View>
    )
  }
}

export default RelatedPost
