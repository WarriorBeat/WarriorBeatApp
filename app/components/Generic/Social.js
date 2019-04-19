/**
 * Social.js
 * Social Icons
 * components/Generic
 */

import React from "react"
import PropTypes from "prop-types"
import { SocialIcon } from "react-native-elements"
import { Config, Util } from "config"

export const SocialButton = ({ type, url, onPress }) => (
  <SocialIcon raised type={type} onPress={() => onPress(url)} />
)

const Social = ({ onPress }) => {
  const socials = Object.entries(Config.social)
  return socials.map(s => <SocialButton key={s[0]} type={s[0]} url={s[1].url} onPress={onPress} />)
}

SocialButton.propTypes = {
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onPress: PropTypes.func,
}

SocialButton.defaultProps = {
  onPress: url => Util.openLink(url),
}

export default Social
