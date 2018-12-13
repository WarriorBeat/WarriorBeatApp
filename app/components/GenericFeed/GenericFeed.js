/**
 * GenericFeed.js
 * Component to host a generic feed of posts
 * Main File
 */

import React from "react"
import { ScrollView, View } from "react-native"
import { observer, inject } from "mobx-react/native"
import NewsBlock from "components/NewsBlock"
import { styles } from "./styles"

@inject("postStore")
@observer
class GenericFeed extends React.Component {
  render() {
    return (
      <ScrollView style={styles.scroll_view}>
        <View style={styles.list_container}>
          {this.props.postStore.posts.map(p => {
            return <NewsBlock key={p.id} postId={p.id} />
          })}
        </View>
      </ScrollView>
    )
  }
}

export default GenericFeed
