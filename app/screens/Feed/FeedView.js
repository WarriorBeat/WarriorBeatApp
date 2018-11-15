/**
 * Feed/FeedView.js
 * Feed View to display posts
 * Screen
 */

import React from "react"
import { View } from "react-native"
import { Header } from "react-native-elements"
import { observer } from "mobx-react"
import GenericFeed from "components/GenericFeed/index"
import { styles } from "./styles"

@observer
class FeedView extends React.Component {
  componentDidMount() {
    const { store, category } = this.props
    store.getCategory(category)
  }

  render() {
    const { store, category } = this.props
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: category, style: styles.headerText }}
          outerContainerStyles={styles.header}
          statusBarProps={{ barStyle: "light-content" }}
        />
        <GenericFeed store={store} />
      </View>
    )
  }
}

export default FeedView
