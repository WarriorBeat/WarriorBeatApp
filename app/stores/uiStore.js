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
      id: "",
      setId: id => `ArticleView${id}`,
      type: "screen",
    },
    {
      active: false,
      name: "Post.Poll",
      id: "",
      setId: id => `PollView${id}`,
      type: "modal",
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
    if (length >= 5) {
      this.stackHistory.shift()
    }
    this.stackHistory.push(newStack)
    this.watchHistory = true
  }

  makeChild = (component, props = {}) => {
    const { name, id } = component
    return {
      component: {
        name,
        id,
        passProps: props,
      },
    }
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
    Navigation.dismissAllModals()
    this.menus.map((c) => {
      if (c.active) {
        return this.toggleMenu(c, false)
      }
      return null
    })
  }

  @action
  goTo(name) {
    const component = this.resolveComponent(name)
    const { type, active } = component
    if (active && type === "screen") {
      this.dismissAll()
      return Navigation.popTo(component.id)
    }
    return navAction.goHome()
  }

  @action
  goBack() {
    this.dismissAll()
    Navigation.pop(this.currentStack)
    return this.currentStack
  }

  @action
  push(name, id, props = {}, onTo = this.currentStack) {
    const component = this.resolveComponent(name)
    if (component.setId) {
      component.id = component.setId(id)
    }
    if (component.type === "modal") {
      return this.toggle(component.id, null, props)
    }
    const child = this.makeChild(component, props)
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
    let comp = this.components.find(c => c.id === id)
    if (!comp) {
      comp = this.components.find(c => c.name === id)
    }
    return comp
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
}

export default UIStore
