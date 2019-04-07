/**
 * home.js
 * Home Screen
 * Screen
 */
import React from "react"
import {
  View, Animated, ScrollView, LayoutAnimation, Easing,
} from "react-native"
import { icons } from "config/styles"
import { PropTypes } from "prop-types"
import { enableLayoutAnimations } from "config/utils"
import { Button, Icon } from "react-native-elements"
import GenericFeed from "components/GenericFeed"
import Text from "components/Text"
import { inject, observer, PropTypes as MobxTypes } from "mobx-react/native"
import { observable } from "mobx"
import ParallaxScrollView from "react-native-parallax-scroll-view"
import Carousel, { Pagination } from "react-native-snap-carousel"
import { compose } from "react-apollo"
import { queries, PropTypes as gqlTypes } from "graphql"
import { styles, carousel, navIconStyles } from "./styles"

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

@inject("uiStore")
@observer
class Home extends React.Component {
  @observable
  activeSlide

  @observable
  slideHeight = {}

  @observable
  headerVisible = true

  constructor() {
    super()
    enableLayoutAnimations()
    this.iconScale = new Animated.Value(0)
  }

  _renderHeader = () => (
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

  _onHeaderVisible = (isVisible) => {
    if (this.headerVisible !== isVisible) {
      this.iconScale.setValue(isVisible ? 1 : 0)
      Animated.timing(this.iconScale, {
        toValue: isVisible ? 0 : 1,
        duration: 400,
        easing: Easing.elastic(1.5),
        useNativeDriver: true,
      }).start()
      this.headerVisible = isVisible
    }
  }

  _updateHeight = (event, index) => {
    let { height } = event.nativeEvent.layout
    const values = Object.values(this.slideHeight)
    if (values.length >= 1 && height <= 100) {
      height = values.reduce(
        (prev, curr) => (Math.abs(curr - height) < Math.abs(prev - height) ? curr : prev),
      )
    }
    if (this.slideHeight[index] !== height) {
      this.slideHeight[index] = height * 1.1
    }
    return this.slideHeight
  }

  _renderCategory = ({ item, index }) => (
    <View onLayout={e => this._updateHeight(e, index)}>
      <GenericFeed category={item} withPolls={index === 0} />
    </View>
  )

  _renderTab = ({ item, index }) => {
    const btnWeight = index === this.activeSlide || index === 0 ? "bold" : "regular"
    return (
      <View style={styles.tab_item}>
        <Button
          type="clear"
          containerStyle={styles.tab_button_container}
          // icon={{ ...item.icon, color: "black" }}
          title={(
            <Text Color="black" Weight={btnWeight}>
              {item.name}
            </Text>
          )}
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
            ref={(c) => {
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

  _updateSlideIndex = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.activeSlide = index
    this._pager.snapToItem(index)
    this._carousel.snapToItem(index)
  }

  _renderCarousel = categories => (
    <Carousel
      ref={(c) => {
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

  render() {
    const { uiStore, categories, loading } = this.props
    const iconStyle = navIconStyles(this.headerVisible)
    const iconScale = this.iconScale.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
    })
    return (
      <ParallaxScrollView
        renderScrollComponent={() => <AnimatedScrollView style={styles.container} />}
        renderForeground={() => this._renderHeader()}
        {...carousel.container}
        renderStickyHeader={() => (
          <View style={styles.sticky_header}>
            <View style={styles.sticky_content}>
              <Text Type="largeTitle" Weight="heavy">
                TheWarriorBeat
              </Text>
            </View>
          </View>
        )}
        onChangeHeaderVisibility={isVisible => this._onHeaderVisible(isVisible)}
        renderFixedHeader={() => (
          <View style={styles.fixed_header}>
            <View style={styles.fixed_inner}>
              <Animated.View
                style={{
                  ...styles.fixed_inner_item,
                  transform: [{ scale: iconScale }],
                }}
              >
                <Icon
                  onPress={() => uiStore.toggle("PrimaryNavMenu")}
                  {...icons.menu}
                  {...iconStyle.container}
                />
              </Animated.View>
            </View>
          </View>
        )}
      >
        {!loading ? this._renderPagination(categories) : null}
        {!loading ? this._renderCarousel(categories) : null}
      </ParallaxScrollView>
    )
  }
}

Home.wrappedComponent.propTypes = {
  uiStore: MobxTypes.observableObject.isRequired,
}

Home.propTypes = {
  categories: PropTypes.arrayOf(gqlTypes.article).isRequired,
  loading: PropTypes.bool,
}

Home.defaultProps = {
  loading: true,
}

export default compose(queries.category.categoryList)(Home)
