/**
 * Poll.js
 * Post Type: Poll Component
 * components
 */

import React from "react"
import { View, Animated, Easing } from "react-native"
import { PropTypes } from "prop-types"
import { Button, Icon } from "react-native-elements"
import Text from "components/Text"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import { icons } from "config/styles"
import { observable } from "mobx"
import queries from "graphql/queries"
import mutations from "graphql/mutations"
import { compose } from "react-apollo"
import { pollStyles as styles, polls } from "./styles"
import PollAnswers from "./PollAnswers"
import PollResults from "./PollResults"

@inject("uiStore")
@observer
class Poll extends React.Component {
  @observable
  activeId = null

  @observable
  hasVoted = false

  constructor() {
    super()
    this.animIn = new Animated.Value(0)
  }

  componentDidMount() {
    this.animate()
  }

  animate(toVal = 1) {
    Animated.timing(this.animIn, {
      toValue: toVal,
      duration: 600,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start()
  }

  submitPoll = async (poll) => {
    const { onPollVote } = this.props
    if (!this.activeId) {
      return null
    }
    const x = await onPollVote(this.activeId)
    this.animate(0)
    this._answers.animate(poll.options, 0, () => (this.hasVoted = true))
    return poll
  }

  _renderDate = (dateString) => {
    const date = new Date(dateString)
    return date.toDateString().toUpperCase()
  }

  _renderSubmit = poll => (
    <Animated.View style={{ ...styles.submitContainer, opacity: this.animIn }}>
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
    const {
      poll, componentId, uiStore, loading,
    } = this.props
    const AnimatedText = Animated.createAnimatedComponent(Text)
    const opacity = this.activeId === null ? this.animIn : 1
    return (
      <View style={styles.root}>
        <Icon
          large
          {...icons.close}
          {...polls.closeButton}
          onPress={() => uiStore.toggle(componentId)}
        />
        <View style={styles.header}>
          <AnimatedText style={{ opacity }} Type="footnote" Weight="black" Color="ios_blue">
            {this._renderDate(poll.created_at)}
          </AnimatedText>
          <AnimatedText style={{ opacity }} Type="title" Color="primaryDark" Weight="semibold">
            {poll.question}
          </AnimatedText>
        </View>
        {!this.hasVoted && !loading ? (
          <PollAnswers
            ref={answers => (this._answers = answers)}
            onPress={id => (this.activeId = id)}
            active={this.activeId}
            pollOptions={poll.options}
          />
        ) : null}
        {this.hasVoted ? <PollResults pollId={poll.id} votedOn={this.activeId} /> : null}
        {!this.hasVoted && !loading ? this._renderSubmit(poll) : null}
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

export default compose(mutations.votePollOption)(Poll)
