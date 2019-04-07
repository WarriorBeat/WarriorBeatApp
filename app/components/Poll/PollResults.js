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
import { queries } from "graphql"
import { compose } from "react-apollo"
import { pollStyles as styles, polls } from "./styles"

const ResultItem = (props) => {
  const {
    answerObj, totalVotes, didVote, animVal,
  } = props
  const { text, votes } = answerObj
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
          {text}
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
  animate(poll, toVal = 1, callback) {
    const animations = poll.options.map((p, i) => Animated.timing(this.animatedResults[i], {
      toValue: toVal,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.elastic(1),
    }))
    Animated.stagger(200, animations).start(callback)
  }

  render() {
    const { poll, loading, votedOn } = this.props
    if (loading) {
      return null
    }
    if (!this.animatedResults) {
      this.animatedResults = []
      poll.options.forEach((p, i) => {
        this.animatedResults[i] = new Animated.Value(0)
      })
      this.animate(poll)
    }
    const AnimatedText = Animated.createAnimatedComponent(Text)
    const opacity = this.animatedResults ? this.animatedResults[0] : 0
    return (
      <ScrollView
        style={styles.resultContainer}
        contentContainerStyle={styles.resultContentContainer}
      >
        {/* eslint-disable-next-line react-native/no-raw-text */}
        <AnimatedText style={{ opacity }} Type="title" Color="primaryDark" Weight="semibold">
          Results
        </AnimatedText>
        {poll.options.map((a, i) => (
          <ResultItem
            answerObj={a}
            totalVotes={poll.totalVotes}
            didVote={a.id === votedOn}
            animVal={this.animatedResults ? this.animatedResults[i] : 0}
          />
        ))}
      </ScrollView>
    )
  }
}

ResultItem.propTypes = {
  answerObj: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    votes: PropTypes.number,
  }).isRequired,
  totalVotes: PropTypes.number.isRequired,
  didVote: PropTypes.bool.isRequired,
  animVal: PropTypes.number.isRequired,
}

PollResults.propTypes = {
  poll: MobxTypes.observableObject.isRequired,
  votedOn: PropTypes.string.isRequired,
  loading: PropTypes.bool,
}

PollResults.defaultProps = {
  loading: false,
}

export default compose(queries.poll.getPoll)(PollResults)
