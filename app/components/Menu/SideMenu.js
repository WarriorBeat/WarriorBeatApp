/**
 * SideMenu.js
 * SideMenu Component
 * Main File
 */

import React from 'react';
import { View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';
import { side_menu } from './styles';

export const MenuButton = props => {
  let btnTextStyle =
    props.textStyle || props.isFooter
      ? side_menu.buttonFooterText
      : side_menu.buttonText;

  let btnStyle =
    props.buttonStyle || props.isFooter
      ? side_menu.buttonFooter
      : side_menu.button;

  return (
    <Button
      large
      backgroundColor={'transparent'}
      textStyle={btnTextStyle}
      buttonStyle={btnStyle}
      title={props.title}
      icon={props.icon}
      onPress={props.onPress}
    />
  );
};

class SideMenu extends React.Component {
  render() {
    return (
      <LinearGradient
        style={side_menu.container}
        colors={['#2d2d2d', '#393939']}
        locations={[0.2, 0.3]}
        start={{ x: 0.5, y: 1.0 }}
        end={{ x: 1, y: 0.25 }}
      >
        <View style={side_menu.container}>
          {this.props.headerImage ? (
            <Image
              source={this.props.headerImage}
              style={side_menu.image}
              resizeMode="cover"
            />
          ) : (
            undefined
          )}
          <View style={side_menu.container_content}>{this.props.children}</View>
          <View style={side_menu.footer_container}>{this.props.footer}</View>
        </View>
      </LinearGradient>
    );
  }
}

export default SideMenu;
