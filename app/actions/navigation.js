// navigation.js

import { Navigation } from 'react-native-navigation';
import PostStore from '../stores/postStore';
import CategoryStore from '../stores/categoryStore';

export const goHome = () =>
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          stack: {
            children: [
              {
                component: {
                  name: 'NavMenu',
                  passProps: {
                    store: CategoryStore
                  }
                }
              }
            ]
          }
        },
        center: {
          component: {
            name: 'Home',
            passProps: {
              store: PostStore
            }
          }
        }
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
                  icon: require('../assets/signin.png')
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
                  icon: require('../assets/signup.png')
                }
              }
            }
          }
        ]
      }
    }
  });
