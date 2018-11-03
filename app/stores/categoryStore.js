/**
 *  stores/categoryStore.js
 *  mobx store for category data
 */

import { observable, flow } from "mobx"
import { CategoryAPI } from "api/api"

class ObservableCategoryStore {
  @observable
  categories = [];

  fetchCategories = flow(function*() {
    const resp = yield CategoryAPI.fetchAll()
    this.categories = resp
  });
}

const categoryStore = new ObservableCategoryStore()
export default categoryStore
