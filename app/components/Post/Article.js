/**
 * Article.js
 * Post Type: Article component
 * components
 */

import React from "react"
import { Text } from "react-native-elements"
import GenericPost, { HTML } from "./GenericPost"

class Article extends React.Component {
  render() {
    const { post } = this.props
    return (
      <GenericPost>
        <Text>{post.title}</Text>
        <HTML html={post.content} />
      </GenericPost>
    )
  }
}

export default Article
