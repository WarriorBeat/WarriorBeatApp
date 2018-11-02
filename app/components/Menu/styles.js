/**
 * SideMenu.js
 * SideMenu Component
 * Styles
 */

import { StyleSheet } from 'react-native';
import { human } from 'react-native-typography';
import { systemWeights, materialColors } from 'react-native-typography';

export const side_menu = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'stretch',
    flex: 1,
    backgroundColor: 'transparent'
  },
  container_content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 10
  },
  footer_container: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
    left: 0,
    bottom: 0,
    paddingHorizontal: 5,
    paddingVertical: 15
  },
  image: {
    height: 170,
    width: 170,
    flex: 1,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 75,
    marginVertical: 40,
    marginHorizontal: 10,
    position: 'absolute'
  },
  button: {
    padding: 0,
    margin: 0,
    marginVertical: 5,
    height: 40
  },
  buttonText: {
    ...human.title2WhiteObject,
    ...systemWeights.bold,
    color: materialColors.whitePrimary
  },
  buttonFooterText: {
    ...human.title2whiteObject,
    ...systemWeights.bold,
    color: materialColors.whiteSecondary
  },
  buttonFooter: {
    padding: 0,
    margin: 0,
    height: 20,
    marginVertical: 5,
    alignSelf: 'flex-start'
  }
});

export const icons = {
  home: {
    name: 'home',
    type: 'entypo'
  },
  news: {
    name: 'newspaper-o',
    type: 'font-awesome'
  },
  sports: {
    name: 'football',
    type: 'material-community'
  },
  categories: {
    name: 'star',
    type: 'font-awesome'
  },
  entertainment: {
    name: 'popcorn',
    type: 'material-community'
  },
  opinion: {
    name: 'thought-bubble',
    type: 'material-community'
  }
};
