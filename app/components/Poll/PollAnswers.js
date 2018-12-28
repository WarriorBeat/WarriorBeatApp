/**
 * PollAnswers.js
 * Displays Poll Answer Choices
 * components
 */

import React from "react"
import { View, Animated, Easing } from "react-native"
import { PropTypes } from "prop-types"
import { Button } from "react-native-elements"
import Text from "components/Text"
import { observer, PropTypes as MobxTypes } from "mobx-react/native"
import { pollStyles as styles, polls } from "./styles"

const AnswerItem = (props) => {
  const {
    answerObj, isActive, onPress, animVal,
  } = props
  const { answerId, answer } = answerObj
  const buttonProps = isActive ? polls.activeButton : polls.button
  const textColor = isActive ? "white" : "primaryDark"
  const translateY = animVal.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  })
  return (
    <Animated.View style={{ opacity: animVal, transform: [{ translateY }] }}>
      <Button
        onPress={() => onPress(answerId)}
        title={(
          <Text Type="titlexsm" Color={textColor} Weight="semibold">
            {answer}
          </Text>
        )}
        {...buttonProps}
      />
    </Animated.View>
  )
}

@observer
class PollAnswers extends React.Component {
  constructor(props) {
    super(props)
    const { poll } = this.props
    this.animatedAnswers = []
    poll.answers.forEach((p, i) => {
      this.animatedAnswers[i] = new Animated.Value(0)
    })
  }

  componentDidMount() {
    const { poll } = this.props
    this.animate(poll)
  }

  animate(poll, toVal = 1, callback) {
    const animations = poll.answers.map((p, i) => Animated.timing(this.animatedAnswers[i], {
      toValue: toVal,
      duration: 550,
      useNativeDriver: true,
      easing: Easing.elastic(1),
    }))
    Animated.stagger(200, animations).start(callback)
  }

  render() {
    const { poll, onPress, active } = this.props
    return (
      <View style={styles.answerContainer}>
        {poll.answers.map((a, i) => (
          <AnswerItem
            onPress={onPress}
            answerObj={a}
            isActive={a.answerId === active}
            animVal={this.animatedAnswers[i]}
          />
        ))}
      </View>
    )
  }
}

PollAnswers.propTypes = {
  poll: MobxTypes.observableObject.isRequired,
  onPress: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
}

export default PollAnswers
