/**
 * Input.js
 * Text Input Component
 * components
 */

import React from "react"
import { Input as REInput } from "react-native-elements"
import Text from "components/Text"
import styles from "./styles"

const Input = (props) => {
  const {
    label, hideText, name, handleChange,
  } = props
  const textLabel = (
    <Text Color="black_light" Type="header">
      {label}
    </Text>
  )
  return (
    <REInput
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainer}
      inputStyle={styles.input}
      underlineColorAndroid="transparent"
      {...props}
      label={textLabel}
      clearButtonMode="always"
      secureTextEntry={!!hideText}
      onChangeText={val => handleChange(name, val)}
    />
  )
}

export default Input
