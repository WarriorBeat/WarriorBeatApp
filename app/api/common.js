// api.js
// Handles API requests

import * as log from 'loglevel';
import { API } from 'aws-amplify';
import { API_DEV } from 'react-native-dotenv';

// Constants
export const gateways = {
  local: 'local',
  aws: 'warriorbeat-stage',
  aws_dev: 'warriorbeat-dev',
  current: null
};

// Get Current Gateway
export const getGateway = async () => {
  console.log('DEV ENV: ', API_DEV);
  if (API_DEV === 'true') {
    log.warn('CONNECTED TO AWS DEV API');
    return gateways.aws_dev;
  }
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
