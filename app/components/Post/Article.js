/**
 * Article.js
 * Post Type: Article component
 * components
 */

import React from "react"
import { View } from "react-native"
import Text from "components/Text"
import GenericPost, { HTML } from "./GenericPost"
import RelatedPost from "./RelatedPost"
import { AuthorHeader, AuthorSummary } from "components/Author"
import { article_styles } from "./styles"

class Article extends React.Component {
  render() {
    const { post } = this.props
    const BULL = " • "
    return (
      <GenericPost
        backgroundSource={post.cover_image.source}
        Foreground={<AuthorHeader author={post.author} />}
      >
        <View style={article_styles.credits.container}>
          <Text
            style={article_styles.credits.text}
            Type="captionsm"
            Color="black_light"
            Weight="thin"
            Italic
            NoPadding
          >
            {post.cover_image.credits}
          </Text>
        </View>
        <View style={article_styles.container}>
          <Text
            style={article_styles.title}
            Type="largeTitle"
            Weight="regular"
            Color="black"
          >
            {post.title}
          </Text>
          <View style={article_styles.post_header.container}>
            <Text>
              {post.author.name + " / " + post.author.title + BULL + post.date}
            </Text>
          </View>
          <HTML html={post.content} />
          <AuthorSummary author={post.author} />
        </View>
        <RelatedPost post={post} />
      </GenericPost>
    )
  }
}

export default Article
