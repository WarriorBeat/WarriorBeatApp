/**
 * Poll.js
 * Post Type: Poll Component
 * components
 */

import React from "react"
import { View } from "react-native"
import { PropTypes } from "prop-types"
import { Button, Icon } from "react-native-elements"
import Text from "components/Text"
import { Navigation } from "react-native-navigation"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import { icons } from "config/styles"
import { observable } from "mobx"
import { pollStyles as styles, polls } from "./styles"

@inject("pollStore")
@observer
class Poll extends React.Component {
  @observable
  activeIndex = null

  _renderAnswer = (answerObj, index) => {
    const buttonProps = index === this.activeIndex ? polls.activeButton : polls.button
    const textColor = index === this.activeIndex ? "white" : "primaryDark"
    return (
      <Button
        onPress={() => this.updateSelected(index)}
        title={(
          <Text Type="titlexsm" Color={textColor} Weight="semibold">
            {answerObj.answer}
          </Text>
        )}
        {...buttonProps}
      />
    )
  }

  updateSelected = (index) => {
    this.activeIndex = index
  }

  render() {
    const { pollStore, pollId, componentId } = this.props
    const poll = pollStore.resolvePoll(pollId)
    return (
      <View style={styles.root}>
        <Icon
          large
          {...icons.close}
          {...polls.closeButton}
          onPress={() => Navigation.dismissModal(componentId)}
        />
        <View style={styles.header}>
          <Text Type="footnote" Weight="black" Color="ios_blue">
            {poll.date.toDateString().toUpperCase()}
          </Text>
          <Text Type="title" Color="primaryDark" Weight="semibold">
            {poll.question}
          </Text>
        </View>
        <View style={styles.answerContainer}>{poll.answers.map(a => this._renderAnswer(a))}</View>
        <View style={styles.submitContainer}>
          <Button
            title={(
              <Text Type="titlesm" Weight="bold">
                Submit
              </Text>
            )}
            {...polls.submitButton}
          />
        </View>
      </View>
    )
  }
}

Poll.wrappedComponent.propTypes = {
  pollStore: MobxTypes.observableObject.isRequired,
}

Poll.propTypes = {
  pollId: PropTypes.string.isRequired,
  componentId: PropTypes.string.isRequired,
}

export default Poll
