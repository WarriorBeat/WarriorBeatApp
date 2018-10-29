// Screens

import { Navigation } from 'react-native-navigation';

export function registerScreens() {
  Navigation.registerComponent(
    'Home',
    () => require('../screens/home').default
  );
  Navigation.registerComponent(
    'Initializing',
    sc => require('../screens/initializing').default
  );
  Navigation.registerComponent(
    'Signin',
    () => require('../screens/signin').default
  );
  Navigation.registerComponent(
    'Signup',
    () => require('../screens/signup').default
  );
  Navigation.registerComponent(
    'NavMenu',
    () => require('../components/Menu/index').default
  );
}
