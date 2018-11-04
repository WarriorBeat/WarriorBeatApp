/**
 * Entry point as a workaround to
 * babelHelpers failing.
 * See: https://github.com/facebook/react-native/issues/20150
 *
 */

import Amplify from "aws-amplify"
import config from "./aws-exports"
import applyDecoratedDescriptor from "@babel/runtime/helpers/es6/applyDecoratedDescriptor"
import initializerDefineProperty from "@babel/runtime/helpers/es6/initializerDefineProperty"

Object.assign(babelHelpers, {
  applyDecoratedDescriptor,
  initializerDefineProperty
})

// Local Testing Api
config.aws_cloud_logic_custom.push({
  name: "local",
  endpoint: "http://localhost:5000"
})
Amplify.configure(config)

require("./app/index")
