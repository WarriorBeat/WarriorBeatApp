/**
 * PollBlock.js
 * News Block Component
 * Main File
 */

import React from "react"
import { PropTypes } from "prop-types"
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
  poll: PropTypes.shape({
    id: PropTypes.string,
    question: PropTypes.string,
    createdOn: PropTypes.string,
    isOpen: PropTypes.bool,
    lastUpdated: PropTypes.string,
    totalVotes: PropTypes.number,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        text: PropTypes.string,
        votes: PropTypes.number,
      }),
    ),
  }).isRequired,
}

export default PollBlock
