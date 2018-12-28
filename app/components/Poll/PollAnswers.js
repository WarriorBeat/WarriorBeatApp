/**
 * PollAnswers.js
 * Displays Poll Answer Choices
 * components
 */

import React from "react"
import { View, Animated } from "react-native"
import { PropTypes } from "prop-types"
import { Button } from "react-native-elements"
import Text from "components/Text"
import { observer, PropTypes as MobxTypes } from "mobx-react/native"
import { pollStyles as styles, polls } from "./styles"

const AnswerItem = (props) => {
  const { answerObj, isActive, onPress } = props
  const { answerId, answer } = answerObj
  const buttonProps = isActive ? polls.activeButton : polls.button
  const textColor = isActive ? "white" : "primaryDark"
  return (
    <Animated.View>
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

const PollAnswers = (props) => {
  const { poll, onPress, active } = props
  return (
    <View style={styles.answerContainer}>
      {poll.answers.map(a => (
        <AnswerItem onPress={onPress} answerObj={a} isActive={a.answerId === active} />
      ))}
    </View>
  )
}

PollAnswers.propTypes = {
  poll: MobxTypes.observableObject.isRequired,
  onPress: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
}

export default observer(PollAnswers)
