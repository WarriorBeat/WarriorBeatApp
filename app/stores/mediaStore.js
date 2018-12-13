/**
 *  mediaStore.js
 *  mobx store for media data
 *  stores
 */

import { observable, flow, computed, reaction } from "mobx"

export class MediaStore {
  resourceClient

  @observable
  media = []

  @observable
  state = "pending"

  constructor(rootStore, resourceClient) {
    this.rootStore = rootStore
    this.resourceClient = resourceClient
    this.loadMedia()
  }

  loadMedia = flow(function*() {
    this.state = "pending"
    this.media = []
    const media = yield this.resourceClient.fetchAll()
    media.forEach(json => this.updateMedia(json))
    this.state = "ready"
  })

  updateMedia(json) {
    let media = this.media.find(media => media.id === json.mediaId)
    if (!media) {
      media = new Media(this, json.mediaId)
      this.media.push(media)
    }
    media.updateFromJson(json)
  }

  resolveMedia(id) {
    let media = this.media.find(media => media.id === id)
    return media !== null ? media : null
  }

  @computed
  get status() {
    return this.state
  }
}

export class Media {
  id = null

  autoSave = false

  store = null
  saveHandler = null

  constructor(store, id) {
    this.store = store
    this.id = id
    this.saveHandler = reaction(
      () => this.asJson,
      json => {
        if (this.autoSave) {
          this.store.updateMedia(json)
        }
      }
    )
  }

  @computed
  get asJson() {
    return {
      mediaId: this.id,
      url: this.url,
      title: this.title,
      credits: this.credits,
      caption: this.caption,
      type: this.type
    }
  }

  updateFromJson(json) {
    this.autoSave = false
    this.id = json.mediaId
    this.url = json.url
    this.title = json.title
    this.credits = json.credits
    this.caption = json.caption
    this.type = json.type
    this.autoSave = true
  }
}
