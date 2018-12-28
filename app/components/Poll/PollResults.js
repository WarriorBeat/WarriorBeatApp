/**
 * PollResults.js
 * Displays Poll Results
 * components
 */

import React from "react"
import { View, ScrollView, Animated } from "react-native"
import { PropTypes } from "prop-types"
import Text from "components/Text"
import { observer, PropTypes as MobxTypes } from "mobx-react/native"
import { Circle as CircleProgress } from "react-native-progress"
import { pollStyles as styles, polls } from "./styles"

const ResultItem = (props) => {
  const { answerObj, totalVotes, didVote } = props
  const { answer, votes } = answerObj
  const votePercent = votes / totalVotes
  const percentProps = didVote ? polls.resultVotedProg : polls.resultProg
  return (
    <Animated.View style={{ ...styles.resultItemContainer }}>
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

const PollResults = (props) => {
  const { poll, votedOn } = props
  return (
    <ScrollView
      style={styles.resultContainer}
      contentContainerStyle={styles.resultContentContainer}
    >
      <Text Type="title" Color="primaryDark" Weight="semibold">
        Results
      </Text>
      {poll.answers.map(a => (
        <ResultItem answerObj={a} totalVotes={poll.totalVotes} didVote={a.answerId === votedOn} />
      ))}
    </ScrollView>
  )
}

PollResults.propTypes = {
  poll: MobxTypes.observableObject.isRequired,
  votedOn: PropTypes.string.isRequired,
}

export default observer(PollResults)
