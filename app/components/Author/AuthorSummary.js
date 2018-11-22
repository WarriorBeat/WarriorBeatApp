/**
 * AuthorSummary.js
 * Author Summary Component
 * components
 */

import React from "react"
import { View } from "react-native"
import { Avatar } from "react-native-elements"
import { summary as styles } from "./styles"
import Text from "components/Text"

class AuthorSummary extends React.Component {
  render() {
    const { description, profile_image } = this.props.author
    return (
      <View style={styles.summary_container}>
        <Avatar
          containerStyle={styles.avatar}
          rounded
          large
          source={{ uri: profile_image.source }}
        />
        <View style={styles.header}>
          <Text
            style={styles.title}
            Type="titlesm"
            Weight="regular"
            Color="primaryDark"
          >
            About the Author
          </Text>
          <Text Type="caption" Weight="light" Color="primary">
            {description}
          </Text>
        </View>
      </View>
    )
  }
}

export default AuthorSummary
