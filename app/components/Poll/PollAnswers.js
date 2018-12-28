/**
 * PollAnswers.js
 * Displays Poll Answer Choices
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

const AnswerItem = (props) => {
  const {
    answerObj, index, isActive, onPress,
  } = props
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
      {poll.answers.map((a, i) => (
        <AnswerItem onPress={onPress} answerObj={a} index={i} isActive={a.answerId === active} />
      ))}
    </View>
  )
}

export default observer(PollAnswers)
