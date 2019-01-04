/**
 * Author/AuthorInfo.js
 * Author Bio Info Component
 * components
 */

import React from "react"
import { View } from "react-native"
import { observer, PropTypes as MobxTypes } from "mobx-react/native"
import Text from "components/Text"
import { infoStyles as styles } from "./styles"
import AuthorAvatar from "./AuthorAvatar"

const AuthorInfo = ({ author }) => (
  <View style={styles.root}>
    <View style={styles.container}>
      <AuthorAvatar openProfile={false} author={author} />
      <View style={styles.titleContainer}>
        <Text Type="title" Color="primaryDark" Weight="black">
          {author.name}
        </Text>
        <Text style={styles.subtitle} Type="headline" Color="primary" Weight="thin">
          {author.title}
        </Text>
      </View>
    </View>
  </View>
)

AuthorInfo.propTypes = {
  author: MobxTypes.observableObject.isRequired,
}

export default observer(AuthorInfo)
