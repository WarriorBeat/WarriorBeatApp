/**
 * GenericPost.js
 * Generic Layout for different Posts
 * components
 */

import React from "react"
import { View, TouchableWithoutFeedback, Image } from "react-native"
import { styles, header_styles, window, HEADER_HEIGHT } from "./styles"
import ParallaxScrollView from "react-native-parallax-scroll-view"
import RenderHTML from "react-native-render-html"
import Lightbox from "react-native-lightbox"

export const HTML = props => {
  return <RenderHTML baseFontStyle={styles.html_font} {...props} />
}

class GenericPost extends React.Component {
  openLightBox = () => {
    this._box.open()
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
