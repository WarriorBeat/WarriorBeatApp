/**
 *  userStore.js
 *  mobx store for user data
 *  stores
 */

import {
  observable, flow, computed, reaction, action,
} from "mobx"
import DeviceInfo from "react-native-device-info"
import { Auth } from "aws-amplify"

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
  cognito = null

  @observable
  isAuthed = false

  @observable
  state = "pending"

  constructor(rootStore, resourceClient) {
    this.rootStore = rootStore
    this.resourceClient = resourceClient
    this.deviceId = DeviceInfo.getUniqueID()
    this.loadUser()
  }

  @action
  loadUser = flow(function* () {
    this.state = "pending"
    let user = yield this.resourceClient.get(this.deviceId)
    if (user === null) {
      user = yield this.resourceClient.post({ userId: this.deviceId })
    }
    this.updateUser(user)
    this.state = "ready"
  })

  @action
  updateUser(json) {
    if (!this.user) {
      this.user = new User(this, json.userId)
    }
    this.user.updateFromJson(json)
  }

  @action
  authenticateUser = flow(function* (email, password) {
    let user = null
    try {
      user = yield Auth.signIn(email, password)
      this.cognito = user
      this.isAuthed = true
    } catch (err) {
      console.log(err)
    }
    return user
  })

  @action
  createUser = flow(function* (email, password) {
    this.state = "pending"
    let user = null
    try {
      user = yield Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },
      })
    } catch (err) {
      user = null
      console.log(err)
    }
    this.state = "ready"
    return user
  })

  @action
  validateUser = flow(function* (email, code) {
    this.state = "pending"
    let user = null
    try {
      user = yield Auth.confirmSignUp(email, code)
    } catch (error) {
      console.log(error)
    }
    this.state = "ready"
    return user
  })

  @computed
  get status() {
    return this.state
  }

  @computed
  get authed() {
    return this.isAuthed
  }
}
