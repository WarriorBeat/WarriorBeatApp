/**
 * GenericPost.js
 * Generic Layout for different Posts
 * components
 */

import React from "react"
import { View, Image } from "react-native"
import { styles, header_styles, window } from "./styles"
import ParallaxScrollView from "react-native-parallax-scroll-view"
import RenderHTML from "react-native-render-html"

export const HTML = props => {
  return <RenderHTML baseFontStyle={styles.html_font} {...props} />
}

class GenericPost extends React.Component {
  render() {
    const { Foreground, backgroundSource } = this.props
    return (
      <ParallaxScrollView
        backgroundColor={header_styles.backgroundColor}
        contentBackgroundColor={header_styles.contentBackgroundColor}
        parallaxHeaderHeight={300}
        renderForeground={() => Foreground}
        renderBackground={() => (
          <View>
            <Image
              source={{
                uri: backgroundSource,
                width: window.width,
                height: 300
              }}
            />
            <View style={styles.header_overlay} />
          </View>
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
