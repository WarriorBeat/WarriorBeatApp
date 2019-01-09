/**
 * Author/AuthorSubscribe.js
 * Author Subscribe Button Component
 * components
 */

import React from "react"
import { View } from "react-native"
import { Button } from "react-native-elements"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import { subscribeStyles as styles, subscribeButton } from "./styles"

const AuthorSubscribe = inject("userStore")(
  observer(({ userStore, author, ...props }) => {
    const { normal, subscribed } = subscribeButton
    const icon = userStore.isSubbed(author.id) ? subscribed : normal
    return (
      <View style={styles.root}>
        <Button
          buttonStyle={styles.button}
          iconContainerStyle={styles.iconContainer}
          icon={icon}
          raised
          onPress={() => userStore.toggleSubscribe(author.id)}
          {...props}
        />
      </View>
    )
  }),
)

AuthorSubscribe.propTypes = {
  author: MobxTypes.observableObject.isRequired,
}

export default AuthorSubscribe
