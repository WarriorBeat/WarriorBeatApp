/** @format */

import { Navigation } from 'react-native-navigation';
import { registerScreens } from './app/config/screens';
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
          name: 'warriorbeat-stage',
          endpoint:
            'https://m6vkw9r8ud.execute-api.us-east-1.amazonaws.com/stage'
        },
        {
          name: 'warriorbeat-dev',
          endpoint: 'https://ps05owvrph.execute-api.us-east-1.amazonaws.com/dev'
        }
      ]
    }
  }
});

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      animate: false
    }
  });
  Navigation.setRoot({
    root: {
      component: {
        name: 'Initializing'
      }
    }
  });
});
