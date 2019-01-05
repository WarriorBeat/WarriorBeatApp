/**
 *  postStore.js
 *  mobx store for post data
 *  stores
 */

import {
  observable, flow, computed, reaction, when,
} from "mobx"

/**
 * Class for individual Post Resource Item
 *
 * @export Post
 * @class Post
 */
export class Post {
  id = null

  @observable
  author = null

  @observable
  categories = []

  @observable
  coverImage = null

  autoSave = false

  store = null

  saveHandler = null

  /**
   * Creates an instance of Post.
   * Hooks saveHandler
   *
   * @param {object} store - Parent Store
   * @param {string} id - Immutable id of Post Item
   * @memberof Post
   */
  constructor(store, id) {
    this.store = store
    this.id = id
    // Add Save Handler to update post on server (reactions, etc)
    this.saveHandler = reaction(
      () => this.asJson,
      (json) => {
        if (this.autoSave) {
          this.store.updatePost(json)
        }
      },
    )
  }

  /**
   * MobX Computed
   *
   * Used in reaction to watch for any changes in post
   * @readonly
   * @memberof Post
   * @returns Post attributes as JSON
   */
  @computed
  get asJson() {
    return {
      postId: this.id,
      title: this.title,
      date: this.date,
      content: this.content,
      author: this.author,
      cover_image: this.coverImage,
      type: this.type,
      categories: this.categories,
    }
  }

  /**
   * Parse and return Post Date from ISO
   * to readable format
   *
   * @param {string} isoDate - Parse in ISO Format
   * @memberof Post
   * @returns Parsed Post Date
   */
  parsePostDate = (isoDate) => {
    const date = new Date(isoDate)
    const parsed = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    return parsed
  }

  /**
   * Update and Resolve post attributes
   *
   * Temporarily disables autoSave to prevent event loop
   *
   * @param {object} json - JSON Object
   * @memberof Post
   */
  updateFromJson(json) {
    this.autoSave = false
    this.id = json.postId
    this.title = json.title
    this.date = this.parsePostDate(json.date)
    this.content = json.content
    this.author = this.store.rootStore.authorStore.resolveAuthor(json.author)
    this.coverImage = this.store.rootStore.mediaStore.resolveMedia(json.cover_image)
    this.type = json.type
    this.categories = this.store.rootStore.categoryStore.resolveCategories(json.categories)
    this.autoSave = true
  }
}

/**
 * MobX Store for managing Post related data
 * @export
 * @class PostStore
 */
export class PostStore {
  authorStore

  resourceClient

  @observable
  posts = []

  @observable
  state = "pending"

  /**
   * Creates an instance of PostStore
   * @param {object} rootStore - RootStore Singleton
   * @param {object} resourceClient - Instance of API class
   * @memberof PostStore
   */
  constructor(rootStore, resourceClient) {
    this.rootStore = rootStore
    this.resourceClient = resourceClient
    this.loadPosts()
  }

  /**
   * Loads all Posts from API
   *
   * @generator
   * @yields Endpoint Resource Items
   * @memberof PostStore
   */
  loadPosts = flow(function* () {
    this.state = "pending"
    this.posts = []
    const posts = yield this.resourceClient.fetchAll()
    when(
      () => this.rootStore.authorStore.status === "ready"
        && this.rootStore.categoryStore.status === "ready",
      () => {
        posts.forEach(json => this.updatePost(json))
        this.state = "ready"
      },
    )
  })

  /**
   * Updates Post Item if ID exists, otherwise creates one
   *
   * @param {object} json - JSON Data from API
   * @memberof PostStore
   */
  updatePost(json) {
    let post = this.posts.find(p => p.id === json.postId)
    if (!post) {
      post = new Post(this, json.postId)
      this.posts.push(post)
    }
    post.updateFromJson(json)
  }

  /**
   * Resolves PostItem from ID
   *
   * @param {string} id - Immutable ID of Post Item
   * @returns Post Instance if it exists
   * @memberof PostStore
   */
  resolvePost(id) {
    const post = this.posts.find(p => p.id === id)
    return post !== null ? post : null
  }

  /**
   * Get all posts by a certain Author
   *
   * @param {string} authorId - ID of Author
   * @returns All Posts by Author
   * @memberof PostStore
   */
  getPostsByAuthor(authorId) {
    const posts = this.posts.filter(p => p.author.id === authorId)
    return posts
  }
}
