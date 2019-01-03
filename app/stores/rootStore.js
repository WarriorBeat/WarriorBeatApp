/**
 *  rootStore.js
 *  Primary mobx Store for application data
 *  stores
 */

import API from "api"
import {
  PostStore, AuthorStore, MediaStore, CategoryStore, PollStore, UserStore, UIStore,
} from "."

export default class RootStore {
  constructor() {
    this.uiStore = new UIStore(this)

    this.userResource = new API("users", "userId")
    this.mediaResource = new API("media", "mediaId")
    this.authorResource = new API("authors", "categoryId")
    this.categoryResource = new API("categories", "categoryId")
    this.postResource = new API("posts", "postId")
    this.pollResource = new API("polls", "pollId")

    this.userStore = new UserStore(this, this.userResource)
    this.mediaStore = new MediaStore(this, this.mediaResource)
    this.categoryStore = new CategoryStore(this, this.categoryResource)
    this.authorStore = new AuthorStore(this, this.authorResource)
    this.postStore = new PostStore(this, this.postResource)
    this.pollStore = new PollStore(this, this.pollResource)
  }
}
