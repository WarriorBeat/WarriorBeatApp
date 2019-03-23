/**
 * ApolloProviderHOC.js
 * ApolloProvider Wrapper
 * api
 */

import React, { Component } from "react"
import { Rehydrated } from "aws-appsync-react"
import { ApolloProvider } from "react-apollo"
import AWSAppSyncClient from "aws-appsync"
import awsExports from "../../aws-exports"

const client = new AWSAppSyncClient({
  url: awsExports.aws_appsync_graphqlEndpoint,
  region: awsExports.aws_appsync_region,
  auth: {
    type: awsExports.aws_appsync_authenticationType,
    apiKey: awsExports.aws_appsync_apiKey,
  },
})

const ApolloProviderHOC = WrappedComponent => class Parent extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Rehydrated>
          <WrappedComponent {...this.props} />
        </Rehydrated>
      </ApolloProvider>
    )
  }
}

export default ApolloProviderHOC
