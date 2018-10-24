// api.js
// Handles API requests

import * as log from 'loglevel';
import { API } from 'aws-amplify';

// Constants
export const gateways = {
  local: 'local',
  aws: 'warriorbeat-dev',
  current: null
};

// Get Current Gateway
export const getGateway = async () => {
  if (gateways.current !== null) {
    return gateways.current;
  }
  try {
    const resp = await API.get(gateways.local, '/');
    log.warn('CONNECTED TO LOCALHOST');
    return gateways.local;
  } catch (err) {
    return gateways.aws;
  }
};

// Set gateway
getGateway().then(resp => {
  gateways.current = resp;
});

// Get Paths
export const getPaths = config => {
  let { parent, paths } = config;
  let tree = {};
  parent = `/api/${parent}`;
  tree['parent'] = parent;
  paths.forEach(p => {
    let path = `${parent}/${p}`;
    tree[p] = path;
  });
  return tree;
};
