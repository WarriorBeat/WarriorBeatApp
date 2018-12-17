/**
 * AuthorSummary.js
 * Author Summary Component
 * components
 */

import React from "react"
import { View } from "react-native"
import { Avatar } from "react-native-elements"
import Text from "components/Text"
import { PropTypes as MobxTypes } from "mobx-react/native"
import styles from "./styles"

const AuthorSummary = (props) => {
  const { author } = props
  const { description, profileImage } = author
  return (
    <View style={styles.summary_container}>
      <Avatar containerStyle={styles.avatar} rounded large source={{ uri: profileImage.url }} />
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
