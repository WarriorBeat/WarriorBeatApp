/**
 * Author/AuthorProfile.js
 * Author Profile Screen
 * screens
 */

import React from "react"
import { View } from "react-native"
import Text from "components/Text"
import AuthorInfo from "components/Author/AuthorInfo"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import { observable } from "mobx"
import { icons, colors } from "config/styles"
import styles from "./styles"

class AuthorProfile extends React.Component {
  componentDidMount() {}

  render() {
    const { author } = this.props
    return (
      <View style={styles.root}>
        <View style={styles.header}>
          <AuthorInfo author={author} />
        </View>
      </View>
    )
  }
}

AuthorProfile.propTypes = {
  author: MobxTypes.observableObject.isRequired,
}

export default observer(AuthorProfile)
