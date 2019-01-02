/**
 * Authenticator/AuthForm.js
 * User Authenticator AuthForm
 * screens
 */

import React from "react"
import { View, ScrollView } from "react-native"
import { Button, Divider } from "react-native-elements"
import Text from "components/Text"
import Input from "components/Input"
import { colors } from "config/styles"
import { observer, PropTypes as MobxTypes } from "mobx-react/native"
import { PropTypes } from "prop-types"
import styles from "./styles"

const AuthForm = ({
  fields, form, onChange, isLoading,
}) => (
  <View style={styles.authContainer}>
    <ScrollView style={styles.inputContainer} contentContainerStyle={styles.inputContentContainer}>
      {form.desc ? (
        <Text Type="body" Color="primary">
          {form.desc()}
        </Text>
      ) : null}
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
    </ScrollView>
    <View style={styles.submitContainer}>
      {form.displayHelp ? (
        <View style={styles.helpContainer}>
          <Button
            onPress={form.onHelp}
            type="clear"
            title={form.helpText}
            containerStyle={styles.helpButton}
          />
        </View>
      ) : null}
      <Divider />
      <Button
        loading={isLoading}
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
  isLoading: PropTypes.bool.isRequired,
}

export default observer(AuthForm)
