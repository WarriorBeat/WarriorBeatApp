/**
 * home.js
 * Home Screen
 * Screen
 */
import React from "react"
import { View, ScrollView } from "react-native"
import { List, Text } from "react-native-elements"
import { observer } from "mobx-react"
import NewsBlock from "components/NewsBlock/index"
import { styles } from "./styles"

@observer
class Home extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: "Home"
        }
      }
    }
  }

  componentDidMount() {
    const { store } = this.props
    store.fetchPosts()
  }

  render() {
    const { store } = this.props

    return (
      <View style={styles.container}>
        <Text h3>Posts</Text>
        <ScrollView style={styles.scroll_view}>
          <List containerStyle={styles.list_container}>
            {store.posts.map(p => {
              return <NewsBlock key={p.postId} post={p} />
            })}
          </List>
        </ScrollView>
      </View>
    )
  }
}

export default Home
