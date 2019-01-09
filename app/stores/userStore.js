/**
 *  userStore.js
 *  mobx store for user data
 *  stores
 */

import {
  observable, flow, computed, reaction, action,
} from "mobx"
import { Auth } from "aws-amplify"
import _ from "lodash"

export class User {
  id = null

  autoSave = false

  store = null

  saveHandler = null

  @observable
  subscriptions = []

  @observable
  likedPosts = []

  @observable
  votedPolls = []

  constructor(store, id) {
    this.store = store
    this.id = id
    this.saveHandler = reaction(
      () => this.asJson,
      (json) => {
        if (this.autoSave) {
          this.store.resourceClient.patch(this.id, json)
        }
      },
    )
  }

  @computed
  get asJson() {
    return {
      userId: this.id,
      subscriptions: this.subscriptions,
      liked_posts: this.liked_posts,
      voted_polls: this.voted_polls,
    }
  }

  updateFromJson(json) {
    this.autoSave = false
    this.subscriptions = json.subscriptions
    this.likedPosts = json.liked_posts
    this.votedPolls = json.voted_polls
    this.autoSave = true
  }

  @action.bound
  subscribe(authorId) {
    const subList = [...this.subscriptions]
    subList.push(authorId)
    this.subscriptions = _.union(subList, this.subscriptions)
    return authorId
  }

  @action.bound
  unsubscribe(authorId) {
    this.subscriptions = this.subscriptions.filter(s => s !== authorId)
    return authorId
  }
}

export class UserStore {
  resourceClient

  deviceId

  @observable
  user = null

  @observable
  isAuthed = false

  @observable
  state = "pending"

  @observable
  errorMessage = null

  constructor(rootStore, resourceClient) {
    this.rootStore = rootStore
    this.resourceClient = resourceClient
    this.deviceId = this.rootStore.uiStore.device.id
    this.loadUser()
  }

  @action
  loadUser = flow(function* (cognito = null) {
    this.state = "pending"
    if (cognito) {
      let user = yield this.resourceClient.get(cognito.username)
      if (!user) {
        user = yield this.resourceClient.post({ userId: cognito.username })
      }
      this.updateUser(user)
      this.isAuthed = true
    }
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
      return this.loadUser(user)
    } catch (err) {
      return this.handleError(err)
    }
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
  resetPassword = flow(function* (email, code, newPassword) {
    this.state = "pending"
    let user = null
    try {
      user = yield Auth.forgotPasswordSubmit(email, code, newPassword)
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

  @action
  toggleSubscribe(authorId) {
    if (!this.authed) {
      return false
    }
    if (this.isSubbed(authorId)) {
      return this.user.unsubscribe(authorId)
    }
    return this.user.subscribe(authorId)
  }

  isSubbed(authorId) {
    if (!this.authed) {
      return false
    }
    const author = this.user.subscriptions.find(s => s === authorId)
    return author
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

  @computed
  get profile() {
    return this.user
  }
}
