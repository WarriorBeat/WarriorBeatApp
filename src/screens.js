// Screens

import { Navigation } from 'react-native-navigation';

export function registerScreens() {
  Navigation.registerComponent('Home', () => require('./home').default);
  Navigation.registerComponent(
    'Initializing',
    sc => require('./initializing').default
  );
  Navigation.registerComponent('Signin', () => require('./signin').default);
  Navigation.registerComponent('Signup', () => require('./signup').default);
  Navigation.registerComponent('FeedItem', () => require('./item').default);
}
