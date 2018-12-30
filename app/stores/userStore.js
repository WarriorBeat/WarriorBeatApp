/**
 *  userStore.js
 *  mobx store for user data
 *  stores
 */

import {
  observable, flow, computed, reaction,
} from "mobx"
import DeviceInfo from "react-native-device-info"

export class User {
  id = null

  autoSave = false

  store = null

  saveHandler = null

  constructor(store, id) {
    this.store = store
    this.id = id
    this.saveHandler = reaction(
      () => this.asJson,
      (json) => {
        if (this.autoSave) {
          this.store.updateUser(json)
        }
      },
    )
  }

  @computed
  get asJson() {
    return {
      userId: this.id,
    }
  }

  updateFromJson(json) {
    this.autoSave = false
    this.id = json.userId
    this.autoSave = true
  }
}

export class UserStore {
  resourceClient

  deviceId

  @observable
  user = null

  @observable
  state = "pending"

  constructor(rootStore, resourceClient) {
    this.rootStore = rootStore
    this.resourceClient = resourceClient
    this.deviceId = DeviceInfo.getUniqueID()
    this.loadUser()
  }

  loadUser = flow(function* () {
    this.state = "pending"
    let user = yield this.resourceClient.get(this.deviceId)
    if (user === null) {
      user = yield this.resourceClient.post({ userId: this.deviceId })
    }
    this.updateUser(user)
    this.state = "ready"
  })

  updateUser(json) {
    if (!this.user) {
      this.user = new User(this, json.userId)
    }
    this.user.updateFromJson(json)
  }

  @computed
  get status() {
    return this.state
  }
}
