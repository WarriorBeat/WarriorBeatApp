/**
 * PollResults.js
 * Displays Poll Results
 * components
 */

import React from "react"
import {
  View, ScrollView, Animated, Easing,
} from "react-native"
import { PropTypes } from "prop-types"
import Text from "components/Text"
import { observer, PropTypes as MobxTypes } from "mobx-react/native"
import { Circle as CircleProgress } from "react-native-progress"
import { pollStyles as styles, polls } from "./styles"

const ResultItem = (props) => {
  const {
    answerObj, totalVotes, didVote, animVal,
  } = props
  const { answer, votes } = answerObj
  const votePercent = votes / totalVotes
  const percentProps = didVote ? polls.resultVotedProg : polls.resultProg
  const translateY = animVal.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  })
  return (
    <Animated.View
      style={{ ...styles.resultItemContainer, opacity: animVal, transform: [{ translateY }] }}
    >
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

@observer
class PollResults extends React.Component {
  constructor(props) {
    super(props)
    const { poll } = this.props
    this.animatedResults = []
    poll.answers.forEach((p, i) => {
      this.animatedResults[i] = new Animated.Value(0)
    })
  }

  componentDidMount() {
    const { poll } = this.props
    this.animate(poll)
  }

  animate(poll, toVal = 1, callback) {
    const animations = poll.answers.map((p, i) => Animated.timing(this.animatedResults[i], {
      toValue: toVal,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.elastic(1),
    }))
    Animated.stagger(200, animations).start(callback)
  }

  render() {
    const { poll, votedOn } = this.props
    const AnimatedText = Animated.createAnimatedComponent(Text)
    const opacity = this.animatedResults[0]
    return (
      <ScrollView
        style={styles.resultContainer}
        contentContainerStyle={styles.resultContentContainer}
      >
        {/* eslint-disable-next-line react-native/no-raw-text */}
        <AnimatedText style={{ opacity }} Type="title" Color="primaryDark" Weight="semibold">
          Results
        </AnimatedText>
        {poll.answers.map((a, i) => (
          <ResultItem
            answerObj={a}
            totalVotes={poll.totalVotes}
            didVote={a.answerId === votedOn}
            animVal={this.animatedResults[i]}
          />
        ))}
      </ScrollView>
    )
  }
}

PollResults.propTypes = {
  poll: MobxTypes.observableObject.isRequired,
  votedOn: PropTypes.string.isRequired,
}

export default PollResults
