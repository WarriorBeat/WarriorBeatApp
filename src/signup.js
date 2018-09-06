// signup.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, FormLabel, FormInput, Text } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import { Auth } from 'aws-amplify';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer
export default class Signup extends React.Component {
  @observable
  userInput = {
    username: '',
    password: '',
    email: '',
    phone_number: '',
    auth_code: '',
    showConfirm: false
  };

  onChangeText = (key, val) => {
    this.userInput[key] = val;
  };

  signUp = async () => {
    const { username, password, email, phone_number } = this.userInput;
    try {
      const newUser = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          phone_number
        }
      });
      console.log('USER SIGNUP SUCCESS: ', newUser);
    } catch (err) {
      console.log('USER SIGNUP FAILED', err);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Username</FormLabel>
        <FormInput
          placeholder={'Please enter a username'}
          autoCapitalize="none"
          onChangeText={val => this.onChangeText('username', val)}
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          placeholder={'Please enter a password'}
          autoCapitalize="none"
          onChangeText={val => this.onChangeText('password', val)}
        />
        <FormLabel>Email</FormLabel>
        <FormInput
          placeholder={'Please enter your email'}
          autoCapitalize="none"
          onChangeText={val => this.onChangeText('email', val)}
        />
        <FormLabel>Phone Number</FormLabel>
        <FormInput
          placeholder={'Please enter your phone number'}
          autoCapitalize="none"
          onChangeText={val => this.onChangeText('phone_number', val)}
        />
        <Button raised onPress={() => this.signUp()} title={'Sign Up'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
