/**
 *  rootStore.js
 *  Primary mobx Store for application data
 *  stores
 */

import API from "api"
import { UserStore, UIStore } from "."

export default class RootStore {
  constructor(client) {
    this.client = client
    this.uiStore = new UIStore(this)
    this.userResource = new API("users", "userId")
    this.userStore = new UserStore(this, this.userResource)
  }
}
