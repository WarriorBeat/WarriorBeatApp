/**
 * aws.js
 * AWS Configurations
 * Config
 */

const API = {
  endpoints: [
    {
      name: "warriorbeat-dev",
      endpoint: "https://ps05owvrph.execute-api.us-east-1.amazonaws.com/dev",
    },
    {
      name: "warriorbeat-stage",
      endpoint: "https://m6vkw9r8ud.execute-api.us-east-1.amazonaws.com/stage",
    },
    {
      name: "local",
      endpoint: "http://localhost:5000",
    },
  ],
}

export default API
