/**
 * GenericFeed.js
 * Component to host a generic feed of posts
 * Main File
 */

import React from "react"
import { View } from "react-native"
import { observer, inject } from "mobx-react/native"
import NewsBlock from "components/NewsBlock"
import { styles } from "./styles"

@inject("postStore")
@observer
class GenericFeed extends React.Component {
  render() {
    const { categoryId } = this.props
    return (
      <View style={styles.list_container}>
        {this.props.postStore.posts.map(p => {
          if (categoryId) {
            return p.categories.find(cat => cat.id === categoryId) ? (
              <NewsBlock key={p.id} postId={p.id} />
            ) : null
          } else {
            return <NewsBlock key={p.id} postId={p.id} />
          }
        })}
      </View>
    )
  }
}

export default GenericFeed
