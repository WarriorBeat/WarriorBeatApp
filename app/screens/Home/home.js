/**
 * home.js
 * Home Screen
 * Screen
 */
import React from "react"
import { View } from "react-native"
import { Header } from "react-native-elements"
import { observer } from "mobx-react"
import { styles } from "./styles"
import GenericFeed from "components/GenericFeed"

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
          centerComponent={{ text: "Home", style: styles.headerText }}
          outerContainerStyles={styles.header}
          statusBarProps={{ barStyle: "light-content" }}
        />

        <GenericFeed store={store} />
      </View>
    )
  }
}

export default Home
