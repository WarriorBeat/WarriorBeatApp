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
