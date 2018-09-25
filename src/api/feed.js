// api.js
// Handle Feed Data

import { API } from 'aws-amplify';
import { getPaths, getGateway } from './common';

// API Paths
const config = {
  parent: 'feed',
  paths: ['']
};

let gate;
getGateway().then(resp => {
  gate = resp;
});
const path = getPaths(config);

export const fetchFeed = async () => {
  const resp = await API.get(gate, path.parent);
  console.log(resp);
  return resp;
};

export const createFeed = async () => {
  let data = {
    body: {
      feedId: 'testfeed',
      title: 'Test Feed',
      author: 'Test Author',
      body: 'filler body',
      cover_img: 'https://bit.ly/2xF5t73'
    }
  };
  console.log(gate, path.parent, data);
  const resp = await API.post(gate, path.parent, data);
  console.log(resp);
  return resp;
};
