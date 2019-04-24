/**
 * Social.js
 * Social Icons
 * components/Generic
 */

import React from "react"
import PropTypes from "prop-types"
import { SocialIcon } from "react-native-elements"
import { Config, Util } from "config"
import { Colors, Position } from "components/styles"

const getProps = (light, hPad) => {
  if (!light) return {}
  return {
    raised: false,
    iconStyle: {
      ...Colors.bgColor("primaryDark"),
      ...Colors.color("whiteSecondary"),
      ...Position.hPadding(hPad),
    },
    light: true,
    iconSize: 42,
  }
}

export const SocialButton = ({
  type, url, onPress, light, hPad,
}) => (
  <SocialIcon
    type={type}
    onPress={() => onPress(url)}
    iconStyle={Position.hPadding(hPad)}
    {...getProps(light, hPad)}
  />
)

const Social = (props) => {
  const socials = Object.entries(Config.social)
  return socials.map(s => <SocialButton key={s[0]} type={s[0]} url={s[1].url} {...props} />)
}

SocialButton.propTypes = {
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  light: PropTypes.bool,
  hPad: PropTypes.string,
}

SocialButton.defaultProps = {
  onPress: url => Util.openLink(url),
  light: false,
  hPad: "0%",
}

export default Social
