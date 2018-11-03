/**
 * NewsBlock.js
 * News Block Component
 * Main File
 */

import React from "react"
import { Tile } from "react-native-elements"
import { styles } from "./styles"

class NewsBlock extends React.Component {
  render() {
    let post = this.props.post
    return (
      <Tile
        imageSrc={{ uri: post.cover_image.source }}
        title={post.title}
        caption={post.author.name}
        containerStyle={styles.container}
        contentContainerStyle={styles.content_cont}
        titleStyle={styles.caption}
      />
    )
  }
}

export default NewsBlock
