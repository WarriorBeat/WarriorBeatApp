/**
 * Input.js
 * Text Input Component
 * components
 */

import React from "react"
import { Input as REInput } from "react-native-elements"
import Text from "components/Text"
import { PropTypes } from "prop-types"
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

Input.propTypes = {
  label: PropTypes.string,
  hideText: PropTypes.bool,
  name: PropTypes.string,
  handleChange: PropTypes.func,
}

Input.defaultProps = {
  label: "",
  hideText: false,
  name: "",
  handleChange: () => null,
}

export default Input
