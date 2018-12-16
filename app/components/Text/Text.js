/**
 * Text.js
 * Text Component wrapper with prop styles
 * components
 */

import React from "react"
import { Text as RenderText } from "react-native"
import { colors as genericColors } from "config/styles"
import {
  weight, color, decoration, type,
} from "./styles"

class Text extends React.Component {
  handleType = () => {
    const { Type } = this.props
    const fontType = Type ? type[Type] : {}
    return fontType
  }

  handleColor = () => {
    const { Color } = this.props
    const fontColor = Color ? color[Color] : {}
    return fontColor
  }

  handleWeight = () => {
    const { Weight } = this.props
    const fontWeight = Weight ? weight[Weight] : {}
    return fontWeight
  }

  handleDecor = () => {
    const { Shadow } = this.props
    let fontDecor = {}
    const shadowDecor = Shadow ? decoration.shadow : {}
    fontDecor = typeof Shadow === "string"
      ? { ...shadowDecor, textShadowColor: genericColors[Shadow] }
      : { ...shadowDecor }
    return fontDecor
  }

  render() {
    const {
      children, style, Italic, NoPadding, fontSize,
    } = this.props
    const renderStyle = {
      ...this.handleType(),
      ...this.handleColor(),
      ...this.handleWeight(),
      ...this.handleDecor(),
      fontStyle: Italic ? "italic" : "normal",
      includeFontPadding: !NoPadding,
    }
    const textSize = fontSize || renderStyle.fontSize
    return (
      <RenderText
        style={{
          ...style,
          ...renderStyle,
          fontSize: textSize,
        }}
      >
        {children}
      </RenderText>
    )
  }
}

export default Text
