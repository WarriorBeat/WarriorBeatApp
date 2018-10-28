/**
 *  stores/posts.js
 *  mobx store for post data
 */

import { observable, flow } from 'mobx';
import { PostAPI } from '../api/api';

class ObservablePostStore {
  @observable
  posts = [];

  fetchPosts = flow(function*() {
    const resp = yield PostAPI.fetchAll();
    this.posts = resp;
  });

  addPostItem(item) {
    this.posts.push(item);
  }
}

const postStore = new ObservablePostStore();
export default postStore;
