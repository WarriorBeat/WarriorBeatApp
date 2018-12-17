/**
 * ReactionButton.js
 * Post Reaction Button Component
 * components
 */

import React from "react"
import { View, LayoutAnimation } from "react-native"
import { observer } from "mobx-react"
import { observable } from "mobx"
import { PropTypes } from "prop-types"
import ActionButton from "react-native-action-button"
import Emoji from "react-native-emoji"
import { reaction as styles, reactionSettings as settings } from "./styles"

@observer
class ReactionButton extends React.Component {
  @observable
  visible = true

  @observable
  _viewOffset = 0

  onScroll = (event) => {
    const LinearLayout = {
      duration: 400,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      delete: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
    }
    const currentOffset = event.nativeEvent.contentOffset.y
    const direction = currentOffset > 0 && currentOffset > this._viewOffset ? "down" : "up"
    const isVisible = direction === "up"
    if (isVisible !== this.visible) {
      LayoutAnimation.configureNext(LinearLayout)
      this.visible = isVisible
    }
    this._viewOffset = currentOffset
  }

  _renderItem = (title, emoji) => (
    <ActionButton.Item title={title} buttonColor={settings.button_item_color} onPress={() => {}}>
      <Emoji name={emoji} style={styles.emoji} />
    </ActionButton.Item>
  )

  _renderButton = () => (
    <ActionButton
      buttonColor={settings.button_color}
      renderIcon={active => (active ? (
        <Emoji name="grinning" style={styles.emoji} />
      ) : (
        <Emoji name="thinking_face" style={styles.emoji} />
      ))
      }
    >
      {this._renderItem("Subscribe", "heart")}
      {this._renderItem("Like", "+1")}
    </ActionButton>
  )

  render() {
    const { children } = this.props
    return (
      <View style={styles.wrapper}>
        {children}
        {this.visible ? this._renderButton() : null}
      </View>
    )
  }
}

ReactionButton.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ReactionButton
