/**
 * position.js
 * Common Color Styles
 * components/styles
 */

import { Config, Util } from "config"

export const type = Config.colors

export const get = name => Util.getNested(type, name)

export const color = name => ({
  color: get(name),
})

export const bgColor = name => ({
  backgroundColor: get(name),
})
