/**
 * Authenticator/AuthForm.js
 * User Authenticator AuthForm
 * screens
 */

import React from "react"
import { View } from "react-native"
import { Button, Divider } from "react-native-elements"
import Text from "components/Text"
import Input from "components/Input"
import { colors } from "config/styles"
import { observer, PropTypes as MobxTypes } from "mobx-react/native"
import { PropTypes } from "prop-types"
import styles from "./styles"

const AuthForm = ({ fields, form, onChange }) => (
  <View style={styles.authContainer}>
    {Object.keys(fields).map((key) => {
      if (form.fields.includes(key)) {
        const field = fields[key]
        return (
          <Input
            key={key}
            label={field.label}
            leftIcon={{ ...field.icon, color: colors.ios.gray }}
            hideText={field.hidden}
            handleChange={onChange}
            name={key}
            errorMessage={field.error}
          />
        )
      }
      return null
    })}
    <View style={styles.submitContainer}>
      <Divider />
      <Button
        onPress={form.onSubmit}
        title={(
          <Text Color="white" Weight="bold" Type="titlexsm">
            {form.submitText}
          </Text>
        )}
        raised
        containerStyle={styles.submitButtonContainer}
        buttonStyle={
          form.submitColor
            ? { backgroundColor: form.submitColor }
            : { backgroundColor: colors.ios.green }
        }
      />
    </View>
  </View>
)

AuthForm.propTypes = {
  fields: MobxTypes.observableObject.isRequired,
  form: PropTypes.shape({
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSubmit: PropTypes.func,
    submitText: PropTypes.string.isRequired,
    submitColor: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default observer(AuthForm)
