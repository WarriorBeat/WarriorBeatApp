/**
 *  authorStore.js
 *  mobx store for author data
 *  stores
 */

import { observable, flow, computed, reaction } from "mobx"

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

  loadAuthors = flow(function*() {
    this.state = "pending"
    this.authors = []
    const authors = yield this.resourceClient.fetchAll()
    authors.forEach(json => this.updateAuthor(json))
    this.state = "ready"
  })

  updateAuthor(json) {
    let author = this.authors.find(author => author.id === json.authorId)
    if (!author) {
      author = new Author(this, json.authorId)
      this.authors.push(author)
    } else {
      author.updateFromJson(json)
    }
  }

  resolveAuthor(id) {
    let author = this.authors.find(author => author.id === id)
    return author !== null ? author : null
  }
}

export class Author {
  id = null

  @observable
  profile_image = null

  autoSave = false

  store = null
  saveHandler = null

  constructor(store, id) {
    this.store = store
    this.id = id
    this.saveHandler = reaction(() => this.asJson, json => {})
  }

  @computed
  asJson() {
    return {
      authorId: this.id,
      name: this.name,
      title: this.title,
      description: this.description,
      profile_image: this.profile_image.id
    }
  }

  updateFromJson(json) {
    this.autoSave = false
    this.id = json.authorId
    this.title = json.title
    this.name = json.name
    this.description = json.description
    this.profile_image = this.rootStore.mediaStore.resolveMedia(
      json.profile_image
    )
    this.autoSave = true
  }
}
