/**
 *  categoryStore.js
 *  mobx store for category data
 *  stores
 */

import {
  observable, flow, computed, reaction,
} from "mobx"
import _ from "lodash"

export class Category {
  id = null

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
          this.store.updateCategory(json)
        }
      },
    )
  }

  @computed
  get asJson() {
    return {
      categoryId: this.id,
      name: this.name,
    }
  }

  updateFromJson(json) {
    this.autoSave = false
    this.id = json.categoryId
    this.name = json.name
    this.autoSave = true
  }
}

export class CategoryStore {
  resourceClient

  @observable
  categories = []

  @observable
  state = "pending"

  constructor(rootStore, resourceClient) {
    this.rootStore = rootStore
    this.resourceClient = resourceClient
    this.loadCategories()
  }

  loadCategories = flow(function* () {
    this.state = "pending"
    this.categories = []
    const categories = yield this.resourceClient.fetchAll()
    categories.forEach(json => this.updateCategory(json))
    this.state = "ready"
  })

  updateCategory(json) {
    let category = this.categories.find(c => c.id === json.categoryId)
    if (!category) {
      category = new Category(this, json.categoryId)
      this.categories.push(category)
    }
    category.updateFromJson(json)
  }

  sortCategories(collection) {
    const sorted = _.partition(this.categories, item => collection.includes(item.name))
    sorted[0] = _.sortBy(sorted[0], item => collection.indexOf(item.name) - sorted[0].indexOf(item))
    sorted[1].unshift(...sorted[0])
    return sorted[1]
  }

  resolveCategories(ids) {
    const categories = ids.map((id) => {
      const category = this.categories.find(c => c.id === id)
      return category !== null ? category : null
    })
    return categories
  }

  resolveCategory(id) {
    const category = this.categories.find(c => c.id === id)
    return category !== null ? category : null
  }

  @computed
  get status() {
    return this.state
  }
}
