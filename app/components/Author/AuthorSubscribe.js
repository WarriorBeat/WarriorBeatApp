/**
 * Author/AuthorSubscribe.js
 * Author Subscribe Button Component
 * components
 */

import React from "react"
import { View } from "react-native"
import { Button } from "react-native-elements"
import { observer, PropTypes as MobxTypes } from "mobx-react/native"
import { subscribeStyles as styles, subscribeButton } from "./styles"

/**
 * @todo Add Subscribe Functionality to AuthorSubscribe Component
 * @body When Author subscription functionality is ready, add onPress handler here
 */
const AuthorSubscribe = props => (
  <View style={styles.root}>
    <Button
      buttonStyle={styles.button}
      iconContainerStyle={styles.iconContainer}
      icon={subscribeButton.default}
      raised
      {...props}
    />
  </View>
)

AuthorSubscribe.propTypes = {
  author: MobxTypes.observableObject.isRequired,
}

export default observer(AuthorSubscribe)
