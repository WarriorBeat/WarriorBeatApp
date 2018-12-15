/**
 * home.js
 * Home Screen
 * Screen
 */
import React from "react"
import { View, Animated, ScrollView, LayoutAnimation } from "react-native"
import { styles, carousel } from "./styles"
import { icons } from "config/styles"
import { Button } from "react-native-elements"
import GenericFeed from "components/GenericFeed"
import Text from "components/Text"
import { inject, observer } from "mobx-react/native"
import { observable } from "mobx"
import ParallaxScrollView from "react-native-parallax-scroll-view"
import Carousel, { Pagination } from "react-native-snap-carousel"

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

@inject("rootStore")
@observer
class Home extends React.Component {
  @observable
  activeSlide
  @observable
  slideHeight = {}

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

  _updateHeight = (event, index) => {
    let height = event.nativeEvent.layout.height
    let values = Object.values(this.slideHeight)
    if (values.length >= 1 && height <= 100) {
      height = values.reduce((prev, curr) => {
        return Math.abs(curr - height) < Math.abs(prev - height) ? curr : prev
      })
    }
    if (this.slideHeight[index] !== height) {
      this.slideHeight[index] = height * 1.1
    }
    return this.slideHeight
  }

  _renderCategory = ({ item, index }) => {
    return (
      <View onLayout={e => this._updateHeight(e, index)}>
        <GenericFeed categoryId={item.id} />
      </View>
    )
  }

  _renderTab = ({ item, index }) => {
    let btn_weight =
      index === this.activeSlide || index === 0 ? "bold" : "regular"
    return (
      <View style={styles.tab_item}>
        <Button
          containerViewStyle={styles.tab_button_container}
          icon={{ ...icons[item.name.toLowerCase()], color: "black" }}
          title={
            <Text Color="black" Weight={btn_weight}>
              {item.name}
            </Text>
          }
          key={index}
          onPress={() => this._carousel.snapToNext()}
          iconStyle={styles.tab_color}
          buttonStyle={styles.tab_button}
          {...carousel.tab}
        />
      </View>
    )
  }

  _renderPagination(categories) {
    return (
      <Pagination
        containerStyle={styles.pagination}
        dotsLength={categories.length}
        activeDotIndex={this.activeSlide}
        carouselRef={this._carousel}
        renderDots={() => (
          <Carousel
            ref={c => {
              this._pager = c
            }}
            data={categories}
            renderItem={this._renderTab}
            {...carousel.pager}
            onSnapToItem={index => this._updateSlideIndex(index)}
          />
        )}
      />
    )
  }

  _updateSlideIndex = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.activeSlide = index
    this._pager.snapToItem(index)
    this._carousel.snapToItem(index)
  }

  _renderCarousel = categories => {
    return (
      <Carousel
        ref={c => {
          this._carousel = c
        }}
        data={categories}
        renderItem={this._renderCategory}
        containerCustomStyle={styles.carouselContainer}
        {...carousel.feed}
        onSnapToItem={index => this._updateSlideIndex(index)}
        slideStyle={{ height: this.slideHeight[this.activeSlide] }}
      />
    )
  }

  render() {
    const categoryStore = this.props.rootStore.categoryStore
    let sort_order = ["News", "Sports"]
    let categories = categoryStore.sortCategories(sort_order)
    return (
      <ParallaxScrollView
        renderScrollComponent={() => (
          <AnimatedScrollView style={styles.container} />
        )}
        renderForeground={() => this._renderHeader()}
        {...carousel.container}
        renderStickyHeader={() => (
          <View style={styles.sticky_header}>
            <View style={styles.sticky_content}>
              <Text Type="largeTitle" Weight="heavy">
                The Warrior Beat
              </Text>
            </View>
          </View>
        )}
      >
        {categoryStore.status === "ready"
          ? this._renderPagination(categories)
          : null}
        {categoryStore.status === "ready"
          ? this._renderCarousel(categories)
          : null}
      </ParallaxScrollView>
    )
  }
}

export default Home
