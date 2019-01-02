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

  @observable
  errorMessage = null

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
    this.state = "pending"
    let user = null
    try {
      user = yield Auth.signIn(email, password)
      this.cognito = user
      this.isAuthed = true
    } catch (err) {
      return this.handleError(err)
    }
    this.state = "ready"
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
      return this.handleError(err)
    }
    this.state = "ready"
    return user
  })

  @action
  validateUser = flow(function* (email, password, code) {
    this.state = "pending"
    let user = null
    try {
      user = yield Auth.confirmSignUp(email, code)
    } catch (err) {
      this.state = "failed"
      if (err.code === "CodeMismatchException") {
        return this.handleError(err)
      }
    }
    this.authenticateUser(email, password)
    this.state = "ready"
    return user
  })

  @action
  forgotPassword = flow(function* (email) {
    this.state = "pending"
    let user = null
    try {
      user = yield Auth.forgotPassword(email)
    } catch (err) {
      this.handleError(err)
    }
    this.state = "ready"
    return user
  })

  @action
  resetPassword = flow(function* (email, code, new_password) {
    this.state = "pending"
    let user = null
    try {
      user = yield Auth.forgotPasswordSubmit(email, code, new_password)
    } catch (err) {
      this.handleError(err)
    }
    this.state = "ready"
    return user
  })

  @action
  handleError(error) {
    this.state = "failed"
    this.errorMessage = error
    const { code } = this.errorMessage
    switch (code) {
    case "InvalidParameterException":
      if (this.errorMessage.message.includes("email")) {
        this.errorMessage.code = "InvalidEmailParameterException"
        this.errorMessage.message = "Invalid email address."
      } else {
        this.errorMessage.message = "Password must be greater than 8 characters and include at least one uppercase letter."
      }
      return this.errorMessage
    default:
      return this.errorMessage
    }
  }

  @action
  resolve() {
    return (this.state = "ready")
  }

  @computed
  get status() {
    return this.state
  }

  @computed
  get authed() {
    return this.isAuthed
  }

  @computed
  get error() {
    return this.errorMessage
  }
}
