/**
 * Author/AuthorProfile.js
 * Author Profile Screen
 * screens
 */

import React from "react"
import {
  View, ScrollView, Animated, Easing, findNodeHandle,
} from "react-native"
import Text from "components/Text"
import AuthorInfo from "components/Author/AuthorInfo"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import { observable } from "mobx"
import { icons, colors, rgba } from "config/styles"
import { AuthorSubscribe, AuthorStats, AuthorPosts } from "components/Author"
import { Header } from "components/Header"
import styles from "./styles"

class AuthorProfile extends React.Component {
  @observable
  headerActive = false

  componentWillMount() {
    this.animateHeader = new Animated.Value(0)
  }

  componentDidMount() {
    setTimeout(
      () => this._contentView.measureLayout(findNodeHandle(this._scrollView), (x, y) => {
        this.contentOffset = y
      }),
      0,
    )
  }

  handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y
    const isOver = currentOffset >= this.contentOffset
    if (this.headerActive !== isOver) {
      this.headerActive = isOver
      Animated.timing(this.animateHeader, {
        toValue: this.headerActive ? 150 : 0,
        duration: 500,
        easing: Easing.cubic,
      }).start()
    }
  }

  render() {
    const { author } = this.props
    const headerBackground = this.animateHeader.interpolate({
      inputRange: [0, 150],
      outputRange: ["rgba(0,0,0,0.0)", rgba(colors.primary, 1)],
    })
    const AnimatedHeader = Animated.createAnimatedComponent(Header)
    return (
      <Animated.View style={styles.root}>
        <AnimatedHeader active={this.headerActive} backgroundColor={headerBackground} />
        <ScrollView
          ref={scrollView => (this._scrollView = scrollView)}
          onScroll={e => this.handleScroll(e)}
          scrollEventThrottle={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.rootContent}
        >
          <AuthorInfo author={author} />
          <View
            onLayout={() => {}}
            renderToHardwareTextureAndroid
            collapsable={false}
            ref={view => (this._contentView = view)}
            style={styles.subContainer}
          >
            <AuthorSubscribe containerStyle={styles.subButtonContainer} author={author} />
          </View>
          <View style={styles.bioContainer}>
            <Text Type="footnote" Color="primaryDark">
              {author.description}
            </Text>
          </View>
          <AuthorStats author={author} />
          <View style={styles.postsContainer}>
            <Text Type="titlesm" Weight="bold" Color="primaryDark">
              Posts
            </Text>
            <AuthorPosts containerStyle={styles.authorPosts} author={author} />
          </View>
        </ScrollView>
      </Animated.View>
    )
  }
}

AuthorProfile.propTypes = {
  author: MobxTypes.observableObject.isRequired,
}

export default observer(AuthorProfile)
