/**
 * Author/AuthorStats.js
 * Author Stats Component
 * components
 */

import React from "react"
import { View, ViewPropTypes } from "react-native"
import PropTypes from "prop-types"
import { Divider } from "react-native-elements"
import { observer, PropTypes as MobxTypes } from "mobx-react/native"
import Text from "components/Text"
import { getNumberWithOrdinal } from "config/utils"
import { statStyles as styles } from "./styles"

const Stat = ({ title, value }) => (
  <View style={styles.item}>
    <Text Type="titlexsm" Color="primary" Weight="bold">
      {value}
    </Text>
    <Text Type="subhead" Color="ios_gray" Weight="semibold" Uppercase>
      {title}
    </Text>
  </View>
)

const AuthorStats = ({ author, containerStyle }) => (
  <View style={containerStyle}>
    <Divider />
    <View style={styles.container}>
      <Stat title="Posts" value={author.postCount} />
      <Stat title="Year" value={getNumberWithOrdinal(author.staffYear)} />
      <Stat title="Grade" value={getNumberWithOrdinal(author.gradeYear)} />
    </View>
    <Divider />
  </View>
)

Stat.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

AuthorStats.propTypes = {
  author: MobxTypes.observableObject.isRequired,
  containerStyle: ViewPropTypes.style,
}
AuthorStats.defaultProps = {
  containerStyle: styles.root,
}

export default observer(AuthorStats)
