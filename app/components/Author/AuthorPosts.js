/**
 * Author/AuthorPosts.js
 * Author Posts List Component
 * components
 */
import React from "react"
import { View, ViewPropTypes, FlatList } from "react-native"
import { Divider } from "react-native-elements"
import { observer, PropTypes as MobxTypes } from "mobx-react/native"
import Text from "components/Text"
import { getNumberWithOrdinal } from "config/utils"
import Image from "react-native-fast-image"
import { postStyles as styles } from "./styles"

const PostItem = observer(({ post }) => (
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
          {post.date}
        </Text>
      </View>
    </View>
  </View>
))

class AuthorPosts extends React.Component {
  _keyExtractor = item => item.id

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
          renderItem={({ item }) => <PostItem post={item} />}
          ItemSeparatorComponent={() => <View style={styles.seperator} />}
        />
      </View>
    )
  }
}

AuthorPosts.propTypes = {
  author: MobxTypes.observableObject.isRequired,
  containerStyle: ViewPropTypes.style,
}

AuthorPosts.defaultProps = {
  containerStyle: styles.root,
}

export default observer(AuthorPosts)
