/**
 *  rootStore.js
 *  Primary mobx Store for application data
 *  stores
 */

import API from "api"
import {
  MediaStore, UserStore, UIStore,
} from "."

export default class RootStore {
  constructor() {
    this.uiStore = new UIStore(this)

    this.userResource = new API("users", "userId")
    this.mediaResource = new API("media", "mediaId")
    this.categoryResource = new API("categories", "categoryId")

    this.userStore = new UserStore(this, this.userResource)
    this.mediaStore = new MediaStore(this, this.mediaResource)
    this.categoryStore = new CategoryStore(this, this.categoryResource)
  }
}
