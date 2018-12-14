/**
 * home.js
 * Home Screen
 * Screen
 */
import React from "react"
import { View, Animated, ScrollView } from "react-native"
import { Header } from "react-native-elements"
import { styles, scrollView as scrollStyles } from "./styles"
import { icons } from "config/styles"
import { Button, Icon } from "react-native-elements"
import { toggleMenu } from "actions/navigation"
import GenericFeed from "components/GenericFeed"
import Text from "components/Text"
import { inject, observer } from "mobx-react/native"
import ParallaxScrollView from "react-native-parallax-scroll-view"

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)
@inject("rootStore")
@observer
class Home extends React.Component {
  _renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text Type="largeTitle" Weight="bold" Color="black" fontSize={45}>
            <Text Type="titlesm" Weight="bold" Color="black" fontSize={25}>
              The
              {"\n"}
            </Text>
            {"Warrior"}
            <Text Weight="bold">Beat</Text>
          </Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <ParallaxScrollView
        renderScrollComponent={() => <AnimatedScrollView />}
        backgroundColor={scrollStyles.backgroundColor}
        contentBackgroundColor={scrollStyles.backgroundColor}
        renderForeground={() => this._renderHeader()}
        parallaxHeaderHeight={100}
      >
        <GenericFeed />
      </ParallaxScrollView>
    )
  }
}

export default Home
