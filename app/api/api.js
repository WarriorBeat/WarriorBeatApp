/**
 *  api.js
 *  main API class for WarriorBeatApp
 *  api
 */

import * as log from "loglevel"
import { API as REQ } from "aws-amplify"
import { API_DEV } from "react-native-dotenv"

// Gateways
const gateways = {
  local: "local",
  aws: "warriorbeat-stage",
  aws_dev: "warriorbeat-dev"
}

class API {
  resource = null
  constructor(resource) {
    this.resource_type = resource
    log.info("API DEV", API_DEV)
  }

  get gateway() {
    switch (API_DEV) {
    case "local":
      log.info("CONNECTED TO LOCALHOST")
      return gateways.local
    case "awsdev":
      log.info("CONNECTED TO AWS DEV")
      return gateways.aws_dev
    default:
      return gateways.aws
    }
  }

  get resource() {
    let path = `/api/${this.resource_type}`
    return path
  }

  async fetchAll() {
    const resp = await REQ.get(this.gateway, this.resource)
    return resp
  }
}

export const PostAPI = new API("posts")
export const CategoryAPI = new API("categories")
export const AuthorAPI = new API("authors")
