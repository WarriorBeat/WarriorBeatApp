/**
 * PollBlock.js
 * News Block Component
 * Main File
 */

import React from "react"
import { PropTypes as gqlTypes } from "graphql"
import { observer } from "mobx-react/native"
import NewsBlock from "./NewsBlock"

@observer
class PollBlock extends React.Component {
  render() {
    const { poll } = this.props
    const pollView = {
      id: poll.id,
      type: "Poll",
      props: { poll },
      modal: true,
    }
    const badge = `${poll.totalVotes} Votes`
    return (
      <NewsBlock
        title={poll.question}
        date={poll.createdOn}
        viewComponent={pollView}
        badge={badge}
      />
    )
  }
}

PollBlock.propTypes = {
  poll: gqlTypes.poll.isRequired,
}

export default PollBlock
