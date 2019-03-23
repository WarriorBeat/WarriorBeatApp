/**
 * PollBlock.js
 * News Block Component
 * Main File
 */

import React from "react"
import { PropTypes } from "prop-types"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import NewsBlock from "./NewsBlock"

@observer
class PollBlock extends React.Component {
  getTotalVotes = (options) => {
    const totalVotes = options.reduce((total, opt) => {
      let votes = total
      return (votes += opt.votes)
    }, 0)
    return totalVotes
  }

  render() {
    const { poll } = this.props
    const pollView = {
      id: poll.id,
      type: "Poll",
      props: { poll },
      modal: true,
    }
    const badge = `${this.getTotalVotes(poll.options)} Votes`
    const pollDate = new Date(poll.created_at)
    return (
      <NewsBlock title={poll.question} date={pollDate} viewComponent={pollView} badge={badge} />
    )
  }
}

// PollBlock.wrappedComponent.propTypes = {
//   // pollStore: MobxTypes.observableObject.isRequired,
// }

// PollBlock.propTypes = {
//   // pollId: PropTypes.string.isRequired,
// }

export default PollBlock
