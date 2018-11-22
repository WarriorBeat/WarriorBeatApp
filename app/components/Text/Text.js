/**
 * Text.js
 * Text Component wrapper with prop styles
 * components
 */

import React from "react"
import { weight, color, decoration, type } from "./styles"
import { Text as RenderText } from "react-native"
import { colors as genericColors } from "config/styles"

class Text extends React.Component {
  handleType = () => {
    const { Type } = this.props
    let font_type = Type ? type[Type] : {}
    return font_type
  }

  handleColor = () => {
    const { Color } = this.props
    let font_color = Color ? color[Color] : {}
    return font_color
  }

  handleWeight = () => {
    const { Weight } = this.props
    let font_weight = Weight ? weight[Weight] : {}
    return font_weight
  }

  handleDecor = () => {
    const { Shadow } = this.props
    let font_decor = {}
    let shadow_decor = Shadow ? decoration.shadow : {}
    font_decor =
      typeof Shadow == "string"
        ? { ...shadow_decor, textShadowColor: genericColors[Shadow] }
        : { ...shadow_decor }
    return font_decor
  }

  render() {
    const { children, style, Italic, NoPadding } = this.props
    let render_style = {
      ...this.handleType(),
      ...this.handleColor(),
      ...this.handleWeight(),
      ...this.handleDecor(),
      fontStyle: Italic ? "italic" : "normal",
      includeFontPadding: NoPadding ? false : true
    }
    return (
      <RenderText style={{ ...style, ...render_style }}>{children}</RenderText>
    )
  }
}

export default Text
