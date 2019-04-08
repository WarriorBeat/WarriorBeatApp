/**
 * Article.js
 * Post Type: Article component
 * components
 */

import React from "react"
import { View } from "react-native"
import Text from "components/Text"
import { AuthorSummary } from "components/Author"
import { Divider } from "react-native-elements"
import { observer } from "mobx-react/native"
import { PropTypes } from "prop-types"
import { compose } from "react-apollo"
import { queries, PropTypes as gqlTypes } from "graphql"
import GenericPost, { HTML } from "./GenericPost"
import RelatedPost from "./RelatedPost"
import { articleStyles } from "./styles"

@observer
class Article extends React.Component {
  render() {
    const { post, loading, componentId } = this.props
    const BULL = " • "
    return (
      <GenericPost
        childComponentId={componentId}
        backgroundSource={loading ? null : post.coverImage.url}
      >
        {loading ? null : (
          <View>
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
                  {`${post.author.name} / ${post.author.title}${BULL}${post.createdOn}`}
                </Text>
              </View>
              <HTML html={post.content} />
              <Divider style={articleStyles.divider} />
              <AuthorSummary author={post.author} />
            </View>
          </View>
        )}
        <RelatedPost />
      </GenericPost>
    )
  }
}

Article.propTypes = {
  post: gqlTypes.article.isRequired,
  componentId: PropTypes.string.isRequired,
  loading: PropTypes.bool,
}

Article.defaultProps = {
  loading: false,
}

export default compose(queries.article.articleGet)(Article)
