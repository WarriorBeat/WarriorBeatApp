/**
 * AuthorHeader.js
 * Author Header Component
 * components
 */

import React from "react"
import { View } from "react-native"
import { Avatar, Text } from "react-native-elements"
import { styles } from "./styles"

const AuthorHeader = props => {
  const { name, title, profile_image } = props.author
  return (
    <View style={styles.author_header}>
      <Avatar
        xlarge
        rounded
        source={{ uri: profile_image.source }}
        containerStyle={styles.author_avatar}
      />
      <Text style={styles.author_name}>{name}</Text>
      <Text style={styles.author_title}>{title}</Text>
    </View>
  )
}

export default AuthorHeader
