/**
 * Feed/FeedView.js
 * Feed View to display posts
 * Screen
 */

import React from "react"
import { View } from "react-native"
import { Header } from "react-native-elements"
import GenericFeed from "components/GenericFeed"
import { observer, inject } from "mobx-react/native"
import styles from "./styles"

@inject("categoryStore")
@observer
class FeedView extends React.Component {
  render() {
    const { categoryId, categoryStore } = this.props
    const category = categoryStore.resolveCategory(categoryId)
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: category.name, style: styles.headerText }}
          outerContainerStyles={styles.header}
          statusBarProps={{
            barStyle: "light-content",
            backgroundColor: "#00000039",
            drawBehind: true,
          }}
        />
        <GenericFeed categoryId={category.id} />
      </View>
    )
  }
}

export default FeedView
