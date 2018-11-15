/**
 * GenericFeed.js
 * Component to host a generic feed of posts
 * Main File
 */

import React from "react"
import { ScrollView } from "react-native"
import { observer } from "mobx-react"
import { List } from "react-native-elements"
import NewsBlock from "components/NewsBlock/index"
import { styles } from "./styles"

@observer
class GenericFeed extends React.Component {
  render() {
    const { store } = this.props

    return (
      <ScrollView style={styles.scroll_view}>
        <List containerStyle={styles.list_container}>
          {store.feed.map(p => {
            return <NewsBlock key={p.postId} post={p} />
          })}
        </List>
      </ScrollView>
    )
  }
}

export default GenericFeed
