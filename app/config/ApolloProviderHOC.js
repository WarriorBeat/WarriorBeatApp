/**
 * ApolloProviderHOC.js
 * ApolloProvider Wrapper
 * api
 */

import React, { Component } from "react"
import { Rehydrated } from "aws-appsync-react"
import { ApolloProvider } from "react-apollo"
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync"
import { Auth } from "aws-amplify"
import awsExports from "../../aws-exports"

export const client = new AWSAppSyncClient({
  url: awsExports.aws_appsync_graphqlEndpoint,
  region: awsExports.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AWS_IAM,
    credentials: () => Auth.currentCredentials(),
  },
})

const apolloProviderHOC = WrappedComponent => class Parent extends Component {
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

export default apolloProviderHOC
