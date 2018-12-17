/**
 * ArticleBlock.js
 * News Block Component
 * Main File
 */

import React from "react"
import { PropTypes } from "prop-types"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import NewsBlock from "./NewsBlock"

@inject("postStore")
@observer
class ArticleBlock extends React.Component {
  render() {
    const { postStore, postId } = this.props
    const post = postStore.resolvePost(postId)
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

ArticleBlock.wrappedComponent.propTypes = {
  postStore: MobxTypes.observableObject.isRequired,
}

ArticleBlock.propTypes = {
  postId: PropTypes.string.isRequired,
}

export default ArticleBlock
