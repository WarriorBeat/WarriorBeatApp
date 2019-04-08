/**
 * Author/AuthorAvatar.js
 * Author Avatar Component
 * components
 */

import React from "react"
import { View, ViewPropTypes } from "react-native"
import PropTypes from "prop-types"
import { Avatar } from "react-native-elements"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import { PropTypes as gqlTypes } from "graphql"
import Image from "react-native-fast-image"
import { avatarStyles as styles } from "./styles"

const AuthorAvatar = inject("uiStore")(
  observer(({
    uiStore, author, openProfile, size, shadowStyle,
  }) => (
    <View style={shadowStyle}>
      <Avatar
        onPress={openProfile ? () => uiStore.push("Author.Profile", author.id, { author }) : null}
        rounded
        size={size}
        source={{ uri: author.profileImage.url }}
        ImageComponent={Image}
      />
    </View>
  )),
)

AuthorAvatar.wrappedComponent.propTypes = {
  uiStore: MobxTypes.observableObject.isRequired,
}

AuthorAvatar.propTypes = {
  author: gqlTypes.author.isRequired,
  openProfile: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large", "xlarge"]),
  shadowStyle: ViewPropTypes.style,
}

AuthorAvatar.defaultProps = {
  size: "large",
  openProfile: true,
  shadowStyle: styles.avatar_shadow,
}

export default AuthorAvatar
