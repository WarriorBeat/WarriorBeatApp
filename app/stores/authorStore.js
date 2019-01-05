/**
 *  authorStore.js
 *  mobx store for author data
 *  stores
 */

import {
  observable, flow, computed, reaction, when,
} from "mobx"

export class Author {
  id = null

  @observable
  profileImage = null

  autoSave = false

  store = null

  saveHandler = null

  constructor(store, id) {
    this.store = store
    this.id = id
    this.saveHandler = reaction(
      () => this.asJson,
      (json) => {
        if (this.autoSave) {
          this.store.updateAuthor(json)
        }
      },
    )
  }

  @computed
  get asJson() {
    return {
      authorId: this.id,
      name: this.name,
      title: this.title,
      description: this.description,
      profileImage: this.profileImage,
      postCount: this.postCount,
      staffYear: this.staffYear,
      gradeYear: this.gradeYear,
    }
  }

  updateFromJson(json) {
    this.autoSave = false
    this.id = json.authorId
    this.title = json.title
    this.name = json.name
    this.description = json.description
    this.profileImage = this.store.rootStore.mediaStore.resolveMedia(json.profile_image)
    this.postCount = json.post_count
    this.staffYear = json.staff_year
    this.gradeYear = json.grade_year
    this.autoSave = true
  }

  @computed
  get posts() {
    const { postStore } = this.store.rootStore
    const posts = postStore.getPostsByAuthor(this.id)
    return posts
  }
}

export class AuthorStore {
  resourceClient

  @observable
  authors = []

  @observable
  state = "pending"

  constructor(rootStore, resourceClient) {
    this.rootStore = rootStore
    this.resourceClient = resourceClient
    this.loadAuthors()
  }

  loadAuthors = flow(function* () {
    this.state = "pending"
    this.authors = []
    const authors = yield this.resourceClient.fetchAll()
    when(
      () => this.rootStore.mediaStore.status === "ready",
      () => {
        authors.forEach(json => this.updateAuthor(json))
        this.state = "ready"
      },
    )
  })

  updateAuthor(json) {
    let author = this.authors.find(a => a.id === json.authorId)
    if (!author) {
      author = new Author(this, json.authorId)
      this.authors.push(author)
    }
    author.updateFromJson(json)
  }

  resolveAuthor(id) {
    const author = this.authors.find(a => a.id === id)
    return author !== null ? author : null
  }

  @computed
  get status() {
    return this.state
  }
}
