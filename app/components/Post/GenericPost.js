/**
 * GenericPost.js
 * Generic Layout for different Posts
 * components
 */

import React from "react"
import { View, TouchableWithoutFeedback, Image } from "react-native"
import {
  styles,
  header_styles,
  window,
  HEADER_HEIGHT,
  STICKY_HEADER_HEIGHT
} from "./styles"
import ParallaxScrollView from "react-native-parallax-scroll-view"
import RenderHTML from "react-native-render-html"
import Lightbox from "react-native-lightbox"
import { Button } from "react-native-elements"
import { Navigation } from "react-native-navigation"

export const HTML = props => {
  return <RenderHTML baseFontStyle={styles.html_font} {...props} />
}

class GenericPost extends React.Component {
  openLightBox = () => {
    this._box.open()
  }

  popScreen = () => {
    Navigation.pop("ArticleView")
  }

  render() {
    const { backgroundSource } = this.props
    return (
      <ParallaxScrollView
        backgroundColor={header_styles.backgroundColor}
        contentBackgroundColor={header_styles.contentBackgroundColor}
        parallaxHeaderHeight={HEADER_HEIGHT}
        renderForeground={() => (
          <TouchableWithoutFeedback onPress={() => this.openLightBox()}>
            <View style={styles.touchable_overlay} />
          </TouchableWithoutFeedback>
        )}
        renderFixedHeader={() => (
          <View style={styles.fixed_container}>
            <Button
              large
              backgroundColor={"transparent"}
              icon={{ name: "ios-arrow-back", type: "ionicon" }}
              buttonStyle={styles.header_button}
              onPress={() => this.popScreen()}
            />
          </View>
        )}
        renderStickyHeader={() => <View style={styles.sticky_container} />}
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        renderBackground={() => (
          <Lightbox ref={box => (this._box = box)} navigator={null}>
            <Image
              source={{
                uri: backgroundSource,
                width: window.width,
                height: HEADER_HEIGHT
              }}
            />
          </Lightbox>
        )}
        contentContainerStyle={styles.scroll_container}
        style={styles.header}
      >
        {this.props.children}
      </ParallaxScrollView>
    )
  }
}

export default GenericPost
