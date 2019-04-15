/**
 * homeScreen.js
 * Data Store for HomeScreen
 * stores
 */

import { observable, computed, reaction } from "mobx"

class HomeStore {
  @observable
  activeSlide = 0

  @observable
  state = "pending"

  @observable
  activeSlideHandler = () => null

  constructor(rootStore) {
    this.rootStore = rootStore
    this.uiStore = this.rootStore.uiStore
    this.activeSlideReaction = reaction(
      () => this.activeSlide,
      (index) => {
        if (this.uiStore.currentStack !== "HomeScreen") {
          this.activeSlideHandler(index)
        }
      },
    )
  }

  resolve() {
    this.state = "ready"
    return this.state
  }

  @computed
  get ready() {
    const state = this.state === "ready"
    return state
  }
}

export default HomeStore
