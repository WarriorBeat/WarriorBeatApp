/** @format */

import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import 'es6-symbol/implement';
Amplify.configure(config);

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
