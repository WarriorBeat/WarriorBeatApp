/**
 * Social.js
 * Social Icons
 * components/Generic
 */

import React from "react"
import PropTypes from "prop-types"
import { SocialIcon } from "react-native-elements"
import { Config, Util } from "config"

const SocialButton = ({ type, url }) => (
  <SocialIcon raised type={type} onPress={() => Util.openLink(url)} />
)

const socials = Object.entries(Config.social)
const Social = () => socials.map(s => <SocialButton type={s[0]} url={s[1].url} />)

SocialButton.propTypes = {
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default Social
