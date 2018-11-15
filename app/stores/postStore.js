/**
 *  stores/posts.js
 *  mobx store for post data
 */

import { observable, flow } from "mobx"
import { PostAPI, CategoryAPI } from "api/api"

class ObservablePostStore {
  @observable
  posts = []
  @observable
  feed = []
  @observable
  categories = []

  fetchPosts = flow(function*() {
    const resp = yield PostAPI.fetchAll()
    this.posts = resp
    this.feed = resp
    return resp
  })

  fetchCategories = flow(function*() {
    const resp = yield CategoryAPI.fetchAll()
    this.categories = resp
  })

  async getCategory(category) {
    let posts = this.posts
    this.feed = posts
    if (this.posts.length <= 0) {
      posts = await this.fetchPosts()
    }
    let filtered = posts.filter(post => {
      if (
        post.categories.filter(
          c => c.name.toLowerCase() == category.toLowerCase()
        ).length >= 1
      ) {
        return post
      }
    })
    this.feed = filtered
    return filtered
  }

  addPostItem(item) {
    this.posts.push(item)
  }
  s
}

const postStore = new ObservablePostStore()
export default postStore
