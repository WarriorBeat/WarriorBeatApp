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
import { Navigation } from 'react-native-navigation';

// TODO: Request Categories from API, map for buttons
export const SubMenu = () => {
  return (
    <SideMenu>
      <MenuButton title={'Submenu!'} />
    </SideMenu>
  );
};

class NavMenu extends React.Component {
  enterSubMenu() {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'NavMenu.SubMenu'
      }
    });
  }

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
        <MenuButton
          onPress={() => this.enterSubMenu()}
          title={'Categories'}
          icon={icons.categories}
        />
      </SideMenu>
    );
  }
}

export default NavMenu;
