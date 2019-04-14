/**
 *  userStore.js
 *  mobx store for user data
 *  stores
 */

import {
  observable, flow, computed, action,
} from "mobx"
import { Auth } from "aws-amplify"
import { userCreate } from "graphql/mutations"
import { userGet } from "graphql/queries"

export class User {
  id = null

  store = null

  constructor(store, id) {
    this.store = store
    this.id = id
  }

  updateFromJson(json) {
    this.username = json.username
  }
}

export class UserStore {
  deviceId

  @observable
  user = null

  @observable
  isAuthed = false

  @observable
  state = "pending"

  @observable
  errorMessage = null

  constructor(rootStore) {
    this.rootStore = rootStore
    this.client = this.rootStore.client
    this.deviceId = this.rootStore.uiStore.device.id
    this.loadUser()
  }

  @action
  loadUser = flow(function* (cognito = null) {
    this.state = "pending"
    const session = cognito === null ? yield this.retrieveUser() : cognito
    if (session.username) {
      const { identityId } = yield Auth.currentCredentials()
      const { data } = yield this.client.query({
        query: userGet,
        variables: {
          id: identityId,
        },
      })
      const user = data.userGet
      this.updateUser(user)
      this.isAuthed = true
    }
    this.state = "ready"
  })

  retrieveUser = flow(function* () {
    let user = false
    try {
      user = yield Auth.currentAuthenticatedUser()
    } catch (e) {
      user = yield Auth.currentCredentials()
    }
    return user
  })

  @action
  updateUser(json) {
    if (!this.user) {
      this.user = new User(this, json.id)
    }
    this.user.updateFromJson(json)
  }

  @action
  authenticateUser = flow(function* (email, password, createUser = false) {
    this.state = "pending"
    let user = null
    try {
      user = yield Auth.signIn(email, password)
      if (createUser) {
        const { identityId } = yield Auth.currentCredentials()
        this.client.mutate({
          mutation: userCreate,
          variables: {
            input: {
              id: identityId,
              username: user.username,
              email,
            },
          },
        })
      }
      return this.loadUser(user)
    } catch (err) {
      return this.handleError(err)
    }
  })

  @action
  createUser = flow(function* (email, password) {
    this.state = "pending"
    let user = null
    const username = email.toLowerCase()
    try {
      user = yield Auth.signUp({
        username,
        password,
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
    this.authenticateUser(email, password, true)
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
  logout = flow(function* () {
    this.state = "pending"
    const user = yield Auth.signOut({ global: true })
    this.user = null
    this.cognito = null
    this.isAuthed = false
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
    if (this.checkAuth() !== true) {
      return false
    }
    if (this.isSubbed(authorId)) {
      return this.user.unsubscribe(authorId)
    }
    return this.user.subscribe(authorId)
  }

  isSubbed(authorId) {
    if (this.checkAuth(false) !== true) {
      return false
    }
    const author = this.user.subscriptions.find(s => s === authorId)
    return author
  }

  checkAuth(onboard = true) {
    const { uiStore } = this.rootStore
    if (!this.authed) {
      if (onboard) {
        return uiStore.toggle("Account.Authenticator")
      }
      return false
    }
    return true
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
