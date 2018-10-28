/**
 *  api/posts.js
 *  handles article, polls, etc.
 */

import { API } from 'aws-amplify';
import { getPaths, getGateway } from './common';

// API Paths
const config = {
  parent: 'posts',
  paths: ['']
};

let gate;
getGateway().then(resp => {
  gate = resp;
});
const path = getPaths(config);

export const fetchAll = async () => {
  const resp = await API.get(gate, path.parent);
  console.log(resp);
  return resp;
};
