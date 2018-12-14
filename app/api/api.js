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

/**
 * Handle API Resources
 *
 * @export
 * @class API
 */
export default class API {
  resource = null
  /**
   * Creates an instance of API.
   * @param {string} resource - Resource endpoint name
   * @param {string} identity - ResourceItem identity
   * @memberof API
   */
  constructor(resource, identity) {
    this.resource_type = resource
    this.identity = identity
  }

  /**
   * Get API Gateway from dotenv
   *
   * @readonly
   * @memberof API
   */
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

  /**
   * Get Resource Endpoint
   *
   * @readonly
   * @memberof API
   */
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

  /**
   * Fetch all item IDs from endpoint
   *
   * @async
   * @returns List of endpoint item ids
   * @memberof API
   */
  async fetchIDs() {
    const resp = await REQ.get(this.gateway, this.resource)
    let ids = resp.map(item => {
      return item[this.identity]
    })
    return ids
  }

  /**
   * Retrieve item from endpoint by Id
   *
   * @param {string} id
   * @param {string[]} includes
   * @async
   * @returns Resource Item by Id
   * @memberof API
   */
  async get(id, includes) {
    let url = `${this.resource}/${id}?include=${includes.join(",")}`
    const resp = await REQ.get(this.gateway, url)
    return resp
  }
}
