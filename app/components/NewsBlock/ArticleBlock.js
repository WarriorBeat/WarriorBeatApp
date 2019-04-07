/**
 * ArticleBlock.js
 * News Block Component
 * Main File
 */

import React from "react"
import { observer } from "mobx-react/native"
import { PropTypes as gqlTypes } from "graphql"
import NewsBlock from "./NewsBlock"

@observer
class ArticleBlock extends React.Component {
  render() {
    const { post } = this.props
    const postView = {
      id: post.id,
      type: "Article",
      props: { postId: post.id },
    }
    return (
      <NewsBlock
        title={post.title}
        viewComponent={postView}
        imageSrc={{ uri: post.coverImage.url }}
        author={post.author}
      />
    )
  }
}

ArticleBlock.propTypes = {
  post: gqlTypes.article.isRequired,
}

export default ArticleBlock
