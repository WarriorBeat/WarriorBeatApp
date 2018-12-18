/**
 *  pollStore.js
 *  mobx store for poll data
 *  stores
 */

import {
  observable, flow, computed, reaction, when,
} from "mobx"

export class Poll {
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
          this.store.updatePoll(json)
        }
      },
    )
  }

  @computed
  get asJson() {
    return {
      pollId: this.id,
      question: this.question,
      status: this.status,
      date: this.date,
      answers: this.answers,
      total_votes: this.total_votes,
    }
  }

  updateFromJson(json) {
    this.autoSave = false
    this.id = json.pollId
    this.question = json.question
    this.status = json.status
    this.date = new Date(json.date)
    this.answers = json.answers
    this.total_votes = json.total_votes
    this.autoSave = true
  }
}

export class PollStore {
  resourceClient

  @observable
  polls = []

  @observable
  state = "pending"

  constructor(rootStore, resourceClient) {
    this.rootStore = rootStore
    this.resourceClient = resourceClient
    this.loadPolls()
  }

  loadPolls = flow(function* () {
    this.state = "pending"
    this.polls = []
    const polls = yield this.resourceClient.fetchAll()
    when(
      () => this.rootStore.authorStore.status === "ready",
      () => {
        polls.forEach(json => this.updatePoll(json))
        this.state = "ready"
      },
    )
  })

  updatePoll(json) {
    let poll = this.polls.find(p => p.id === json.pollId)
    if (!poll) {
      poll = new Poll(this, json.pollId)
      this.polls.push(poll)
    }
    poll.updateFromJson(json)
  }

  resolvePoll(id) {
    const poll = this.polls.find(p => p.id === id)
    return poll !== null ? poll : null
  }
}
