/**
 *  uiStore.js
 *  mobx UI store
 *  stores
 */

import {
  observable, computed, action, reaction,
} from "mobx"
import { Navigation } from "react-native-navigation"
import DeviceInfo from "react-native-device-info"
import * as navAction from "actions/navigation"
import { Dimensions, Platform } from "react-native"
import _ from "lodash"

class UIStore {
  @observable.struct
  window = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  }

  @observable.struct
  device = {
    id: DeviceInfo.getUniqueID(),
  }

  @observable.struct
  devicePlatform = Platform.OS

  @observable
  components = [
    {
      active: true,
      name: "Initializing",
      id: "Initializing",
      type: "screen",
    },
    {
      active: false,
      name: "Home",
      id: "HomeScreen",
      type: "screen",
    },
    {
      active: false,
      name: "NavMenu",
      id: "PrimaryNavMenu",
      type: "menu",
    },
    {
      active: false,
      name: "Account.Authenticator",
      id: "Account.Authenticator",
      type: "modal",
    },
    {
      active: false,
      name: "Post.Article",
      id: "ArticleView",
      isView: true,
      type: "screen",
    },
    {
      active: false,
      name: "Post.Poll",
      id: "PollView",
      isView: true,
      type: "modal",
    },
    {
      active: false,
      name: "Author.Profile",
      id: "AuthorProfileView",
      isView: true,
      type: "screen",
    },
  ]

  @observable
  currentStack = "Initializing"

  stackHistory = []

  watchHistory = true

  historyHandler = null

  appearHandler = null

  disappearHandler = null

  constructor(rootStore) {
    this.rootStore = rootStore
    this.historyHandler = reaction(
      () => this.currentStack,
      (currentStack) => {
        if (this.watchHistory) {
          this.updateHistory(currentStack)
        }
      },
    )
    this.appearHandler = Navigation.events().registerComponentDidAppearListener(
      ({ componentId, componentName }) => this.updateComponent(componentId, true, componentName),
    )
    this.disappearHandler = Navigation.events().registerComponentDidDisappearListener(
      ({ componentId, componentName }) => this.updateComponent(componentId, false, componentName),
    )
  }

  updateHistory(newStack) {
    const { length } = this.stackHistory
    this.watchHistory = false
    if (length >= 10) {
      this.stackHistory.shift()
    }
    this.stackHistory.push(newStack)
    this.watchHistory = true
  }

  makeChild = (component, props = {}, options) => {
    const { name, id } = component
    const child = {
      component: {
        name,
        id,
        passProps: props,
      },
    }
    if (options) {
      child.component.options = options
    }
    return child
  }

  @action
  toggle(name, toState = null, props = {}) {
    const component = this.resolveComponent(name)
    const { type, active } = component
    const state = toState === null ? !active : toState
    switch (type) {
    case "modal":
      return this.toggleModal(component, state, props)
    case "menu":
      return this.toggleMenu(component, state)
    default:
      return null
    }
  }

  @action
  dismissAll() {
    this.modals.map((c) => {
      if (c.active) {
        return this.toggleModal(c, false)
      }
      return null
    })
    this.menus.map((c) => {
      if (c.active) {
        return this.toggleMenu(c, false)
      }
      return null
    })
  }

  @action
  goTo(name) {
    const component = this.resolveComponent(this.currentStack)
    const toComponent = this.resolveComponent(name)
    const { type, active } = component
    if (active && type === "screen") {
      this.dismissAll()
      return Navigation.popTo(toComponent.id)
    }
    return navAction.goHome()
  }

  @action
  goBack() {
    const component = this.resolveComponent(this.currentStack)
    this.dismissAll()
    if (component.type === "screen") {
      Navigation.pop(this.currentStack)
    }
    return this.currentStack
  }

  @action
  push(name, viewId, props = {}, onTo = this.currentStack, options = null) {
    let component = this.resolveComponent(name)
    if (component.isView) {
      component = this.generateComponent(component, viewId)
    }
    if (component.type === "modal") {
      return this.toggle(component.id, null, props)
    }
    const child = this.makeChild(component, props, options)
    this.dismissAll()
    return Navigation.push(onTo, child)
  }

  @action
  toggleModal(component, state, props) {
    const child = this.makeChild(component, props)
    if (state) {
      return navAction.launchModal(child)
    }
    return Navigation.dismissModal(component.id)
  }

  toggleMenu = (component, state) => navAction.toggleMenu({ menu: component.id, status: state })

  resolveComponent(id) {
    const compId = this.getComponentParent(id)
    let comp = this.components.find(c => c.id === compId)
    if (!comp) {
      comp = this.components.find(c => c.name === compId)
    }
    return comp
  }

  getComponentParent = (childId) => {
    const [parentId] = childId.split("@")
    return parentId
  }

  @action
  generateComponent(component, viewId) {
    let newId = `${component.id}@${viewId}`
    const lastComp = _.findLast(this.stackHistory, c => c.split("#")[0] === newId)
    if (lastComp) {
      const lastId = lastComp.split("#")[1]
      const instance = Number.isNaN(Number(lastId)) ? 1 : Number(lastId)
      newId = `${newId}#${Number(instance) + 1}`
    }
    const child = { ...component, id: newId }
    return child
  }

  @action
  updateComponent(id, state, name = null) {
    let component = this.resolveComponent(id)
    if (!component) {
      component = this.resolveComponent(name)
    }
    if (component.type !== "menu" && state) {
      this.currentStack = id
    }
    component.active = state
    return component
  }

  @computed
  get modals() {
    return this.components.filter(c => c.type === "modal")
  }

  @computed
  get menus() {
    return this.components.filter(c => c.type === "menu")
  }

  @computed
  get screens() {
    return this.components.filter(c => c.type === "screen")
  }

  @computed
  get isIOS() {
    const ios = this.devicePlatform === "ios"
    return ios
  }

  @computed
  get ready() {
    const state = this.state === "ready"
    return state
  }
}

export default UIStore
