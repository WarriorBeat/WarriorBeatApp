/**
 * GenericFeed.js
 * Component to host a generic feed of posts
 * Main File
 */

import React from "react"
import { View } from "react-native"
import PropTypes from "prop-types"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import NewsBlock from "components/NewsBlock"
import styles from "./styles"

@inject("postStore")
@observer
class GenericFeed extends React.Component {
  render() {
    const { categoryId, postStore } = this.props
    const { posts } = postStore
    return (
      <View style={styles.list_container}>
        {posts.map((p) => {
          if (categoryId) {
            return p.categories.find(cat => cat.id === categoryId) ? (
              <NewsBlock key={p.id} postId={p.id} />
            ) : null
          }
          return <NewsBlock key={p.id} postId={p.id} />
        })}
      </View>
    )
  }
}

GenericFeed.wrappedComponent.propTypes = {
  postStore: MobxTypes.observableObject.isRequired,
}

GenericFeed.propTypes = {
  categoryId: PropTypes.string,
}

GenericFeed.defaultProps = {
  categoryId: false,
}

export default GenericFeed
