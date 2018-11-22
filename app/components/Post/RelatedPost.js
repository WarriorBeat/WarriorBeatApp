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
import PostStore from "stores/postStore"
import { observer } from "mobx-react"
import { observable } from "mobx"

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

@observer
class RelatedPost extends React.Component {
  @observable
  related = []

  componentDidMount = async () => {
    const { post } = this.props
    let related = await PostStore.getRelated(post)
    this.related = related
    return related
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
        <Swiper
          loop
          showsPagination={false}
          showsButtons={false}
          containerStyle={styles.swiper_container}
          style={styles.wrapper}
        >
          {this.related.map(p => {
            return (
              <View key={this.related.indexOf(p)} style={styles.item_container}>
                <RelatedPostItem post={p} />
              </View>
            )
          })}
        </Swiper>
      </View>
    )
  }
}

export default RelatedPost
