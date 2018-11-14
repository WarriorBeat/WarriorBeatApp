/**
 * home.js
 * Home Screen
 * Screen
 */
import React from "react"
import { View } from "react-native"
import { Header } from "react-native-elements"
import { observer } from "mobx-react"
import GenericFeed from "components/GenericFeed/index"
import { styles } from "./styles"

@observer
class Home extends React.Component {
  componentDidMount() {
    const { store } = this.props
    store.fetchPosts()
  }

  render() {
    const { store } = this.props

    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: "Posts", style: styles.headerText }}
          outerContainerStyles={styles.header}
          statusBarProps={{ barStyle: "light-content" }}
        />
        <GenericFeed store={store} />
      </View>
    )
  }
}

export default Home
