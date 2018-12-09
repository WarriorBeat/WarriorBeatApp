/**
 *  api.js
 *  main API class for WarriorBeatApp
 *  api
 */

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
  constructor(resource, identity) {
    this.resource_type = resource
    this.identity = identity
  }

  get gateway() {
    switch (API_DEV) {
    case "local":
      return gateways.local
    case "awsdev":
      return gateways.aws_dev
    default:
      return gateways.aws
    }
  }

  get resource() {
    let path = `/api/${this.resource_type}`
    return path
  }

  /**
   * Fetch all items at resource endpoint
   *
   * @returns - All Items at resource endpoint
   * @memberof API
   */
  async fetchAll() {
    const resp = await REQ.get(this.gateway, this.resource)
    return resp
  }

  async fetchIDs() {
    const resp = await REQ.get(this.gateway, this.resource)
    let ids = resp.map(item => {
      return item[this.identity]
    })
    return ids
  }

  async get(id, includes) {
    let url = `${this.resource}/${id}?include=${includes.join(",")}`
    const resp = await REQ.get(this.gateway, url)
    return resp
  }
}

export const PostAPI = new API("posts", "postId")
export const CategoryAPI = new API("categories", "categoryId")
export const AuthorAPI = new API("authors", "authorId")
