/**
 * home.js
 * Home Screen
 * Screen
 */
import React from "react"
import { View, Animated, ScrollView } from "react-native"
import { Header } from "react-native-elements"
import { styles, scrollView as scrollStyles, window } from "./styles"
import { icons } from "config/styles"
import { Button, Icon } from "react-native-elements"
import { toggleMenu } from "actions/navigation"
import GenericFeed from "components/GenericFeed"
import Text from "components/Text"
import { inject, observer } from "mobx-react/native"
import { observable } from "mobx"
import ParallaxScrollView from "react-native-parallax-scroll-view"
import Carousel from "react-native-snap-carousel"

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)
@inject("rootStore")
@observer
class Home extends React.Component {
  _renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text Weight="black" Type="largeTitle" Color="black" fontSize={45}>
            <Text Weight="black" Type="titlesm" Color="black" fontSize={25}>
              The
              {"\n"}
            </Text>
            WarriorBeat
          </Text>
        </View>
      </View>
    )
  }
  P

  _renderCategory({ item, index }) {
    return <GenericFeed categoryId={item.id} />
  }

  _renderCarousel() {
    const categoryStore = this.props.rootStore.categoryStore
    return (
      <Carousel
        ref={c => {
          this._carousel = c
        }}
        data={categoryStore.categories}
        renderItem={this._renderCategory}
        sliderWidth={window.width}
        itemWidth={window.width / 1.1}
      />
    )
  }

  render() {
    const categoryStore = this.props.rootStore.categoryStore
    return (
      <ParallaxScrollView
        renderScrollComponent={() => <AnimatedScrollView />}
        backgroundColor={scrollStyles.backgroundColor}
        contentBackgroundColor={scrollStyles.backgroundColor}
        renderForeground={() => this._renderHeader()}
        parallaxHeaderHeight={250}
        renderStickyHeader={() => (
          <View style={styles.sticky_header}>
            <View style={styles.sticky_content}>
              <Text Type="largeTitle" Weight="heavy">
                The Warrior Beat
              </Text>
            </View>
          </View>
        )}
        stickyHeaderHeight={100}
      >
        {categoryStore.status === "ready" ? this._renderCarousel() : null}
      </ParallaxScrollView>
    )
  }
}

export default Home
