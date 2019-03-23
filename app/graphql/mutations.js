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
  mutation insertPollVote($option_id: ID!) {
    insertPollVote(option_id: $option_id) {
      option_id
    }
  }
`

const mutations = {
  votePollOption: graphql(votePollOption, {
    props: props => ({
      onPollVote: optionId => props.mutate({
        options: {
          errorPolicy: "ignore",
        },
        variables: {
          option_id: optionId,
        },
        optimisticResponse: {
          __typename: "Mutation",
          insertPollVote: { option_id: optionId, __typename: "PollOption" },
        },
        update: (proxy, { data: { insertPollVote } }) => {
          const data = proxy.readQuery({ query: FetchPolls })
          const votedPoll = data.listPolls.items.find((p) => {
            const options = p.options.map(opt => opt.id)
            if (options.includes(insertPollVote.option_id)) {
              return p
            }
            return false
          })
          const optionIndex = votedPoll.options.findIndex(
            opt => opt.id === insertPollVote.option_id,
          )
          const pollIndex = data.listPolls.items.findIndex(p => p.id === votedPoll.id)
          votedPoll.options[optionIndex].votes += 1
          data.listPolls.items[pollIndex] = votedPoll
          proxy.writeQuery({ query: FetchPolls, data })
        },
      }),
    }),
  }),
}

export default mutations
