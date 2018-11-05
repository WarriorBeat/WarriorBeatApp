/**
 * home.js
 * Home Screen
 * Screen
 */
import React from "react"
import { View, ScrollView } from "react-native"
import { List, Header } from "react-native-elements"
import { observer } from "mobx-react"
import NewsBlock from "components/NewsBlock/index"
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
