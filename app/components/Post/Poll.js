/**
 * Poll.js
 * Post Type: Poll Component
 * components
 */

import React from "react"
import { View, ScrollView, Animated } from "react-native"
import { PropTypes } from "prop-types"
import { Button, Icon } from "react-native-elements"
import Text from "components/Text"
import { Navigation } from "react-native-navigation"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import { icons } from "config/styles"
import { observable } from "mobx"
import { Circle as CircleProgress } from "react-native-progress"
import { pollStyles as styles, polls } from "./styles"

@inject("pollStore")
@observer
class Poll extends React.Component {
  @observable
  activeId = null

  @observable
  hasVoted = false

  constructor() {
    super()
    this.translations = []
    this.animOpacity = new Animated.Value(0)
  }

  _renderAnswerItem = (answerObj, index) => {
    const buttonProps = answerObj.answerId === this.activeId ? polls.activeButton : polls.button
    const textColor = answerObj.answerId === this.activeId ? "white" : "primaryDark"
    const translateY = this.translations[index].interpolate({
      inputRange: [0, 1],
      outputRange: [0, 600],
    })
    return (
      <Animated.View style={{ transform: [{ translateY }] }}>
        <Button
          onPress={() => this.updateSelected(answerObj.answerId)}
          title={(
            <Text Type="titlexsm" Color={textColor} Weight="semibold">
              {answerObj.answer}
            </Text>
          )}
          {...buttonProps}
        />
      </Animated.View>
    )
  }

  _renderResultItem = (answerObj, totalVotes, index) => {
    const { answerId, answer, votes } = answerObj
    const votePercent = votes / totalVotes
    const percentProps = answerId === this.activeId ? polls.resultVotedProg : polls.resultProg
    const translateY = this.translations[index].interpolate({
      inputRange: [0, 1],
      outputRange: [600, 0],
    })
    this.animateTransition()
    return (
      <Animated.View style={{ ...styles.resultItemContainer, transform: [{ translateY }] }}>
        <View style={styles.resultTextContainer}>
          <Text Type="titlesm" Color="primaryDark" Weight="bold">
            {answer}
          </Text>
          <Text Type="header" Color="black_light" Weight="semibold">
            {`${votes} Votes`}
          </Text>
        </View>
        <View style={styles.resultProgressContainer}>
          <CircleProgress
            progress={votePercent}
            formatText={() => `${Math.round(Number(votePercent) * 100)}%`}
            {...percentProps}
          />
        </View>
      </Animated.View>
    )
  }

  updateSelected = (answerId) => {
    this.activeId = answerId
  }

  animateTransition = (reverseDirection) => {
    Animated.timing(this.animOpacity, {
      toValue: reverseDirection ? 1 : 0,
      duration: 100,
    }).start()
    let animTranslations = this.translations.map((val, i) => Animated.timing(this.translations[i], {
      toValue: 1,
      duration: 600,
    }))
    if (reverseDirection) {
      animTranslations = animTranslations.reverse()
    }
    Animated.stagger(100, animTranslations).start(() => {
      if (!this.hasVoted) {
        this.translations.forEach(anim => anim.setValue(0))
        this.hasVoted = true
      }
    })
  }

  submitPoll = (poll) => {
    if (!this.activeId) {
      return null
    }
    this.animateTransition(true)
    const answer = poll.answers.find(a => a.answerId === this.activeId)
    const newVotes = String(Number(answer.votes) + 1)
    poll.voteOn(this.activeId, newVotes)
    return poll
  }

  _renderAnswers = poll => (
    <View style={styles.answerContainer}>
      {poll.answers.map((a, i) => {
        this.translations[i] = new Animated.Value(0)
        return this._renderAnswerItem(a, i)
      })}
    </View>
  )

  _renderResults = (poll, opacity) => {
    const AnimatedText = Animated.createAnimatedComponent(Text)
    return (
      <ScrollView
        style={styles.resultContainer}
        contentContainerStyle={styles.resultContentContainer}
      >
        {/* eslint-disable-next-line react-native/no-raw-text */}
        <AnimatedText style={{ opacity }} Type="title" Color="primaryDark" Weight="semibold">
          Results
        </AnimatedText>
        {poll.answers.map((a, i) => this._renderResultItem(a, poll.totalVotes, i))}
      </ScrollView>
    )
  }

  _renderSubmit = (poll, opacity) => (
    <Animated.View style={{ ...styles.submitContainer, opacity }}>
      <Button
        {...(!this.activeId ? { disabled: true } : null)}
        onPress={() => this.submitPoll(poll)}
        title={(
          <Text Type="titlesm" Weight="bold">
            Submit
          </Text>
        )}
        {...polls.submitButton}
      />
    </Animated.View>
  )

  render() {
    const { pollStore, pollId, componentId } = this.props
    const poll = pollStore.resolvePoll(pollId)
    const opacity = this.animOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    })
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
        {!this.hasVoted ? this._renderAnswers(poll) : null}
        {this.hasVoted ? this._renderResults(poll, opacity) : null}
        {!this.hasVoted ? this._renderSubmit(poll, opacity) : null}
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
