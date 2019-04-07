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
import { observer } from "mobx-react/native"
import { pollStyles as styles, polls } from "./styles"

const AnswerItem = (props) => {
  const {
    answerObj, isActive, onPress, animVal,
  } = props
  const { id, text } = answerObj
  const buttonProps = isActive ? polls.activeButton : polls.button
  const textColor = isActive ? "white" : "primaryDark"
  const translateY = animVal.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  })
  return (
    <Animated.View style={{ opacity: animVal, transform: [{ translateY }] }}>
      <Button
        onPress={() => onPress(id)}
        title={(
          <Text Type="titlexsm" Color={textColor} Weight="semibold">
            {text}
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
    const { pollOptions } = this.props
    this.animatedAnswers = []
    pollOptions.forEach((p, i) => {
      this.animatedAnswers[i] = new Animated.Value(0)
    })
  }

  componentDidMount() {
    const { pollOptions } = this.props
    this.animate(pollOptions)
  }

  animate(pollOptions, toVal = 1, callback) {
    const animations = pollOptions.map((p, i) => Animated.timing(this.animatedAnswers[i], {
      toValue: toVal,
      duration: 550,
      useNativeDriver: true,
      easing: Easing.elastic(1),
    }))
    Animated.stagger(200, animations).start(callback)
  }

  render() {
    const { pollOptions, onPress, active } = this.props
    return (
      <View style={styles.answerContainer}>
        {pollOptions.map((a, i) => (
          <AnswerItem
            onPress={onPress}
            answerObj={a}
            isActive={a.id === active}
            animVal={this.animatedAnswers[i]}
          />
        ))}
      </View>
    )
  }
}

AnswerItem.propTypes = {
  answerObj: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    votes: PropTypes.number,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  animVal: PropTypes.number.isRequired,
}

PollAnswers.propTypes = {
  pollOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      votes: PropTypes.number,
    }),
  ).isRequired,
  onPress: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
}

export default PollAnswers
