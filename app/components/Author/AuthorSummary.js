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
import Image from "react-native-fast-image"
import styles from "./styles"

const AuthorSummary = (props) => {
  const { author } = props
  const { description, profileImage } = author
  return (
    <View style={styles.summary_container}>
      <View style={styles.avatar_shadow}>
        <Avatar rounded size="large" source={{ uri: profileImage.url }} ImageComponent={Image} />
      </View>
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
