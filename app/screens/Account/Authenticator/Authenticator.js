/**
 * Authenticator.js
 * User Authenticator Screen
 * screens
 */

import React from "react"
import { View } from "react-native"
import { Avatar } from "react-native-elements"
import Text from "components/Text"
import { PropTypes as MobxTypes } from "mobx-react/native"
import Image from "react-native-fast-image"
import TabbedHeader from "components/Header"
import styles from "./styles"

class Authenticator extends React.Component {
  render() {
    return <TabbedHeader leftButton="Login" rightButton="Sign Up" />
  }
}

export default Authenticator
