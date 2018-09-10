/** @format */

import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';
import Amplify, { API } from 'aws-amplify';
import config from './aws-exports';
import 'es6-symbol/implement';

// Local API for local dev
Amplify.configure({
  ...config,
  ...{
    API: {
      endpoints: [
        {
          name: 'local',
          endpoint: 'http://localhost:5000'
        },
        {
          name: 'wbapi',
          endpoint: 'https://4i5br05bf1.execute-api.us-east-1.amazonaws.com/dev'
        }
      ]
    }
  }
});

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Initializing'
      }
    }
  });
});
