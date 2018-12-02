/**
 * GenericFeed.js
 * Component to host a generic feed of posts
 * Main File
 */

import React from "react"
import { ScrollView, View } from "react-native"
import { observer } from "mobx-react"
import NewsBlock from "components/NewsBlock"
import { styles } from "./styles"

@observer
class GenericFeed extends React.Component {
  render() {
    const { store } = this.props

    return (
      <ScrollView style={styles.scroll_view}>
        <View style={styles.list_container}>
          {store.feed.map(p => {
            return <NewsBlock key={p.postId} post={p} />
          })}
        </View>
      </ScrollView>
    )
  }
}

export default GenericFeed
