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
  activeId = null

  _renderAnswer = (answerObj) => {
    const buttonProps = answerObj.answerId === this.activeId ? polls.activeButton : polls.button
    const textColor = answerObj.answerId === this.activeId ? "white" : "primaryDark"
    return (
      <Button
        onPress={() => this.updateSelected(answerObj.answerId)}
        title={(
          <Text Type="titlexsm" Color={textColor} Weight="semibold">
            {answerObj.answer}
          </Text>
        )}
        {...buttonProps}
      />
    )
  }

  updateSelected = (answerId) => {
    this.activeId = answerId
  }

  submitPoll = (poll) => {
    const answer = poll.answers.find(a => a.answerId === this.activeId)
    const newVotes = String(Number(answer.votes) + 1)
    poll.voteOn(this.activeId, newVotes)
    return poll
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
            onPress={() => this.submitPoll(poll)}
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
