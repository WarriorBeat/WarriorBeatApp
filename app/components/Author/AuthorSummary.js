/**
 * AuthorSummary.js
 * Author Summary Component
 * components
 */

import React from "react"
import { View } from "react-native"
import Text from "components/Text"
import { PropTypes as MobxTypes } from "mobx-react/native"
import styles from "./styles"
import AuthorAvatar from "./AuthorAvatar"

const AuthorSummary = ({ author }) => {
  const { description } = author
  return (
    <View style={styles.summary_container}>
      <AuthorAvatar author={author} />
      <View style={styles.header}>
        <Text style={styles.title} Type="titlexsm" Weight="regular" Color="primaryDark">
          About the Author
        </Text>
        <Text Type="caption" Weight="light" Color="primary">
          {description}
        </Text>
      </View>
    </View>
  )
}

AuthorSummary.propTypes = {
  author: MobxTypes.observableObject.isRequired,
}

export default AuthorSummary
