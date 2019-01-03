/**
 *  uiStore.js
 *  mobx UI store
 *  stores
 */

import { observable, computed, action } from "mobx"
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
      type: "post",
    },
    {
      active: false,
      name: "Post.Poll",
      type: "post",
    },
  ]

  constructor(rootStore) {
    this.rootStore = rootStore
  }

  makeChild = (component, props = {}) => {
    const { name, id } = component
    return {
      name,
      id,
      passProps: props,
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
    if (type !== "screen") {
      return null
    }
    if (active) {
      this.dismissAll()
      Navigation.popTo(component.id)
    } else {
      navAction.goHome()
    }
    return this.updateComponent(name, true)
  }

  @action
  toggleModal(component, state, props) {
    const child = this.makeChild(component, props)
    if (state) {
      navAction.launchModal(child)
    } else {
      Navigation.dismissModal(component.id)
    }
  }

  @action
  toggleMenu(component, state) {
    navAction.toggleMenu({ menu: component.id, status: state })
    this.updateComponent(component.name, state)
  }

  resolveComponent(key) {
    let comp = this.components.find(c => c.name === key)
    if (!comp) {
      comp = this.components.find(c => c.id === key)
    }
    return comp
  }

  @action
  updateComponent(name, state) {
    const component = this.resolveComponent(name)
    if (component.type === "screen") {
      this.currentStack = component.name
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
