/**
 * NavMenu.js
 * NavMenu Component
 *
 * Primary Navigation Menu
 * Main File
 */
import React from 'react';
import { View } from 'react-native';
import { icons } from './styles';
import { SideMenu, MenuButton } from './index';

class NavMenu extends React.Component {
  render() {
    return (
      <SideMenu
        headerImage={require('assets/brand/main.jpg')}
        footer={
          <View>
            <MenuButton isFooter title={'About Us'} />
            <MenuButton isFooter title={'Meet the Staff'} />
            <MenuButton isFooter title={'Social'} />
          </View>
        }
      >
        <MenuButton title={'My Feed'} icon={icons.home} />
        <MenuButton title={'News'} icon={icons.news} />
        <MenuButton title={'Sports'} icon={icons.sports} />
      </SideMenu>
    );
  }
}

export default NavMenu;
