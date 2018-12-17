/**
 * Article.js
 * Post Type: Article component
 * components
 */

import React from "react"
import { View } from "react-native"
import Text from "components/Text"
import AuthorSummary from "components/Author"
import { Divider } from "react-native-elements"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import { PropTypes } from "prop-types"
import GenericPost, { HTML } from "./GenericPost"
import RelatedPost from "./RelatedPost"
import { articleStyles } from "./styles"

@inject("postStore")
@observer
class Article extends React.Component {
  render() {
    const { postStore, postId, componentId } = this.props
    const post = postStore.resolvePost(postId)
    const BULL = " • "
    return (
      <GenericPost childComponentId={componentId} backgroundSource={post.coverImage.url}>
        <View style={articleStyles.credits.container}>
          <Text
            style={articleStyles.credits.text}
            Type="captionsm"
            Color="black_light"
            Weight="thin"
            Italic
            NoPadding
          >
            {post.coverImage.credits}
          </Text>
        </View>
        <View style={articleStyles.container}>
          <Text style={articleStyles.title} Type="largeTitle" Weight="bold" Color="black">
            {post.title}
          </Text>
          <Text Type="headline" Color="primary" Weight="light" style={articleStyles.title}>
            {post.categories[0].name}
          </Text>
          <View style={articleStyles.post_header.container}>
            <Text Color="primaryDark">
              {`${post.author.name} / ${post.author.title}${BULL}${post.date}`}
            </Text>
          </View>
          <HTML html={post.content} />
          <Divider style={articleStyles.divider} />
          <AuthorSummary author={post.author} />
        </View>
        <RelatedPost />
      </GenericPost>
    )
  }
}

Article.wrappedComponent.propTypes = {
  postStore: MobxTypes.observableObject.isRequired,
}

Article.propTypes = {
  postId: PropTypes.string.isRequired,
  componentId: PropTypes.string.isRequired,
}

export default Article
