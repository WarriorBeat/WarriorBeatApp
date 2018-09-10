// api.js
// Handle Feed Data

import { API } from 'aws-amplify';
import { getPaths, getGateway } from './common';

// API Paths
const config = {
  parent: 'feed',
  paths: ['create']
};

let gate;
getGateway().then(resp => {
  gate = resp;
});
const path = getPaths(config);

export const createFeed = async () => {
  let data = {
    body: {
      feedId: 'testfeed',
      name: 'Test Feed'
    }
  };
  console.log(gate, path.parent, data);
  const resp = await API.post(gate, path.parent, data);
  console.log(resp);
  return resp;
};
