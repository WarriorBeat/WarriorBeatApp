/**
 * home.js
 * Home Screen
 * Screen
 */
import React from "react"
import { View, Animated, ScrollView } from "react-native"
import { styles, scrollView as scrollStyles, window } from "./styles"
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

  _renderCategory({ item }) {
    return <GenericFeed categoryId={item.id} />
  }

  _renderTab = ({ item, index }) => {
    let btn_weight =
      index === this.activeSlide || index === 0 ? "bold" : "light"
    return (
      <View style={styles.tab_item}>
        <Button
          icon={{ ...icons[item.name.toLowerCase()], color: "back" }}
          large
          backgroundColor={"transparent"}
          title={
            <Text Color="black" Weight={btn_weight}>
              {item.name}
            </Text>
          }
          key={index}
          iconStyle={styles.tab_color}
          buttonStyle={styles.tab_button}
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
            sliderWidth={window.width}
            sliderHeight={20}
            itemWidth={200}
            activeSlideAlignment={"start"}
            onSnapToItem={index => this._updateSlideIndex(index)}
          />
        )}
        tappableDots
      />
    )
  }

  _updateSlideIndex = index => {
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
        sliderWidth={window.width}
        itemWidth={window.width}
        containerCustomStyle={styles.carouselContainer}
        inactiveSlideScale={0.99}
        inactiveSlideOpacity={0.9}
        onSnapToItem={index => this._updateSlideIndex(index)}
      />
    )
  }

  render() {
    const categoryStore = this.props.rootStore.categoryStore
    let sort_order = ["News", "Sports"]
    let categories = categoryStore.sortCategories(sort_order)
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
