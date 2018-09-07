// navigation.js

import { Navigation } from 'react-native-navigation';

export const goHome = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'App',
        children: [
          {
            component: {
              name: 'Home'
            }
          }
        ]
      }
    }
  });

export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'Auth',
        children: [
          {
            component: {
              name: 'Signin',
              options: {
                bottomTab: {
                  text: 'Sign In',
                  fontSize: 12,
                  icon: require('./assets/signin.png')
                }
              }
            }
          },
          {
            component: {
              name: 'Signup',
              options: {
                bottomTab: {
                  text: 'Sign Up',
                  fontSize: 12,
                  icon: require('./assets/signup.png')
                }
              }
            }
          }
        ]
      }
    }
  });
