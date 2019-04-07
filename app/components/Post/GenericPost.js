/**
 * GenericPost.js
 * Generic Layout for different Posts
 * components
 */

import React from "react"
import {
  View, TouchableWithoutFeedback, Animated, ScrollView,
} from "react-native"
import ParallaxScrollView from "react-native-parallax-scroll-view"
import RenderHTML from "react-native-render-html"
import Lightbox from "react-native-lightbox"
import { Icon } from "react-native-elements"
import { icons } from "config/styles"
import { observer, PropTypes as MobxTypes } from "mobx-react/native"
import { PropTypes } from "prop-types"
import Image from "react-native-fast-image"
import { inject } from "mobx-react"
import ReactionButton from "./ReactionButton"
import {
  styles, headerStyles, window, HEADER_HEIGHT, STICKY_HEADER_HEIGHT,
} from "./styles"

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

export const HTML = props => <RenderHTML baseFontStyle={styles.html_font} {...props} />
@inject("uiStore")
@observer
class GenericPost extends React.Component {
  openLightBox = () => {
    this._box.open()
  }

  render() {
    const { backgroundSource, children, uiStore } = this.props
    return (
      <ReactionButton ref={rxnButton => (this._rxnButton = rxnButton)}>
        <ParallaxScrollView
          renderScrollComponent={() => <AnimatedScrollView />}
          scrollEvent={e => this._rxnButton.onScroll(e)}
          scrollEventThrottle={1}
          backgroundColor={headerStyles.backgroundColor}
          contentBackgroundColor={headerStyles.contentBackgroundColor}
          parallaxHeaderHeight={HEADER_HEIGHT}
          renderForeground={() => (
            <TouchableWithoutFeedback onPress={() => this.openLightBox()}>
              <View style={styles.touchable_overlay} />
            </TouchableWithoutFeedback>
          )}
          renderFixedHeader={() => (
            <View style={styles.fixed_container}>
              <Icon
                {...icons.arrow_back}
                {...styles.header_button}
                containerStyle={styles.header_button}
                onPress={() => uiStore.goBack()}
              />
            </View>
          )}
          renderStickyHeader={() => <View style={styles.sticky_container} />}
          stickyHeaderHeight={STICKY_HEADER_HEIGHT}
          renderBackground={() => (
            <Lightbox ref={box => (this._box = box)} navigator={null}>
              <Image
                style={{
                  width: window.width,
                  height: HEADER_HEIGHT,
                }}
                source={{
                  uri: backgroundSource,
                  priority: Image.priority.high,
                }}
              />
            </Lightbox>
          )}
          contentContainerStyle={styles.scroll_container}
          style={styles.header}
        >
          {children}
        </ParallaxScrollView>
      </ReactionButton>
    )
  }
}

GenericPost.wrappedComponent.propTypes = {
  uiStore: MobxTypes.observableObject.isRequired,
}

GenericPost.propTypes = {
  backgroundSource: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default GenericPost
