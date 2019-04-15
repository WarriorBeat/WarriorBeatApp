/**
 *  rootStore.js
 *  Primary mobx Store for application data
 *  stores
 */

import { UserStore, UIStore, HomeStore } from "."

export default class RootStore {
  constructor(client) {
    this.client = client

    this.uiStore = new UIStore(this)
    this.userStore = new UserStore(this)
    this.homeStore = new HomeStore(this)
  }
}
