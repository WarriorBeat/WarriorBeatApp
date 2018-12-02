/**
 * home.js
 * Home Screen
 * Screen
 */
import React from "react"
import { View } from "react-native"
import { Header } from "react-native-elements"
import { styles } from "./styles"
import { icons } from "config/styles"
import { Button } from "react-native-elements"
import { toggleMenu } from "actions/navigation"
import GenericFeed from "components/GenericFeed"
import Text from "components/Text"
class Home extends React.Component {
  componentDidMount() {
    const { store } = this.props
    store.fetchPosts()
  }

  _renderLeftComponent = () => {
    return (
      <Button
        large
        backgroundColor={"transparent"}
        buttonStyle={styles.menu_button}
        icon={{ ...icons.menu, size: 30 }}
        containerViewStyle={styles.menu_container}
        style={styles.menu_container}
        onPress={() => toggleMenu({ status: true })}
      />
    )
  }

  _renderCenterComponent = () => {
    return (
      <Text Type="largeTitle" Weight="bold">
        Home
      </Text>
    )
  }

  render() {
    const { store } = this.props
    return (
      <View style={styles.container}>
        <Header
          leftComponent={this._renderLeftComponent()}
          centerComponent={this._renderCenterComponent()}
          outerContainerStyles={styles.header}
          statusBarProps={{
            barStyle: "light-content",
            backgroundColor: "#00000039",
            drawBehind: true
          }}
        />

        <GenericFeed store={store} />
      </View>
    )
  }
}

export default Home
