/**
 * Article.js
 * Post Type: Article component
 * components
 */

import React from "react"
import Text from "components/Text"
import GenericPost, { HTML, AuthorHeader } from "./GenericPost"

class Article extends React.Component {
  render() {
    const { post } = this.props
    return (
      <GenericPost
        backgroundSource={post.cover_image.source}
        Foreground={<AuthorHeader author={post.author} />}
      >
        <Text Type="largeTitle" Weight="bold" Color="black">
          {post.title}
        </Text>
        <HTML html={post.content} />
      </GenericPost>
    )
  }
}

export default Article
