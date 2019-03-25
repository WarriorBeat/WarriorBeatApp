/**
 * mutations.js
 * Graphql Mutations
 * graphql
 */

import gql from "graphql-tag"
import { graphql } from "react-apollo"
import { FetchPolls } from "./queries"

// Vote Poll
const votePollOption = gql`
  mutation pollAddVote($pollId: ID!, $optionId: ID!) {
    pollAddVote(pollId:$pollId optionId: $optionId) {
      pollId
      optionId
    }
  }
`

const mutations = {
  votePollOption: graphql(votePollOption, {
    props: props => ({
      onPollVote: (pollId, optionId) => props.mutate({
        options: {
          errorPolicy: "ignore",
        },
        variables: {
          pollId,
          optionId,
        },
        optimisticResponse: {
          __typename: "Mutation",
          pollAddVote: { pollId, optionId, __typename: "PollOption" },
        },
        update: (proxy, { data: { pollAddVote } }) => {
          const data = proxy.readQuery({ query: FetchPolls })
          const votedPoll = data.pollList.items.find((p) => {
            const options = p.options.map(opt => opt.id)
            if (options.includes(pollAddVote.optionId)) {
              return p
            }
            return false
          })
          const optionIndex = votedPoll.options.findIndex(
            opt => opt.id === pollAddVote.optionId,
          )
          const pollIndex = data.pollList.items.findIndex(p => p.id === votedPoll.id)
          votedPoll.options[optionIndex].votes += 1
          data.pollList.items[pollIndex] = votedPoll
          proxy.writeQuery({ query: FetchPolls, data })
        },
      }),
    }),
  }),
}

export default mutations
