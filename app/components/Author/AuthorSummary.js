/**
 * AuthorSummary.js
 * Author Summary Component
 * components
 */

import React from "react"
import { View } from "react-native"
import Text from "components/Text"
import { observer } from "mobx-react/native"
import { PropTypes as gqlTypes } from "graphql"
import { summaryStyles as styles } from "./styles"
import AuthorAvatar from "./AuthorAvatar"

const AuthorSummary = ({ author }) => {
  const { bio } = author
  return (
    <View style={styles.summary_container}>
      <AuthorAvatar author={author} />
      <View style={styles.header}>
        <Text style={styles.title} Type="titlexsm" Weight="regular" Color="primaryDark">
          About the Author
        </Text>
        <Text Type="caption" Weight="light" Color="primary">
          {bio}
        </Text>
      </View>
    </View>
  )
}

AuthorSummary.propTypes = {
  author: gqlTypes.author.isRequired,
}

export default observer(AuthorSummary)
