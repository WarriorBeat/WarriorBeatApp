/**
 *  authorStore.js
 *  mobx store for author data
 *  stores
 */

import { observable, flow } from "mobx"
import { AuthorAPI } from "api"

class ObservableAuthorStore {
  @observable
  authors = []

  fetchAuthors = flow(function*() {
    const resp = yield AuthorAPI.fetchAll()
    this.authors = resp
    return resp
  })
}

const authorStore = new ObservableAuthorStore()
export default authorStore
