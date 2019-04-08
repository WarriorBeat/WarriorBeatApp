/**
 * Author/AuthorPosts.js
 * Author Posts List Component
 * components
 */
import React from "react"
import {
  View, ViewPropTypes, FlatList, TouchableOpacity,
} from "react-native"
import { observer, PropTypes as MobxTypes, inject } from "mobx-react/native"
import Text from "components/Text"
import Image from "react-native-fast-image"
import { PropTypes as gqlTypes } from "graphql"
import { postStyles as styles } from "./styles"

const PostItem = observer(({ post, onPress }) => (
  <TouchableOpacity onPress={() => onPress(post)}>
    <View style={styles.postContainer}>
      <View style={styles.postImageContainer}>
        <Image
          source={{
            uri: post.coverImage.url,
          }}
          style={styles.postImage}
        />
      </View>
      <View style={styles.postInfoContainer}>
        <View style={styles.postTitleContainer}>
          <Text Type="titlexsm" Weight="bold" Color="primaryDark">
            {post.title}
          </Text>
        </View>
        <View style={styles.postFooterContainer}>
          <Text Type="footnote" Color="primary" Weight="semibold">
            {post.categories[0].name}
          </Text>
          <Text Type="footnote" Color="primary" Weight="semibold">
            {post.createdOn}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
))

@inject("uiStore")
@observer
class AuthorPosts extends React.Component {
  _keyExtractor = item => item.id

  handlePress = (post) => {
    const { uiStore } = this.props
    const props = { post }
    return uiStore.push("Post.Article", post.id, props)
  }

  render() {
    const { author, containerStyle } = this.props
    return (
      <View style={styles.root}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ ...styles.listContainer, ...containerStyle }}
          contentContainerStyle={styles.listContentContainer}
          keyExtractor={this._keyExtractor}
          data={author.posts}
          renderItem={({ item }) => <PostItem onPress={this.handlePress} post={item} />}
          ItemSeparatorComponent={() => <View style={styles.seperator} />}
        />
      </View>
    )
  }
}

AuthorPosts.wrappedComponent.propTypes = {
  uiStore: MobxTypes.observableObject.isRequired,
}

AuthorPosts.propTypes = {
  author: gqlTypes.author.isRequired,
  containerStyle: ViewPropTypes.style,
}

AuthorPosts.defaultProps = {
  containerStyle: styles.root,
}

export default AuthorPosts
