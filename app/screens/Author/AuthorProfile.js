/**
 * Author/AuthorProfile.js
 * Author Profile Screen
 * screens
 */

import React from "react"
import { View, ScrollView } from "react-native"
import Text from "components/Text"
import AuthorInfo from "components/Author/AuthorInfo"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import { observable } from "mobx"
import { icons, colors } from "config/styles"
import { AuthorSubscribe, AuthorStats, AuthorPosts } from "components/Author"
import styles from "./styles"

class AuthorProfile extends React.Component {
  componentDidMount() {}

  render() {
    const { author } = this.props
    return (
      <View style={styles.root}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.rootContent}>
          <AuthorInfo author={author} />
          <View style={styles.subContainer}>
            <AuthorSubscribe containerStyle={styles.subButtonContainer} author={author} />
          </View>
          <View style={styles.bioContainer}>
            <Text Type="footnote" Color="primaryDark">
              {author.description}
            </Text>
          </View>
          <AuthorStats author={author} />
          <View style={styles.postsContainer}>
            <Text Type="titlesm" Weight="bold" Color="primaryDark">
              Posts
            </Text>
            <AuthorPosts containerStyle={styles.authorPosts} author={author} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

AuthorProfile.propTypes = {
  author: MobxTypes.observableObject.isRequired,
}

export default observer(AuthorProfile)
