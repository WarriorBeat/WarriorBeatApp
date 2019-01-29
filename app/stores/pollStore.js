/**
 *  pollStore.js
 *  mobx store for poll data
 *  stores
 */

import {
  observable, flow, computed, reaction, when, action,
} from "mobx"
import { persist } from "mobx-persist"

export class Poll {
  @persist
  @observable
  id = null

  autoSave = false

  store = null

  saveHandler = null

  @persist
  @observable
  question = ""

  @persist
  @observable
  status = ""

  @persist
  @observable
  createDate = ""

  @persist("list")
  @observable
  answers = []

  @persist
  @observable
  totalVotes = 0

  constructor(store, id) {
    this.store = store
    this.id = id
    this.saveHandler = reaction(
      () => this.asJson,
      (json) => {
        if (this.autoSave && this.store) {
          this.store.resourceClient.patch(this.id, json)
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
      date: this.createDate,
      answers: this.answers,
      total_votes: this.totalVotes,
    }
  }

  updateFromJson(json) {
    this.autoSave = false
    this.id = json.pollId
    this.question = json.question
    this.status = json.status
    this.createDate = new Date(json.date).toISOString()
    this.answers = json.answers
    this.totalVotes = json.total_votes
    this.autoSave = true
  }

  @action.bound
  voteOn(activeId, votes) {
    this.answers = this.answers.map((a) => {
      const voted = a
      if (a.answerId === activeId) {
        voted.votes = votes
        return voted
      }
      return a
    })
  }

  @computed
  get date() {
    return new Date(this.createDate)
  }
}

export class PollStore {
  resourceClient

  @persist("list", Poll)
  @observable
  polls = []

  @observable
  state = "pending"

  rehydrate = null

  constructor(rootStore, resourceClient) {
    this.rootStore = rootStore
    this.resourceClient = resourceClient
    this.resourceClient.onReceiveUpdate = json => this.updatePoll(json)
    this.loadPolls()
  }

  fetchPolls = flow(function* () {
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

  /**
   * Uses Hydrate Result to populate pollStore
   * from the cache
   *
   * @param {IHydrateResult} hydrate - Hydration Result
   * @memberof PollStore
   */
  popPolls = (hydrate) => {
    this.state = "pending"
    const { polls } = hydrate
    when(
      () => this.rootStore.authorStore.status === "ready",
      () => {
        this.polls = []
        polls.forEach(p => this.updatePoll(p.asJson))
        this.state = "ready"
      },
    )
  }

  loadPolls = flow(function* () {
    this.state = "pending"
    const hydration = this.rootStore.hydrate("pollStore", this)
    const { rehydrate } = hydration
    const cache = yield hydration
    try {
      if (cache.polls.length >= 1) {
        this.popPolls(cache)
      } else {
        this.fetchPolls()
      }
    } catch (error) {
      this.fetchPolls()
    } finally {
      rehydrate("pollStore", this)
    }
    this.state = "ready"
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
