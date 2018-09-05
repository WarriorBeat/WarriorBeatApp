// Screens

import { Navigation } from 'react-native-navigation';

export function registerScreens() {
  Navigation.registerComponent('Home', () => require('./home').default);
  Navigation.registerComponent(
    'Initializing',
    sc => require('./initializing').default
  );
  Navigation.registerComponent('Screen2', () => require('./screen2').default);
}
