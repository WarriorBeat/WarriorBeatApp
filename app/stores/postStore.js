/**
 *  postStore.js
 *  mobx store for post data
 *  stores
 */

import { observable, flow, computed, reaction } from "mobx"

export class PostStore {
  authorStore
  resourceClient

  @observable
  posts = []

  @observable
  state = "pending"

  constructor(rootStore, resourceClient) {
    this.rootStore = rootStore
    this.resourceClient = resourceClient
    this.loadPosts()
  }

  loadPosts = flow(function*() {
    this.state = "pending"
    this.posts = []
    const posts = yield this.resourceClient.fetchAll()
    posts.forEach(json => this.updatePost(json))
    this.state = "ready"
  })

  updatePost(json) {
    let post = this.posts.find(post => post.id === json.postId)
    if (!post) {
      post = new Post(this, json.postId)
      this.posts.push(post)
    } else {
      post.updateFromJson(json)
    }
  }
}

export class Post {
  id = null

  @observable
  author = null
  @observable
  categories = []
  @observable
  cover_image = null

  autoSave = false

  store = null
  saveHandler = null

  constructor(store, id) {
    this.store = store
    this.id = id
    // Add Save Handler to update post on server (reactions, etc)
    this.saveHandler = reaction(() => this.asJson, json => {})
  }

  @computed
  get asJson() {
    return {
      postId: this.id,
      title: this.title,
      date: this.date,
      content: this.content,
      author: this.author.id,
      cover_image: this.cover_image.id,
      type: this.type,
      categories: this.categories
    }
  }

  parsePostDate = iso_date => {
    let date = new Date(iso_date)
    let parsed = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    return parsed
  }

  updateFromJson(json) {
    this.autoSave = false
    this.id = json.postId
    this.title = json.title
    this.date = this.parsePostDate(json.date)
    this.content = json.content
    this.author = this.rootStore.authorStore.resolveAuthor(json.author)
    this.cover_image = this.rootStore.mediaStore.resolveMedia(json.cover_image)
    this.type = json.type
    this.categories = this.rootStore.categoryStore.resolveCategories(
      json.categories
    )
    this.autoSave = true
  }
}
