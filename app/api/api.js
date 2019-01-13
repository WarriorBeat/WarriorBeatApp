/**
 *  api.js
 *  main API class for WarriorBeatApp
 *  api
 */

import { API as REQ } from "aws-amplify"
import Config from "react-native-config"

/**
 * Handle API Resources
 *
 * @export
 * @class API
 */
export default class API {
  resource = null

  onReceiveUpdate = null

  /**
   * Creates an instance of API.
   * @param {string} resource - Resource endpoint name
   * @param {string} identity - ResourceItem identity
   * @memberof API
   */
  constructor(resource, identity) {
    this.resource_type = resource
    this.identity = identity
    this.gateways = {
      local: "local",
      aws: "warriorbeat-stage",
      aws_dev: "warriorbeat-dev",
    }
  }

  /**
   * Get API Gateway from dotenv
   *
   * @readonly
   * @memberof API
   */
  get gateway() {
    switch (Config.AWS_DEV) {
    case "local":
      return this.gateways.local
    case "awsdev":
      return this.gateways.aws_dev
    default:
      return this.gateways.aws
    }
  }

  /**
   * Get Resource Endpoint
   *
   * @readonly
   * @memberof API
   */
  get resource() {
    const path = `/api/${this.resource_type}`
    return path
  }

  /**
   * Get Resource Item Endpoint
   *
   * @param {string} id - Resource Item ID
   * @param {string[]=} includes - Optional Query Params for Includes
   * @returns Resource Item Url
   * @memberof API
   */
  getItemUrl(id, includes) {
    let path = `${this.resource}/${id}`
    if (includes) {
      path = `${path}?include=${includes.join(",")}`
    }
    return path
  }

  /**
   * Event Handler for Updates received from Api
   *
   * @param {object} json - Received JSON Data
   * @event API#onReceiveUpdate
   * @returns JSON Data
   * @memberof API
   */
  handleServerUpdate(json) {
    if (this.onReceiveUpdate) {
      this.onReceiveUpdate(json)
    }
    return json
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
    const ids = resp.map(item => item[this.identity])
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
    const url = this.getItemUrl(id, includes)
    let resp
    try {
      resp = await REQ.get(this.gateway, url)
    } catch (error) {
      return null
    }
    return resp
  }

  /**
   * Make Patch Request to Resource Item
   *
   * @param {string} id - Resource Item Id
   * @async
   * @returns Server Reply of Patch Request
   * @memberof API
   */
  async patch(id, data) {
    const url = this.getItemUrl(id)
    const init = {
      body: { ...data },
    }
    const resp = await REQ.patch(this.gateway, url, init)
    this.handleServerUpdate(resp)
    return resp
  }

  /**
   * Make Post Request to Resource Endpoint
   *
   * @param {object} data - JSON Data to Post
   * @returns JSON Server Reply of Post Request
   * @memberof API
   */
  async post(data) {
    const init = {
      body: data,
    }
    const resp = await REQ.post(this.gateway, this.resource, init)
    return resp
  }
}
