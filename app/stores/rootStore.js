/**
 *  rootStore.js
 *  Primary mobx Store for application data
 *  stores
 */

import { PostStore, AuthorStore, MediaStore, CategoryStore } from "."
import API from "api"

export default class RootStore {
  constructor() {
    this.mediaResource = new API("media", "mediaId")
    this.authorResource = new API("authors", "categoryId")
    this.categoryResource = new API("categories", "categoryId")
    this.postResource = new API("posts", "postId")

    this.mediaStore = new MediaStore(this, this.mediaResource)
    this.categoryStore = new CategoryStore(this, this.categoryResource)
    this.authorStore = new AuthorStore(this, this.authorResource)
    this.postStore = new PostStore(this, this.postResource)
  }
}
