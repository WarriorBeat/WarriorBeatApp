/**
 *  postStore.js
 *  mobx store for post data
 *  stores
 */

import { observable, flow } from "mobx"
import { PostAPI, CategoryAPI } from "api"
import AuthorStore from "./authorStore"

class ObservablePostStore {
  @observable
  posts = []
  @observable
  feed = []
  @observable
  categories = []

  fetchPosts = flow(function*() {
    const resp = yield PostAPI.fetchAll()
    let authors = yield AuthorStore.fetchAuthors()
    resp.forEach(p => {
      if (p.date) {
        p.date = this.parseDateISO(p.date)
      }
      p.author = authors.find(a => {
        return a.authorId == p.authorId
      })
    })
    this.posts = resp
    this.feed = resp
    return resp
  })

  fetchCategories = flow(function*() {
    const resp = yield CategoryAPI.fetchAll()
    this.categories = resp
  })

  parseDateISO = iso_date => {
    let date = new Date(iso_date)
    let parsed = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    return parsed
  }

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

  async getRelated(post) {
    let posts = this.posts
    if (this.posts.length <= 0) {
      posts = await this.fetchPosts()
    }
    let categories = post.categories.map(c => {
      return c.categoryId
    })
    let x_category = posts.filter(p => {
      let p_categories = p.categories.map(c => {
        return c.categoryId
      })
      if (
        p.postId !== post.postId &&
        p_categories.some(cat => categories.includes(cat))
      ) {
        return p
      }
    })
    return x_category
  }
}

const postStore = new ObservablePostStore()
export default postStore
